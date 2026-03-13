import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import {
	Calculator as CalcIcon,
	Send,
	ArrowRight,
	ArrowLeft,
	Zap,
	RefreshCcw,
	Box
} from 'lucide-react'
import './Calculator.css'

// --- НАСТРОЙКИ МАРКЕРОВ (исправляем пути к иконкам) ---

const serviceOptions = [
	{ id: 'truck', title: 'Автоперевозки', coeff: 1.0 },
	{ id: 'air', title: 'Авиаперевозки', coeff: 2.5 },
	{ id: 'ship', title: 'Морские фрахты', coeff: 0.7 },
	{ id: 'express', title: 'Срочная доставка', coeff: 3.0 }
]

const CalculatorPage: React.FC = () => {
	const navigate = useNavigate()
	const location = useLocation()

	const [selectedService, setSelectedService] = useState(
		location.state?.serviceName || 'Автоперевозки'
	)
	const [fromCity, setFromCity] = useState('')
	const [toCity, setToCity] = useState('')
	const [weight, setWeight] = useState(100)
	const distance = 0

	const [isLoading, setIsLoading] = useState(false)
	const [isSent, setIsSent] = useState(false)

	const currentCoeff =
		serviceOptions.find(s => s.title === selectedService)?.coeff || 1
	const totalPrice = Math.round(
		(weight * 0.8 + distance * 1.5 + 5000) * currentCoeff
	)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)
		try {
			const res = await fetch('http://localhost:5000/api/requests', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					service: selectedService,
					from: fromCity,
					to: toCity,
					weight,
					distance,
					price: totalPrice
				})
			})
			if (res.ok) setIsSent(true)
		} catch (err) {
			alert('Сервер не отвечает!')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className='calculator-page reveal-visible'>
			<div className='container'>
				<button className='btn-back' onClick={() => navigate('/')}>
					<ArrowLeft size={18} /> <span>Вернуться на главную</span>
				</button>

				<div className='cargo-line'></div>
				<h1 className='section-title'>
					Интеллектуальный <span className='text-gold'>расчет</span>
				</h1>

				<div className='calc-grid'>
					<div className='calc-main-column'>
						{!isSent ? (
							<form className='calc-form' onSubmit={handleSubmit}>
								<div className='input-group'>
									<label>Тип фрахта</label>
									<div className='select-wrapper'>
										<Box size={18} className='select-icon' />
										<select
											value={selectedService}
											onChange={e => setSelectedService(e.target.value)}
											className='custom-select'
										>
											{serviceOptions.map(opt => (
												<option key={opt.id} value={opt.title}>
													{opt.title}
												</option>
											))}
										</select>
									</div>
								</div>

								<div className='input-row-cities'>
									<div className='input-group'>
										<label>Откуда</label>
										<input
											type='text'
											required
											value={fromCity}
											onChange={e => setFromCity(e.target.value)}
											className='input-field'
											placeholder='Город'
										/>
									</div>
									<ArrowRight
										className='text-gold'
										style={{ marginTop: '25px' }}
									/>
									<div className='input-group'>
										<label>Куда</label>
										<input
											type='text'
											required
											value={toCity}
											onChange={e => setToCity(e.target.value)}
											className='input-field'
											placeholder='Город'
										/>
									</div>
								</div>

								<div className='input-group'>
									<label>
										Масса: <strong>{weight} кг</strong>
									</label>
									<input
										type='range'
										min='10'
										max='15000'
										value={weight}
										onChange={e => setWeight(+e.target.value)}
									/>
								</div>

								<button
									className='btn-gold btn-full'
									type='submit'
									disabled={isLoading || distance === 0}
								>
									{isLoading ? (
										<span className='loader'></span>
									) : (
										<>
											<Send size={18} /> Оформить заказ
										</>
									)}
								</button>
							</form>
						) : (
							<div className='success-message'>
								<Zap size={48} color='var(--color-gold)' />
								<h2>Заявка принята!</h2>
								<p>Маршрут сохранен в базе MongoDB</p>
								<button
									className='btn-outline'
									onClick={() => setIsSent(false)}
								>
									<RefreshCcw size={14} /> Новый расчет
								</button>
							</div>
						)}
					</div>

					<div className='calc-result'>
						<div className='result-card'>
							<CalcIcon size={40} className='text-gold' />
							<h3>Предварительный итог</h3>
							<div className='price-display'>
								{totalPrice.toLocaleString()} ₽
							</div>
							<div className='dist-info-badge'>{distance} км по маршруту</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CalculatorPage
