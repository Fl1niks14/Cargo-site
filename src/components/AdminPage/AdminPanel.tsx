import React, { useState, useEffect } from 'react'
import { ArrowRight, LogOut, Package, User, Clock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import './AdminPanel.css'

const AdminPanel: React.FC = () => {
	const [orders, setOrders] = useState<any[]>([])
	const [user, setUser] = useState<any>(null)
	const [now, setNow] = useState(Date.now()) // Состояние для перерисовки каждую секунду
	const navigate = useNavigate()

	useEffect(() => {
		const u = JSON.parse(localStorage.getItem('currentUser') || 'null')
		if (!u) {
			navigate('/auth')
			return
		}
		setUser(u)

		const loadOrders = () => {
			const all = JSON.parse(localStorage.getItem('ruscargo_orders') || '[]')
			setOrders(all.filter((o: any) => o.userEmail === u.email))
		}

		loadOrders()

		// Запускаем таймер, который обновляет время каждую секунду
		const interval = setInterval(() => {
			setNow(Date.now())
		}, 1000)

		return () => clearInterval(interval)
	}, [navigate])

	const handleLogout = () => {
		localStorage.removeItem('currentUser')
		window.dispatchEvent(new Event('storage'))
		navigate('/')
	}

	return (
		<section className='admin-panel'>
			<div className='container'>
				<header className='admin-header'>
					<div className='header-top'>
						<h1 className='admin-title'>
							Личный кабинет <span>/ {user?.name || 'Клиент'}</span>
						</h1>
						<button className='btn-logout' onClick={handleLogout}>
							<LogOut size={18} /> Выйти
						</button>
					</div>
					<p className='admin-subtitle'>
						История ваших отправлений и текущий статус грузов
					</p>
				</header>

				<div className='admin-stats'>
					<div className='stat-card'>
						<Package size={24} />
						<div className='stat-info'>
							<span className='stat-label'>Всего заказов</span>
							<span className='stat-value'>{orders.length}</span>
						</div>
					</div>
					<div className='stat-card'>
						<User size={24} />
						<div className='stat-info'>
							<span className='stat-label'>Аккаунт</span>
							<span className='stat-value'>{user?.email?.split('@')[0]}</span>
						</div>
					</div>
				</div>

				<div className='orders-table'>
					<div className='table-head'>
						<div>ID Заказа</div>
						<div>Маршрут</div>
						<div>Дата / Время</div>
						<div>Статус</div>
						<div className='text-right'>Стоимость</div>
					</div>

					<div className='orders-list'>
						{orders.length > 0 ? (
							orders.map(order => {
								// ЛОГИКА СМЕНЫ СТАТУСА:
								// Если с момента создания прошло меньше 60 сек — "Оформляется"
								const timePassed = now - (order.createdAt || 0)
								const isProcessing = timePassed < 60000
								const statusText = isProcessing ? 'Оформляется' : 'На ПВЗ'

								return (
									<div key={order.id} className='order-row'>
										<div className='col-id'>#{order.id.slice(-4)}</div>

										<div className='col-route'>
											<span className='city'>{order.from}</span>
											<ArrowRight size={14} color='#C6A266' />
											<span className='city'>{order.to}</span>
										</div>

										<div className='col-date'>
											<div className='date-main'>{order.orderDate}</div>
											<div className='date-sub'>{order.orderTime}</div>
										</div>

										<div className='col-status'>
											<span
												className={`status-badge ${isProcessing ? 'processing' : 'delivered'}`}
											>
												{isProcessing && (
													<Clock size={10} className='spin-slow' />
												)}{' '}
												{statusText}
											</span>
											{isProcessing && (
												<div className='time-left'>
													осталось {Math.ceil((60000 - timePassed) / 1000)}с
												</div>
											)}
										</div>

										<div className='col-price'>
											{Number(order.price).toLocaleString()} ₽
										</div>
									</div>
								)
							})
						) : (
							<div className='empty-state'>У вас пока нет активных заказов</div>
						)}
					</div>
				</div>
			</div>
		</section>
	)
}

export default AdminPanel
