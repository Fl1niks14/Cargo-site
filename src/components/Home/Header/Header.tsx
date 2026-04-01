import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { User, LogOut } from 'lucide-react'
import toast from 'react-hot-toast'
import './Header.css'

const TopHeader: React.FC = () => {
	const [user, setUser] = useState<any>(null)
	const location = useLocation()
	const navigate = useNavigate()

	const checkAuth = () => {
		const savedUser = localStorage.getItem('currentUser')
		setUser(savedUser ? JSON.parse(savedUser) : null)
	}

	useEffect(() => {
		checkAuth()
		window.addEventListener('storage', checkAuth)
		return () => window.removeEventListener('storage', checkAuth)
	}, [location])

	const handleLogout = () => {
		localStorage.removeItem('currentUser')
		window.dispatchEvent(new Event('storage'))
		toast.success('Вы вышли из системы')
		navigate('/')
	}

	return (
		<header className='header'>
			<div className='container header__container'>
				{/* 1. Левая колонка: Логотип */}
				<div className='header__col header__col--left'>
					<Link to='/' className='header__logo'>
						RUSCARGO<span>.</span>
					</Link>
				</div>

				{/* 2. Центральная колонка: Меню */}
				<nav className='header__col header__col--center'>
					<div className='nav__links'>
						<Link to='/' className={location.pathname === '/' ? 'active' : ''}>
							Главная
						</Link>
						<Link
							to='/calc'
							className={location.pathname === '/calc' ? 'active' : ''}
						>
							Калькулятор
						</Link>
						<a href='#pricing'>Тарифы</a>
					</div>
				</nav>

				{/* 3. Правая колонка: Профиль */}
				<div className='header__col header__col--right'>
					{user ? (
						<div className='user-wrapper'>
							<Link to='/admin' className='user-pill'>
								<User size={14} />
								<span>{user.name}</span>
							</Link>
							<button
								className='logout-icon-btn'
								onClick={handleLogout}
								title='Выйти'
							>
								<LogOut size={18} strokeWidth={1.5} />
							</button>
						</div>
					) : (
						<Link to='/login' className='login-pill'>
							ВОЙТИ
						</Link>
					)}
				</div>
			</div>
		</header>
	)
}

export default TopHeader
