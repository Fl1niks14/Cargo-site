import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Cpu, ArrowRight, Gauge, Layers } from 'lucide-react'
import './About.css'

const About: React.FC = () => {
	return (
		<section className='about' id='about'>
			<div className='container about__container'>
				{/* 1. Блок: Заголовок-Манифест */}
				<div className='about__header'>
					<motion.span
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						className='about__tag'
					>
						Manifesto 2026
					</motion.span>
					<motion.h2
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className='about__massive-title'
					>
						Логистика — это не машины. <br />
						<span>Это нейронная сеть вашего бизнеса.</span>
					</motion.h2>
				</div>

				{/* 2. Блок: Основной текст (Текстовая стена с акцентами) */}
				<div className='about__manifesto-grid'>
					<div className='manifesto__column'>
						<p className='manifesto__lead'>
							Мы строим экосистему, где каждый километр пути просчитан
							алгоритмами, а риск сведен к статистической погрешности. РусКарго
							— это точка, где физическая доставка встречается с цифровым
							бессмертием данных.
						</p>
					</div>
					<div className='manifesto__column'>
						<p className='manifesto__text'>
							Традиционная логистика мертва. Она задохнулась в бумажных
							накладных, необязательных посредниках и человеческом факторе. Мы
							стерли эти границы, внедрив{' '}
							<strong>Smart-Contract Tracking</strong> и систему предиктивного
							анализа трафика.
						</p>
						<p className='manifesto__text'>
							Пока другие «перевозят грузы», мы управляем потоками ценностей в
							реальном времени. Наша нейросеть анализирует 400+ параметров
							ежесекундно: от износа шин до геополитических колебаний цен на
							топливо в Еврозоне.
						</p>
					</div>
				</div>

				{/* 3. Блок: Технологические столпы (Сетка) */}
				<div className='about__pillars'>
					<div className='pillar-item'>
						<div className='pillar-icon'>
							<Cpu size={32} />
						</div>
						<h3>AI Predictive Analytics</h3>
						<p>
							Предсказание задержек еще до того, как водитель завел двигатель.
							Мы знаем будущее маршрута.
						</p>
					</div>
					<div className='pillar-item'>
						<div className='pillar-icon'>
							<Layers size={32} />
						</div>
						<h3>Neural Infrastructure</h3>
						<p>
							Собственные облачные решения для мгновенного обмена документами и
							данными о фрахте.
						</p>
					</div>
					<div className='pillar-item'>
						<div className='pillar-icon'>
							<Gauge size={32} />
						</div>
						<h3>Zero-Emission Vision</h3>
						<p>
							Оптимизация маршрутов, сокращающая углеродный след на 40% за счет
							исключения пустых пробегов.
						</p>
					</div>
					<div className='pillar-item'>
						<div className='pillar-icon'>
							<Shield size={32} />
						</div>
						<h3>Military Grade Security</h3>
						<p>
							Двойное шифрование данных и полная материальная ответственность,
							подкрепленная смарт-контрактами.
						</p>
					</div>
				</div>

				{/* 4. Блок: Финальный стат и призыв */}
				<div className='about__footer'>
					<div className='about__big-stat'>
						<span className='stat-number'>99.9%</span>
						<span className='stat-desc'>
							Гарантия доставки точно в срок на основе данных за 2025 год
						</span>
					</div>
					<button className='btn-manifesto'>
						Присоединиться к эволюции <ArrowRight size={20} />
					</button>
				</div>
			</div>

			{/* Декоративный водяной знак на фоне */}
			<div className='about__bg-text'>INTELLIGENCE</div>
		</section>
	)
}

export default About
