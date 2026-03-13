import React from 'react'
import { Phone, Mail, Instagram, Send } from 'lucide-react'
import './Footer.css'

const Footer: React.FC = () => {
	return (
		<footer id='footer' className='footer'>
			<div className='container footer__container'>
				<div className='footer__brand'>
					<div className='footer__logo'>
						<div className='header__logo-circle'></div>
						<div className='logo-text'>
							<span className='logo-text__main'>РусКарго</span>
							<span className='logo-text__sub'>ИП Блинов А.С.</span>
						</div>
					</div>
					<p className='footer__slogan'>
						Ломаем стандарты логистики с 2026 года. <br />
						Ваш груз в руках будущего.
					</p>
				</div>

				<div className='footer__nav'>
					<h4 className='footer__title'>Навигация</h4>
					<a href='#'>Услуги</a>
					<a href='#'>О компании</a>
					<a href='#'>Калькулятор</a>
					<a href='#'>Контакты</a>
				</div>

				<div className='footer__contacts'>
					<h4 className='footer__title'>Связь с нами</h4>
					<a href='tel:+79626100042' className='footer__contact-item'>
						<Phone size={16} color='var(--color-gold)' /> 8 (962) 610-00-42
					</a>
					<a
						href='mailto:spherefl1niks1904@gmail.com'
						className='footer__contact-item'
					>
						<Mail size={16} color='var(--color-gold)' />{' '}
						spherefl1niks1904@gmail.com
					</a>
					<div className='footer__socials'>
						<Instagram size={20} className='social-icon' />
						<Send size={20} className='social-icon' />
					</div>
				</div>
			</div>

			<div className='footer__bottom'>
				<div className='container footer__bottom-container'>
					<span className='footer__info'>
						© 2026 РусКарго. Все права защищены.
					</span>
				</div>
			</div>
		</footer>
	)
}

export default Footer
