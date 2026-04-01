import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import './Auth.css'

const Auth: React.FC = () => {
	const [isLogin, setIsLogin] = useState(true)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const navigate = useNavigate()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsSubmitting(true)

		// Имитируем "загрузку" для солидности (дипломная фишка)
		await new Promise(resolve => setTimeout(resolve, 1000))

		const users = JSON.parse(localStorage.getItem('ruscargo_users') || '[]')

		if (isLogin) {
			const user = users.find(
				(u: any) => u.email === email && u.password === password
			)
			if (user) {
				localStorage.setItem('currentUser', JSON.stringify(user))
				window.dispatchEvent(new Event('storage')) // Обновляем хедер
				toast.success(`С возвращением!`)
				navigate('/admin')
			} else {
				toast.error('Неверный логин или пароль')
			}
		} else {
			if (users.find((u: any) => u.email === email)) {
				toast.error('Email уже занят')
			} else {
				const newUser = {
					id: Date.now(),
					email,
					password,
					name: email.split('@')[0]
				}
				localStorage.setItem(
					'ruscargo_users',
					JSON.stringify([...users, newUser])
				)
				localStorage.setItem('currentUser', JSON.stringify(newUser))
				window.dispatchEvent(new Event('storage'))
				toast.success('Аккаунт создан!')
				navigate('/admin')
			}
		}
		setIsSubmitting(false)
	}

	return (
		<section className='auth-page'>
			<motion.div
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				className='auth-card'
			>
				<h1 className='auth-card__title'>{isLogin ? 'ВХОД' : 'РЕГИСТРАЦИЯ'}</h1>

				<form onSubmit={handleSubmit} className='auth-card__form'>
					<input
						type='email'
						placeholder='Email'
						required
						value={email}
						onChange={e => setEmail(e.target.value)}
						className='auth-input'
					/>
					<input
						type='password'
						placeholder='Пароль'
						required
						value={password}
						onChange={e => setPassword(e.target.value)}
						className='auth-input'
					/>

					<button
						type='submit'
						className='btn-auth-pill'
						disabled={isSubmitting}
					>
						{isSubmitting ? (
							<Loader2 className='spin' size={18} />
						) : isLogin ? (
							'ВОЙТИ'
						) : (
							'СОЗДАТЬ'
						)}
					</button>
				</form>

				<button
					className='auth-switch-btn'
					onClick={() => setIsLogin(!isLogin)}
				>
					{isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт? Войти'}
				</button>
			</motion.div>
		</section>
	)
}

export default Auth
