import Auth from '../components/Auth/Auth'
import Footer from '../components/Home/Footer/Footer'
import TopHeader from '../components/Home/Header/Header'

const AuthPage: React.FC = () => {
	return (
		<>
			<TopHeader />
			<Auth />
			<Footer />
		</>
	)
}

export default AuthPage
