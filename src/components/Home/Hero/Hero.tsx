import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import './Hero.css'
import track from '../../../../public/img/truck.png'
const Hero: React.FC = () => {
	const navigate = useNavigate()

	return (
		<section className='hero'>
			<div className='container hero__container'>
				<motion.div
					initial={{ opacity: 0, x: -30 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8, ease: 'easeOut' }}
					className='hero__content'
				>
					<span className='hero__subtitle'>Логистика 2026</span>
					<h1 className='hero__title'>
						Доставка <br /> <span>без границ</span>
					</h1>

					<p className='hero__description'>
						Премиальный сервис крупногабаритных перевозок по России и Европе.
						Прозрачное ценообразование и страхование каждого километра.
					</p>

					<div className='hero__actions'>
						<button className='btn-dark' onClick={() => navigate('/calc')}>
							Рассчитать путь
						</button>
						<button
							className='btn-link'
							onClick={() =>
								document
									.getElementById('services')
									?.scrollIntoView({ behavior: 'smooth' })
							}
						>
							Наши услуги →
						</button>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 1, delay: 0.2 }}
					className='hero__image-wrapper'
				>
					<img src={track} alt='Truck' className='hero__image' />
				</motion.div>
			</div>

			<div className='hero__scroll-indicator'></div>
		</section>
	)
}

export default Hero
