import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
	Plane,
	Truck,
	Ship,
	Box,
	Shield,
	Clock,
	Globe,
	Anchor,
	X,
	Zap
} from 'lucide-react'
import './Services.css'

// Расширяем данные для модалки
const services = [
	{
		id: 1,
		title: 'Авиаперевозки',
		icon: <Plane size={32} />,
		active: true,
		description:
			'Самый быстрый способ доставки для высокотехнологичного бизнеса. Используем прямые контракты с крупнейшими авиалиниями.',
		features: ['Срок: 12-48 часов', 'Покрытие: Весь мир', 'Экспресс-таможня']
	},
	{
		id: 2,
		title: 'Автоперевозки',
		icon: <Truck size={32} />,
		description:
			'Оптимальный баланс цены и скорости. Собственный парк современных еврофур стандарта Евро-6.',
		features: ['Срок: от 2 дней', 'GPS-мониторинг 24/7', 'Любые габариты']
	},
	{
		id: 3,
		title: 'Морские фрахты',
		icon: <Ship size={32} />,
		description:
			'Экономичное решение для межконтинентальных перевозок. Работаем со всеми крупнейшими портами мира.',
		features: [
			'LCL и FCL контейнеры',
			'Оптимизация портовых сборов',
			'Работа с негабаритом'
		]
	},
	{
		id: 4,
		title: 'Складская логистика',
		icon: <Box size={32} />,
		description:
			'Современные склады класса А+ с автоматизированной системой учета и климат-контролем.',
		features: [
			'WMS-управление запасами',
			'Маркировка и упаковка',
			'Кросс-докинг'
		]
	},
	{
		id: 5,
		title: 'Страхование грузов',
		icon: <Shield size={32} />,
		description:
			'Полная финансовая защита вашего бизнеса. Покрываем 100% стоимости груза от любых рисков.',
		features: [
			'Оформление за 15 минут',
			'Минимальный пакет документов',
			'Выплаты без задержек'
		]
	},
	{
		id: 6,
		title: 'Срочная доставка',
		icon: <Clock size={32} />,
		description:
			'Приоритетная обработка и кратчайшие сроки. Режим «горящей» доставки 24/7.',
		features: [
			'Персональный курьер',
			'Минуя промежуточные склады',
			'Гарантия сроков 99.9%'
		]
	},
	{
		id: 7,
		title: 'Таможенный брокер',
		icon: <Globe size={32} />,
		description:
			'Профессиональное сопровождение ВЭД. Минимизируем риски задержек и штрафов на границе.',
		features: [
			'Подбор кодов ТН ВЭД',
			'Сертификация товаров',
			'Электронное декларирование'
		]
	},
	{
		id: 8,
		title: 'Мультимодальные перевозки',
		icon: <Anchor size={32} />,
		description:
			'Комбинированные маршруты (море + ж/д + авто). Один контракт — полный контроль пути.',
		features: [
			'Единый сквозной тариф',
			'Смена транспорта без участия клиента',
			'Складской хаб в Европе'
		]
	}
]
const Services: React.FC = () => {
	// Состояние для хранения выбранной услуги
	const [selectedService, setSelectedService] = useState<any>(null)
	const navigate = useNavigate()
	const handleOrderClick = (service: any) => {
		navigate('/calc', {
			state: { serviceName: service.title, serviceId: service.id }
		})
	}
	return (
		<section className='services'>
			<div className='container'>
				<div className='cargo-line'></div>
				<h2 className='section-title'>Наши услуги</h2>

				<div className='services__grid'>
					{services.map(service => (
						<div
							key={service.id}
							className={`service-card ${service.active ? 'service-card--active' : ''}`}
							onClick={() => setSelectedService(service)}
						>
							<div className='service-card__icon'>{service.icon}</div>
							<h3 className='service-card__title'>{service.title}</h3>
							<div className='service-card__bg-icon'>{service.icon}</div>
						</div>
					))}
				</div>
			</div>

			{/* Динамическая модалка */}
			{selectedService && (
				<div className='modal-overlay' onClick={() => setSelectedService(null)}>
					<div className='modal-content' onClick={e => e.stopPropagation()}>
						<button
							className='modal-close'
							onClick={() => setSelectedService(null)}
						>
							<X size={24} />
						</button>

						<div className='modal-grid'>
							<div className='modal-info'>
								<div className='cargo-line'></div>
								<h2 className='modal-title'>
									{selectedService.title}{' '}
									<span className='text-gold'>2026</span>
								</h2>
								<p className='modal-text'>{selectedService.description}</p>

								<ul className='modal-list'>
									{selectedService.features?.map((f: string, i: number) => (
										<li key={i}>
											<Zap size={14} color='var(--color-gold)' /> {f}
										</li>
									))}
								</ul>

								<button
									className='btn-gold'
									onClick={() => handleOrderClick(selectedService)}
								>
									Заказать расчет
								</button>
							</div>
							<div className='modal-image'>
								<div className='modal-image-placeholder'>
									{/* Здесь можно вывести иконку или картинку */}
									{selectedService.icon}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</section>
	)
}

export default Services
