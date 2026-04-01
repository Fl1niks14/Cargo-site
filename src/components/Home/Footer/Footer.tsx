import React from 'react'
import { Instagram, Send } from 'lucide-react'
import './Footer.css'

const Footer: React.FC = () => {
	const currentYear = new Date().getFullYear()

	return (
		<footer id='footer' className='footer'>
			<div className='container footer__container'>
				<div className='footer__main'>
					<div className='footer__brand'>
						<span className='footer__logo'>
							RUSCARGO<span className='logo__dot'>.</span>
						</span>
						<p className='footer__description'>
							Переосмысление логистики. <br />
							Ваш груз в руках будущего.
						</p>
					</div>

					<div className='footer__groups'>
						<div className='footer__group'>
							<h4 className='footer__group-title'>Навигация</h4>
							<nav className='footer__links'>
								<a href='#services'>Услуги</a>
								<a href='#about'>О компании</a>
								<a href='/calc'>Калькулятор</a>
							</nav>
						</div>

						<div className='footer__group'>
							<h4 className='footer__group-title'>Контакты</h4>
							<div className='footer__links'>
								<a href='tel:+79626100042'>8 (962) 610-00-42</a>
								<a
									href='mailto:spherefl1niks1904@gmail.com'
									className='footer__email'
								>
									Email Us
								</a>
							</div>
						</div>

						<div className='footer__group'>
							<h4 className='footer__group-title'>Социальные сети</h4>
							<div className='footer__socials'>
								<a href='#' aria-label='Instagram'>
									<Instagram size={18} strokeWidth={1.5} />
								</a>
								<a href='#' aria-label='Telegram'>
									<Send size={18} strokeWidth={1.5} />
								</a>
							</div>
						</div>
					</div>
				</div>

				<div className='footer__bottom'>
					<span className='footer__copyright'>
						© {currentYear} RUSCARGO. ИП Блинов С.С.
					</span>
					<div className='footer__legal'>
						<a href='#'>Privacy Policy</a>
						<a href='#'>Terms of Service</a>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
