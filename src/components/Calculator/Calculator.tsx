import React, { useState, useMemo, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import {
	ArrowRight,
	ArrowLeft,
	CheckCircle2,
	MapPin,
	Loader2,
	Clock
} from 'lucide-react'
import toast from 'react-hot-toast'
import './Calculator.css'

interface OrderData {
	from: string
	to: string
	weight: number
	vehicleType: 'small' | 'medium' | 'large'
	comment: string
}

const Calculator: React.FC = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const calcRef = useRef<HTMLDivElement>(null)

	const [step, setStep] = useState(1)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isSuccess, setIsSuccess] = useState(false)
	const [user, setUser] = useState<any>(null)

	const [formData, setFormData] = useState<OrderData>({
		from: '',
		to: '',
		weight: 0,
		vehicleType: 'small',
		comment: ''
	})

	useEffect(() => {
		const savedUser = localStorage.getItem('currentUser')
		if (savedUser) setUser(JSON.parse(savedUser))
		if (location.state?.selectedVehicle) {
			setFormData(prev => ({
				...prev,
				vehicleType: location.state.selectedVehicle
			}))
		}
		if (location.state?.scrollTo) {
			setTimeout(
				() =>
					calcRef.current?.scrollIntoView({
						behavior: 'smooth',
						block: 'center'
					}),
				150
			)
		}
	}, [location.state])

	const totalPrice = useMemo(() => {
		if (!formData.from || !formData.to) return 0
		const mult = { small: 1, medium: 1.5, large: 2.5 }
		return Math.round(
			(4500 + formData.weight * 15) * mult[formData.vehicleType]
		)
	}, [formData])

	const handleBooking = async () => {
		if (!user) {
			toast.error('Войдите для бронирования')
			navigate('/login')
			return
		}
		setIsSubmitting(true)
		await new Promise(r => setTimeout(r, 2000))

		const now = new Date()
		const delivery = new Date()
		delivery.setDate(now.getDate() + 3)

		const order = {
			id: `RC-${Math.floor(1000 + Math.random() * 9000)}`,
			userEmail: user.email,
			...formData,
			price: totalPrice,
			orderDate: now.toLocaleDateString(),
			orderTime: now.toLocaleTimeString([], {
				hour: '2-digit',
				minute: '2-digit'
			}),
			deliveryDate: delivery.toLocaleDateString(),
			status: 'На ПВЗ',
			pickupPoint: 'ПВЗ-Северный (ул. Ленина, 10)'
		}

		const existing = JSON.parse(localStorage.getItem('ruscargo_orders') || '[]')
		localStorage.setItem(
			'ruscargo_orders',
			JSON.stringify([...existing, order])
		)

		setIsSubmitting(false)
		setIsSuccess(true)
		toast.success('Заказ оформлен!')
	}

	return (
		<section className='calc-page' ref={calcRef}>
			<div className='bg-grid-lines'></div>
			<div className='container'>
				<AnimatePresence mode='wait'>
					{!isSuccess ? (
						<motion.div
							key='card'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.95 }}
							className='calc-card'
						>
							<div className='stepper-header'>
								{[1, 2, 3].map(s => (
									<div
										key={s}
										className={`step-dot ${step >= s ? 'active' : ''}`}
									/>
								))}
							</div>

							{step === 1 && (
								<div className='step-content'>
									<span className='step-label'>01 / Route</span>
									<h2 className='step-title'>
										Маршрут<span>.</span>
									</h2>
									<div className='field'>
										<label>Откуда</label>
										<input
											type='text'
											placeholder='Город отправления'
											value={formData.from}
											onChange={e =>
												setFormData({ ...formData, from: e.target.value })
											}
										/>
									</div>
									<div className='field'>
										<label>Куда</label>
										<input
											type='text'
											placeholder='Город доставки'
											value={formData.to}
											onChange={e =>
												setFormData({ ...formData, to: e.target.value })
											}
										/>
									</div>
									<button
										className='btn-black-pill'
										onClick={() => setStep(2)}
										disabled={
											formData.from.length < 2 || formData.to.length < 2
										}
									>
										Далее <ArrowRight size={18} />
									</button>
								</div>
							)}

							{step === 2 && (
								<div className='step-content'>
									<button className='btn-back-link' onClick={() => setStep(1)}>
										<ArrowLeft size={14} /> Назад
									</button>
									<span className='step-label'>02 / Cargo</span>
									<h2 className='step-title'>
										Параметры<span>.</span>
									</h2>
									<div className='field'>
										<label>Вес груза (кг)</label>
										<input
											type='number'
											placeholder='0'
											value={formData.weight || ''}
											onChange={e =>
												setFormData({
													...formData,
													weight: Number(e.target.value)
												})
											}
										/>
									</div>
									<div className='field'>
										<label>Транспорт</label>
										<select
											value={formData.vehicleType}
											onChange={e =>
												setFormData({
													...formData,
													vehicleType: e.target.value as any
												})
											}
										>
											<option value='small'>Standard (1.5т)</option>
											<option value='medium'>Business (10т)</option>
											<option value='large'>Enterprise (20т)</option>
										</select>
									</div>
									<div className='field'>
										<label>Комментарий</label>
										<textarea
											placeholder='Особые пожелания...'
											value={formData.comment}
											onChange={e =>
												setFormData({ ...formData, comment: e.target.value })
											}
										/>
									</div>
									<button
										className='btn-black-pill'
										onClick={() => setStep(3)}
										disabled={formData.weight <= 0}
									>
										Рассчитать
									</button>
								</div>
							)}

							{step === 3 && (
								<div className='step-content result-center'>
									<button className='btn-back-link' onClick={() => setStep(2)}>
										<ArrowLeft size={14} /> Назад
									</button>
									<div className='price-display'>
										<span className='p-tag'>Итоговая стоимость</span>
										<h1 className='p-value'>{totalPrice.toLocaleString()} ₽</h1>
									</div>
									<div className='summary-card'>
										<p>
											<MapPin size={14} /> {formData.from} — {formData.to}
										</p>
										<p>
											<Clock size={14} /> Доставка: ~3 дня
										</p>
									</div>
									<button
										className='btn-black-pill'
										onClick={handleBooking}
										disabled={isSubmitting}
									>
										{isSubmitting ? (
											<Loader2 className='spin' />
										) : (
											'ЗАБРОНИРОВАТЬ'
										)}
									</button>
								</div>
							)}
						</motion.div>
					) : (
						<motion.div
							key='success'
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							className='calc-card success-view'
						>
							<CheckCircle2 size={64} strokeWidth={1} color='#C6A266' />
							<h2>
								Заявка принята<span>.</span>
							</h2>
							<p>
								Ваш груз зафиксирован. Мы ждем вас на{' '}
								<strong>ПВЗ-Северный</strong>.
							</p>
							<div className='success-btns'>
								<button
									className='btn-black-pill'
									onClick={() => navigate('/')}
								>
									На главную
								</button>
								<button
									className='btn-outline-pill'
									onClick={() => navigate('/admin')}
								>
									В кабинет
								</button>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</section>
	)
}

export default Calculator
