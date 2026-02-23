import React from 'react'
import { Phone, Mail } from 'lucide-react'
import './Header.css'

const TopHeader: React.FC = () => {
	return (
		<header className='header'>
			{/* Верхняя золотая полоса */}
			<div className='header__top'>
				<div className='container header__top-container'>
					<div className='header__info-item'>RUS CARGO - 2026</div>
					<div className='header__info-group'>
						<div className='header__info-item'>
							<Phone size={14} />
							<a href='tel:88002224467'>8 (962) 610-00-42</a>
						</div>
						<div className='header__info-item'>
							<Mail size={14} />
							<a href='mailto:sales@rhg.ru'>spherefl1niks1904@gmail.com</a>
						</div>
					</div>
				</div>
			</div>

			{/* Основной хедер */}
			<div className='header__main'>
				<div className='container header__main-container'>
					<div className='header__brand'>
						<div className='header__logo'>
							<div className='header__logo-circle'></div>
						</div>
						<div className='header__brand-text'>
							<span className='header__logo-title'>РусКарго </span>
							<span className='header__logo-subtitle'>ИП Блинов А.С 2026</span>
						</div>
					</div>

					<div className='header__divider'></div>

					<div className='header__offices'>
						<span>Наш продукт</span>
					</div>

					<nav className='header__nav'>
						<a href='#' className='header__nav-link'>
							Услуги
						</a>
						<a href='#' className='header__nav-link'>
							О компании
						</a>
						<a href='#' className='header__nav-link'>
							Манифест
						</a>
						<a href='#' className='header__nav-link'>
							Контакты
						</a>
					</nav>
				</div>
			</div>
		</header>
	)
}

export default TopHeader
