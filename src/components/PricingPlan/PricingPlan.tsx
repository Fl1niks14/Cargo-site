import React from 'react'
import { motion } from 'framer-motion'
import { Truck, Package, ShieldCheck, Clock, Check } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import './PricingPlan.css'

interface PricingPlan {
	id: string
	title: string
	price: string
	description: string
	features: string[]
	icon: React.ReactNode
	isFeatured?: boolean
}

const plans: PricingPlan[] = [
	{
		id: 'standard',
		title: 'Standard',
		price: 'от 4 500 ₽',
		description: 'Идеально для небольших грузов и частных переездов.',
		icon: <Package size={24} strokeWidth={1.5} />,
		features: ['Груз до 1.5 тонн', 'Городские перевозки', 'Базовая страховка']
	},
	{
		id: 'business',
		title: 'Business',
		price: 'от 12 000 ₽',
		description: 'Оптимальное решение для малого и среднего бизнеса.',
		icon: <Truck size={24} strokeWidth={1.5} />,
		features: ['Груз до 10 тонн', 'Межгород', 'Приоритетная загрузка'],
		isFeatured: true
	},
	{
		id: 'enterprise',
		title: 'Enterprise',
		price: 'Индивидуально',
		description: 'Масштабные логистические решения и спецтехника.',
		icon: <ShieldCheck size={24} strokeWidth={1.5} />,
		features: ['Груз до 20+ тонн', 'Международные рейсы', 'Персональный логист']
	}
]

const Pricing: React.FC = () => {
	const navigate = useNavigate()

	const handlePlanSelect = (vehicleType: string) => {
		navigate('/calc', {
			state: {
				selectedVehicle: vehicleType,
				scrollTo: true
			}
		})
	}

	return (
		<section className='pricing' id='pricing'>
			<div className='container'>
				<div className='pricing__header'>
					<span className='pricing__tag'>Transparency</span>
					<h2 className='pricing__title'>
						Прозрачное <br /> <span>ценообразование</span>
					</h2>
					<p className='pricing__subtitle'>
						Никаких скрытых комиссий. Мы верим в честную стоимость каждого
						километра, рассчитанную нашими алгоритмами в реальном времени.
					</p>
				</div>

				<div className='pricing__grid'>
					{plans.map((plan, index) => (
						<motion.div
							key={plan.id}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							className={`pricing-card ${plan.isFeatured ? 'pricing-card--featured' : ''}`}
						>
							<div className='pricing-card__icon'>{plan.icon}</div>
							<h3 className='pricing-card__title'>{plan.title}</h3>
							<p className='pricing-card__desc'>{plan.description}</p>
							<div className='pricing-card__price'>{plan.price}</div>

							<ul className='pricing-card__features'>
								{plan.features.map(feature => (
									<li key={feature}>
										<Check size={14} /> {feature}
									</li>
								))}
							</ul>

							<button
								className='pricing-card__btn'
								onClick={() =>
									handlePlanSelect(
										plan.id === 'standard'
											? 'small'
											: plan.id === 'business'
												? 'medium'
												: 'large'
									)
								}
							>
								Выбрать тариф
							</button>
						</motion.div>
					))}
				</div>

				<div className='pricing__info-box'>
					<Clock size={20} className='info-icon' />
					<p>
						Цены могут варьироваться в зависимости от сезонности и срочности
						подачи транспорта.
					</p>
				</div>
			</div>
		</section>
	)
}

export default Pricing
