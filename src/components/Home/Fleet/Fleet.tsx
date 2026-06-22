import React from 'react'
import { Truck, Box, Ruler, ShieldCheck } from 'lucide-react'
import './Fleet.css'

const FleetSpecs: React.FC = () => {
	const specs = [
		{
			icon: <Truck size={28} />,
			tag: 'Тягачи',
			title: '20 тонн',
			desc: 'Собственный парк еврофур. Регулярные рейсы Москва — Европа и по всей РФ.'
		},
		{
			icon: <Ruler size={28} />,
			tag: 'Габариты',
			title: '120 м³',
			desc: 'Сцепки Jumbo для перевозки объемных и негабаритных грузов.'
		},
		{
			icon: <Box size={28} />,
			tag: 'Склад',
			title: 'Класс A+',
			desc: 'Склады консолидации в Москве и Смоленске для ответственного хранения.'
		},
		{
			icon: <ShieldCheck size={28} />,
			tag: 'Гарантии',
			title: '100%',
			desc: 'Лимит ответственности за каждую перевозку застрахован в ТТ-Транс.'
		}
	]

	return (
		<section className='fleet-container'>
			<div className='fleet-grid'>
				{specs.map((item, index) => (
					<div className='fleet-card' key={index}>
						<div className='fleet-icon'>{item.icon}</div>
						<span className='fleet-tag'>{item.tag}</span>
						<h3 className='fleet-title'>{item.title}</h3>
						<p className='fleet-desc'>{item.desc}</p>
					</div>
				))}
			</div>
		</section>
	)
}

export default FleetSpecs
