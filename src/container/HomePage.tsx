import { Calculator } from 'lucide-react'
import About from '../components/About/About'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import Hero from '../components/Hero/Hero'
import Services from '../components/Services/Services'

const HomePage: React.FC = () => {
	return (
		<>
			<Header />
			<Hero />
			<Services />
			<About />
			<Footer />
		</>
	)
}

export default HomePage
