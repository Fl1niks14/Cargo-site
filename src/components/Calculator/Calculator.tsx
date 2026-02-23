import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
	Calculator as CalcIcon,
	Send,
	ArrowRight,
	Zap,
	RefreshCcw
} from 'lucide-react'
import './Calculator.css'

const Calculator: React.FC = () => {
	const location = useLocation()
	const initialService = location.state?.serviceName || 'Автоперевозки'

	const [weight, setWeight] = useState(100)
	const [distance, setDistance] = useState(500)
	const [isLoading, setIsLoading] = useState(false)
	const [isSent, setIsSent] = useState(false)

	const totalPrice = weight * 0.5 + distance * 1.2

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)
		setTimeout(() => {
			setIsLoading(false)
			setIsSent(true)
		}, 2000)
	}

	return (
		<div className='calculator-page'>
			<div className='container'>
				<div className='cargo-line'></div>
				<h1 className='section-title'>
					Расчет <span className='text-gold'>фрахта</span>
				</h1>

				<div className='calc-grid'>
					{/* ОСНОВНОЙ БЛОК ФОРМЫ ИЛИ УСПЕХА */}
					<div className='calc-main-column'>
						{!isSent ? (
							<form className='calc-form' onSubmit={handleSubmit}>
								<div className='input-group'>
									<label>Тип услуги</label>
									<input
										type='text'
										value={initialService}
										readOnly
										className='input-disabled'
									/>
								</div>

								<div className='input-row-ranges'>
									<div className='input-group'>
										<label>
											Вес груза (кг): <strong>{weight}</strong>
										</label>
										<input
											type='range'
											min='10'
											max='20000'
											step='10'
											value={weight}
											onChange={e => setWeight(+e.target.value)}
										/>
									</div>
									<div className='input-group'>
										<label>
											Дистанция (км): <strong>{distance}</strong>
										</label>
										<input
											type='range'
											min='100'
											max='10000'
											step='50'
											value={distance}
											onChange={e => setDistance(+e.target.value)}
										/>
									</div>
								</div>

								<div className='input-row-cities'>
									<input
										type='text'
										placeholder='Откуда'
										className='input-field'
										required
									/>
									<ArrowRight className='text-gold' size={20} />
									<input
										type='text'
										placeholder='Куда'
										className='input-field'
										required
									/>
								</div>

								<button
									className='btn-gold btn-full'
									type='submit'
									disabled={isLoading}
								>
									{isLoading ? (
										<span className='loader'></span>
									) : (
										<>
											<Send size={18} /> Отправить заявку
										</>
									)}
								</button>
							</form>
						) : (
							<div className='success-message'>
								<div className='success-icon'>
									<Zap size={48} color='var(--color-gold)' />
								</div>
								<h2 className='success-title'>
									Заявка <span className='text-gold'>принята!</span>
								</h2>
								<p className='success-text'>
									Менеджер «РусКарго» свяжется с вами в течение 5 минут для
									уточнения деталей.
								</p>
								<button
									className='btn-outline'
									onClick={() => setIsSent(false)}
								>
									<RefreshCcw size={16} /> Рассчитать еще раз
								</button>
							</div>
						)}
					</div>

					{/* ВИДЖЕТ РЕЗУЛЬТАТА (ВСЕГДА ВИДЕН) */}
					<div className='calc-result'>
						<div className='result-card'>
							<CalcIcon size={40} className='text-gold' />
							<h3>Предварительная стоимость</h3>
							<div className='price-display'>
								<span>~</span> {totalPrice.toLocaleString()} <span>₽</span>
							</div>
							<p className='result-notice'>
								* Расчет выполнен по базовому тарифу 2026 года
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Calculator
