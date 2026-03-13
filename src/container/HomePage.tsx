import React, { useEffect } from 'react'
import Header from '../components/Header/Header'
import Hero from '../components/Hero/Hero'
import Services from '../components/Services/Services'
import About from '../components/About/About'
import Manifest from '../components/Manifest/Manifest'
import Footer from '../components/Footer/Footer'

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
			<Header />
			<main>
				<Hero />
				<div id='services' className='reveal'>
					<Services />
				</div>
				<div id='about' className='reveal delay-1'>
					<About />
				</div>
				<div id='manifest' className='reveal delay-2'>
					<Manifest />
				</div>
			</main>
			<Footer />
		</div>
	)
}

export default HomePage
