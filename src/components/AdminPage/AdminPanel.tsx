import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, Calendar, MapPin } from 'lucide-react'
import './AdminPanel.css'

const AdminPanel: React.FC = () => {
	const [orders, setOrders] = useState<any[]>([])
	const [user, setUser] = useState<any>(null)

	useEffect(() => {
		const u = JSON.parse(localStorage.getItem('currentUser') || 'null')
		if (u) {
			setUser(u)
			const all = JSON.parse(localStorage.getItem('ruscargo_orders') || '[]')
			setOrders(all.filter((o: any) => o.userEmail === u.email))
		}
	}, [])

	return (
		<section className='dashboard-page'>
			<div className='container'>
				<h1 className='dashboard-title'>
					Мои заказы <span>{user?.name}</span>
				</h1>

				<div className='orders-list'>
					{orders.map(order => (
						<motion.div key={order.id} className='order-card'>
							<div className='order-card__header'>
								<span className='order-id'>{order.id}</span>
								<span className='order-status'>{order.status}</span>
							</div>

							<div className='order-card__timeline'>
								<div className='time-block'>
									<div className='time-label'>
										<Clock size={14} /> Отправлено
									</div>
									<div className='time-value'>
										{order.orderDate} в {order.orderTime}
									</div>
								</div>
								<div className='time-block'>
									<div className='time-label'>
										<Calendar size={14} /> Ожидаемая доставка
									</div>
									<div className='time-value'>{order.deliveryDate}</div>
								</div>
							</div>

							<div className='order-card__footer'>
								<div className='route'>
									<MapPin size={16} color='#C6A266' />
									<span>
										{order.from} — {order.to}
									</span>
								</div>
								<div className='price'>{order.price.toLocaleString()} ₽</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	)
}

export default AdminPanel
