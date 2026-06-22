import React, { useEffect } from 'react'
import TopHeader from '../components/Home/Header/Header'
import Hero from '../components/Home/Hero/Hero'
import Footer from '../components/Home/Footer/Footer'
import FleetSpecs from '../components/Home/Fleet/Fleet'
import Services from '../components/Home/Services/Services'

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
					<FleetSpecs />
					<Services />
				</div>
				<div id='manifest' className='reveal delay-2'></div>
			</main>
			<Footer />
		</div>
	)
}

export default HomePage
