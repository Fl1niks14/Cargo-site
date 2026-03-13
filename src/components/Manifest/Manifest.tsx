import React from 'react'
import { ShieldCheck, Zap, Cpu } from 'lucide-react'
import './Manifest.css'

const Manifest: React.FC = () => {
	const principles = [
		{
			icon: <Cpu size={32} />,
			title: 'Цифровой ДНК',
			text: 'Мы исключили человеческий фактор там, где справляется алгоритм. 100% прозрачность пути.'
		},
		{
			icon: <Zap size={32} />,
			title: 'Скорость 2.0',
			text: 'Доставка — это не ожидание. Это мгновенная реакция системы на ваш запрос в режиме 24/7.'
		},
		{
			icon: <ShieldCheck size={32} />,
			title: 'Абсолютная этика',
			text: 'Ваш груз застрахован не только бумагами, но и нашей репутацией инновационного лидера.'
		}
	]

	return (
		<section className='manifest' id='manifest'>
			<div className='container'>
				<div className='manifest__grid'>
					<div className='manifest__content'>
						<div className='cargo-line'></div>
						<h2 className='section-title'>
							Манифест <br /> <span className='text-gold'>РусКарго</span>
						</h2>
						<p className='manifest__main-text'>
							Мы верим, что логистика — это кровеносная система глобальной
							экономики. В 2026 году она не имеет права на ошибки, очереди и
							бюрократию. Наш манифест — это обещание доставить будущее вовремя.
						</p>
					</div>

					<div className='manifest__principles'>
						{principles.map((item, index) => (
							<div key={index} className='principle-item'>
								<div className='principle-item__icon'>{item.icon}</div>
								<div className='principle-item__info'>
									<h4 className='principle-item__title'>{item.title}</h4>
									<p className='principle-item__text'>{item.text}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Фоновый текст на всю ширину для стиля */}
			<div className='manifest__bg-text'>LOGISTICS 2026</div>
		</section>
	)
}

export default Manifest
