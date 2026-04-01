import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import './404.css'

const Reset: React.FC = () => {
	const navigate = useNavigate()

	return (
		<motion.section
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className='error-page'
		>
			{/* Фоновая надпись для стиля */}
			<div className='error-page__watermark'>404</div>

			<div className='container error-page__container'>
				<div className='error-page__content'>
					<motion.span
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.2 }}
						className='error-page__tag'
					>
						Ошибка маршрутизации
					</motion.span>

					<motion.h1
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.3 }}
						className='error-page__title'
					>
						Маршрут не найден<span>.</span>
					</motion.h1>

					<motion.p
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.4 }}
						className='error-page__text'
					>
						Похоже, эта точка назначения еще не освоена нашей логистической
						сетью. Вернитесь на главную, чтобы проложить верный путь.
					</motion.p>

					<motion.button
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.5 }}
						className='btn-black-pill'
						onClick={() => navigate('/')}
					>
						<ArrowLeft size={18} /> Вернуться на главную
					</motion.button>
				</div>
			</div>
		</motion.section>
	)
}

export default Reset
