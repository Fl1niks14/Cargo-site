import Calculator from '../components/Calculator/Calculator'
import Footer from '../components/Home/Footer/Footer'
import TopHeader from '../components/Home/Header/Header'
import Pricing from '../components/PricingPlan/PricingPlan'
const CalculatorPage: React.FC = () => {
	return (
		<>
			<TopHeader />
			<Pricing />
			<Calculator />
			<Footer />
		</>
	)
}

export default CalculatorPage
