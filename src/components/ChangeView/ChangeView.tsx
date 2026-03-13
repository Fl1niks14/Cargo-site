import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

interface MapProps {
	fromCoord?: [number, number]
	toCoord?: [number, number]
}

// Компонент для авто-центрирования карты при изменении координат

const DeliveryMap: React.FC<MapProps> = ({}) => {
	// Москва по умолчанию

	return (
		<div className='map-wrapper reveal'>
			<MapContainer
				center={[55.75, 37.61]}
				zoom={5}
				style={{ height: '300px', width: '100%', borderRadius: '4px' }}
			>
				<TileLayer
					{...({
						url: 'https://{s}://{z}/{x}/{y}{r}.png',
						attribution: '&copy; <a href="https://carto.com">CARTO</a>'
					} as any)}
				/>
				{/* ... остальной код с маркерами */}
			</MapContainer>

			<div className='map-overlay-glow'></div>
		</div>
	)
}

export default DeliveryMap
