import React from 'react'
import './About.css'

const About: React.FC = () => {
	return (
		<section className='about'>
			<div className='container about__container'>
				<div className='about__content'>
					<div className='cargo-line'></div>
					<h2 className='section-title'>
						Мы — будущее <br />
						<span className='text-gold'>логистики</span>
					</h2>
					<p className='about__text'>
						<strong>РусКарго 2026</strong> — это не просто перевозки. Мы стерли
						границы между классическим фрахтом и цифровыми технологиями.
					</p>
					<p className='about__text'>
						Пока другие строят маршруты по картам прошлого, мы используем
						AI-мониторинг и беспилотные решения, чтобы ваш груз был на месте
						завтра, а не через неделю. Мы молоды, амбициозны и готовы менять
						правила игры.
					</p>
					<button className='btn-outline'>Наш манифест</button>
				</div>
			</div>
		</section>
	)
}

export default About
