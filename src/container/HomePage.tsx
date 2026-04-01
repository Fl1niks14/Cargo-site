import React, { useEffect } from 'react'
import TopHeader from '../components/Home/Header/Header'
import Hero from '../components/Home/Hero/Hero'

import About from '../components/Home/About/About'

import Footer from '../components/Home/Footer/Footer'

const HomePage: React.FC = () => {
	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) entry.target.classList.add('reveal-visible')
				})
			},
			{ threshold: 0.1 }
		)

		document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
		return () => observer.disconnect()
	}, [])

	return (
		<div className='home-page'>
			<TopHeader />
			<main>
				<Hero />
				<div id='services' className='reveal'></div>
				<div id='about' className='reveal delay-1'>
					<About />
				</div>
				<div id='manifest' className='reveal delay-2'></div>
			</main>
			<Footer />
		</div>
	)
}

export default HomePage
