import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Zap, Shield, Globe, Cpu } from 'lucide-react'
import './About.css'

const About: React.FC = () => {
	const navigate = useNavigate()

	return (
		<section className='about' id='about'>
			<div className='container about__container'>
				{/* Левая часть: Контент */}
				<div className='about__content reveal'>
					<div className='cargo-line'></div>
					<h2 className='about__title'>
						Мы создаем <br />
						<span className='text-gold-gradient'>экосистему</span>
					</h2>
					<div className='about__description'>
						<p className='about__text-highlight'>
							<strong>РусКарго 2026</strong> — это манифест нового времени. Мы
							заменили бюрократию кодом, а неопределенность — AI-прогнозами.
						</p>
						<p className='about__text-secondary'>
							Пока рынок живет по стандартам прошлого века, мы запускаем
							беспилотные магистрали и нейронные сети для мониторинга фрахта. Мы
							не просто везем груз — мы управляем временем и пространством
							вашего бизнеса.
						</p>
					</div>
					<button className='btn-epic' onClick={() => navigate('/calc')}>
						<Zap size={18} /> Стать частью будущего
					</button>
				</div>

				{/* Правая часть: Эпичная сетка статов */}
				<div className='about__stats-grid reveal delay-2'>
					<div className='stat-item-epic'>
						<Cpu className='stat-icon' />
						<span className='stat-value'>99.8%</span>
						<span className='stat-label'>Точность AI</span>
					</div>
					<div className='stat-item-epic featured'>
						<Globe className='stat-icon' />
						<span className='stat-value'>24/7</span>
						<span className='stat-label'>Global Control</span>
					</div>
					<div className='stat-item-epic'>
						<Shield className='stat-icon' />
						<span className='stat-value'>0</span>
						<span className='stat-label'>Рисков</span>
					</div>
					<div className='stat-item-image'>
						<div className='stat-image-overlay'></div>
					</div>
				</div>
			</div>

			<div className='about__bg-watermark'>EVOLUTION</div>
		</section>
	)
}

export default About
