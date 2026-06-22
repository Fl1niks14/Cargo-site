import AdminPanel from '../components/AdminPage/AdminPanel'
import Footer from '../components/Home/Footer/Footer'
import TopHeader from '../components/Home/Header/Header'
import Tracking from '../components/Tracking/Tracking'

const Admin: React.FC = () => {
	return (
		<>
			<TopHeader />
			<AdminPanel />
			<Tracking />
			<Footer />
		</>
	)
}

export default Admin
