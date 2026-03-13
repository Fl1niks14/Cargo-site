import React from 'react'
import { Mouse } from 'lucide-react'
import { useNavigate } from 'react-router-dom' // Добавили useNavigate для кнопки
import './Hero.css'

const Hero: React.FC = () => {
	const navigate = useNavigate()

	return (
		<section className='hero'>
			<div className='hero__overlay'></div>

			<div className='container hero__container'>
				<div className='hero__content'>
					<div className='cargo-line'></div>
					<h1 className='hero__title'>
						Грузовые <br /> <span>перевозки</span>
					</h1>

					<div className='hero__description-wrapper'>
						<p className='hero__description'>
							Перевозка крупногабаритных грузов по России и Европе. Полное
							экспедирование, страхование, упаковка и хранение грузов.
						</p>
					</div>

					<div className='hero__actions'>
						<button className='btn-gold' onClick={() => navigate('/calc')}>
							Рассчитать стоимость
						</button>

						<button
							className='btn-outline'
							onClick={() =>
								document
									.getElementById('services')
									?.scrollIntoView({ behavior: 'smooth' })
							}
						>
							Наши услуги
						</button>
					</div>
				</div>

				<div className='hero__scroll'>
					<Mouse size={32} strokeWidth={1} className='hero__scroll-icon' />
					<div className='hero__scroll-dot'></div>
				</div>
			</div>
		</section>
	)
}

export default Hero
