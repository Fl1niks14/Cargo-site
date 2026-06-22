import React, { useState } from 'react'
import { Search, Package, Printer } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import './Tracking.css'
import qr from './image.png'
const Tracking: React.FC = () => {
	const [trackId, setTrackId] = useState('')
	const [order, setOrder] = useState<any>(null)
	const [error, setError] = useState(false)

	const handleTrack = () => {
		const allOrders = JSON.parse(
			localStorage.getItem('ruscargo_orders') || '[]'
		)

		// Очищаем ввод: убираем #, пробелы и приводим к нижнему регистру
		const cleanInput = trackId.replace('#', '').trim().toLowerCase()

		if (!cleanInput) {
			setError(true)
			setOrder(null)
			return
		}

		// Поиск заказа
		const found = allOrders.find((o: any) => {
			const cleanOrderId = o.id.toLowerCase().replace('rc-', '')
			return (
				cleanOrderId.includes(cleanInput) ||
				o.id.toLowerCase().includes(cleanInput)
			)
		})

		if (found) {
			setOrder(found)
			setError(false)
		} else {
			setOrder(null)
			setError(true)
		}
	}

	return (
		<section className='tracking-section'>
			<div className='container'>
				<div className='tracking-card'>
					<span className='step-label'>Tracking System</span>
					<h2 className='step-title'>
						Отследить груз<span>.</span>
					</h2>

					{/* Исправленная группа ввода */}
					<div className='tracking-input-group'>
						<div className='input-wrapper'>
							<Search size={18} className='search-icon' />
							<input
								type='text'
								placeholder='Введите номер заказа (например: 5007)'
								value={trackId}
								onChange={e => setTrackId(e.target.value)}
								onKeyPress={e => e.key === 'Enter' && handleTrack()}
							/>
						</div>
						<button onClick={handleTrack} className='btn-track-submit'>
							НАЙТИ
						</button>
					</div>

					<AnimatePresence mode='wait'>
						{order ? (
							<motion.div
								key='result'
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								className='track-content'
							>
								{/* Статус-бар */}
								<div className='track-status-bar'>
									<div className='status-info'>
										<Package size={20} color='#C6A266' />
										<div>
											<div className='status-label'>Текущий статус</div>
											<div className='status-value'>
												{Date.now() - (order.createdAt || 0) < 60000
													? 'Оформляется'
													: 'На ПВЗ'}
											</div>
										</div>
									</div>
									<div className='track-id-badge'>#{order.id.slice(-4)}</div>
								</div>

								{/* Квитанция */}
								<div className='order-receipt'>
									<div className='receipt-decor'></div>
									<div className='receipt-body'>
										<div className='receipt-header'>
											<div className='receipt-brand'>
												RUSCARGO<span>.</span>
											</div>
											<div className='receipt-type'>ЭЛЕКТРОННАЯ КВИТАНЦИЯ</div>
										</div>

										<div className='receipt-details'>
											<div className='receipt-row'>
												<span className='label'>ДАТА</span>
												<span className='value'>{order.orderDate}</span>
											</div>
											<div className='receipt-row'>
												<span className='label'>МАРШРУТ</span>
												<span className='value'>
													{order.from} → {order.to}
												</span>
											</div>
											<div className='receipt-row'>
												<span className='label'>ПАРАМЕТРЫ</span>
												<span className='value'>
													{order.weight} КГ / {order.vehicleType.toUpperCase()}
												</span>
											</div>
										</div>

										<div className='receipt-divider'></div>

										<div className='receipt-footer'>
											<div className='price-block'>
												<span className='total-label'>ИТОГО</span>
												<span className='total-price'>
													{order.price.toLocaleString()} ₽
												</span>
											</div>

											<div className='receipt-qr'>
												<img src={qr} alt='QR' />
												<span>VERIFY</span>
											</div>

											<button
												className='btn-print'
												onClick={() => window.print()}
											>
												<Printer size={14} /> ПЕЧАТЬ
											</button>
										</div>
									</div>
								</div>
							</motion.div>
						) : (
							error && (
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									className='track-error'
								>
									Заказ не найден. Проверьте номер.
								</motion.div>
							)
						)}
					</AnimatePresence>
				</div>
			</div>
		</section>
	)
}

export default Tracking
