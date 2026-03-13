import React from 'react'
import { Link, useNavigate } from 'react-router-dom' // Импорты для навигации
import { Phone, Mail } from 'lucide-react'
import './Header.css'

const TopHeader: React.FC = () => {
	const navigate = useNavigate()

	// Функция для скролла к секциям (Услуги, О компании)
	const scrollToSection = (e: React.MouseEvent, id: string) => {
		e.preventDefault()
		// Если мы не на главной, сначала переходим на нее
		if (window.location.pathname !== '/') {
			navigate('/')
			setTimeout(() => {
				document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
			}, 100)
		} else {
			document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
		}
	}

	return (
		<header className='header'>
			<div className='header__top'>
				<div className='container header__top-container'>
					<div className='header__info-item'>RUS CARGO - 2026</div>
					<div className='header__info-group'>
						<div className='header__info-item'>
							<Phone size={14} />
							<a href='tel:89626100042'>8 (962) 610-00-42</a>
						</div>
						<div className='header__info-item'>
							<Mail size={14} />
							<a href='mailto:spherefl1niks1904@gmail.com'>
								spherefl1niks1904@gmail.com
							</a>
						</div>
					</div>
				</div>
			</div>

			<div className='header__main'>
				<div className='container header__main-container'>
					{/* Клик по логотипу всегда ведет на главную */}
					<Link to='/' className='header__brand'>
						<div className='header__logo'>
							<div className='header__logo-circle'></div>
						</div>
						<div className='header__brand-text'>
							<span className='header__logo-title'>РусКарго </span>
							<span className='header__logo-subtitle'>ИП Блинов C.С 2026</span>
						</div>
					</Link>

					<div className='header__divider'></div>

					<div className='header__offices'>
						<Link
							to='/calc'
							style={{ color: 'inherit', textDecoration: 'none' }}
						>
							<span>Наш продукт</span>
						</Link>
					</div>

					<nav className='header__nav'>
						<a
							href='#services'
							onClick={e => scrollToSection(e, 'services')}
							className='header__nav-link'
						>
							Услуги
						</a>

						<a
							href='#about'
							onClick={e => scrollToSection(e, 'about')}
							className='header__nav-link'
						>
							О компании
						</a>

						{/* Заменили Панель на более подходящий Мониторинг */}
						<Link
							to='/admin'
							className='header__nav-link header__nav-link--accent'
						>
							Мониторинг
						</Link>

						<a
							href='#footer'
							onClick={e => scrollToSection(e, 'footer')}
							className='header__nav-link'
						>
							Контакты
						</a>
					</nav>
				</div>
			</div>
		</header>
	)
}

export default TopHeader
