import React, { useEffect, useState } from 'react'
import {
	MapPin,
	Trash2,
	CheckCircle,
	RefreshCw,
	ArrowRight,
	Package,
	Clock
} from 'lucide-react'
import './Admin.css'

// Интерфейс для данных из MongoDB
interface IOrder {
	_id: string
	service: string
	from: string
	to: string
	weight: number
	distance: number
	price: number
	status: string
	createdAt: string
}

const AdminPage: React.FC = () => {
	const [orders, setOrders] = useState<IOrder[]>([])
	const [loading, setLoading] = useState<boolean>(false)

	// Загрузка данных
	const fetchOrders = async () => {
		setLoading(true)
		try {
			const response = await fetch('http://localhost:5000/api/requests')
			const data = await response.json()
			setOrders(data)
		} catch (err) {
			console.error('Ошибка при получении данных:', err)
		} finally {
			// Искусственная задержка для демонстрации анимации кнопки
			setTimeout(() => setLoading(false), 800)
		}
	}

	// Удаление заявки
	const handleDelete = async (id: string) => {
		if (
			window.confirm('Вы уверены, что хотите безвозвратно удалить эту заявку?')
		) {
			try {
				await fetch(`http://localhost:5000/api/requests/${id}`, {
					method: 'DELETE'
				})
				setOrders(orders.filter(order => order._id !== id))
			} catch (err) {
				console.error('Ошибка удаления:', err)
			}
		}
	}

	// Смена статуса (Цикл: Новая -> В работе -> Завершена)
	const handleChangeStatus = async (id: string, currentStatus: string) => {
		let nextStatus = 'Новая'
		if (currentStatus === 'Новая') nextStatus = 'В работе'
		else if (currentStatus === 'В работе') nextStatus = 'Завершена'

		try {
			await fetch(`http://localhost:5000/api/requests/${id}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ status: nextStatus })
			})
			fetchOrders()
		} catch (err) {
			console.error('Ошибка смены статуса:', err)
		}
	}

	useEffect(() => {
		fetchOrders()
	}, [])

	return (
		<div className='admin-page'>
			<div className='container'>
				<div className='cargo-line'></div>

				<div className='admin-header'>
					<h1 className='section-title'>
						Система <span className='text-gold'>управления</span>
					</h1>

					{/* СТИЛИЗОВАННАЯ КНОПКА ОБНОВЛЕНИЯ */}
					<button
						className={`btn-refresh-modern ${loading ? 'is-loading' : ''}`}
						onClick={fetchOrders}
						disabled={loading}
					>
						<div className='btn-refresh-icon'>
							<RefreshCw size={18} />
						</div>
						<span className='btn-refresh-text'>
							{loading ? 'Синхронизация...' : 'Обновить данные'}
						</span>
						<div className='btn-shimmer'></div>
					</button>
				</div>

				<div className='orders-grid'>
					{orders.map(order => (
						<div
							key={order._id}
							className={`admin-card status-border-${order.status === 'Завершена' ? 'done' : 'active'}`}
						>
							<div className='admin-card__header'>
								<span className='order-date'>
									<Clock size={14} />{' '}
									{new Date(order.createdAt).toLocaleDateString()}
								</span>
								<span
									className={`status-tag ${order.status === 'Завершена' ? 'tag-done' : 'tag-new'}`}
								>
									{order.status}
								</span>
							</div>

							<div className='order-main-info'>
								<h3 className='order-service'>{order.service}</h3>
								<div className='order-route'>
									<MapPin size={14} className='text-gold' />
									<span>{order.from}</span>
									<ArrowRight size={14} className='route-arrow' />
									<span>{order.to}</span>
								</div>
							</div>

							<div className='order-stats'>
								<div className='stat-item'>
									<span className='stat-label'>Вес</span>
									<span className='stat-value'>{order.weight} кг</span>
								</div>
								<div className='stat-item'>
									<span className='stat-label'>Расстояние</span>
									<span className='stat-value'>{order.distance} км</span>
								</div>
							</div>

							<div className='order-footer'>
								<div className='order-price'>
									{order.price?.toLocaleString()} <span>₽</span>
								</div>
								<div className='order-actions'>
									<button
										className='action-btn btn-complete'
										title='Следующий статус'
										onClick={() => handleChangeStatus(order._id, order.status)}
									>
										<CheckCircle size={20} />
									</button>
									<button
										className='action-btn btn-delete'
										title='Удалить заявку'
										onClick={() => handleDelete(order._id)}
									>
										<Trash2 size={20} />
									</button>
								</div>
							</div>
						</div>
					))}
				</div>

				{orders.length === 0 && !loading && (
					<div className='empty-state'>
						<Package size={48} />
						<p>Список заявок пуст. База данных готова к приему данных.</p>
					</div>
				)}
			</div>
		</div>
	)
}

export default AdminPage
