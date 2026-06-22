import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import './Auth.css'

const Auth: React.FC = () => {
	const [isLogin, setIsLogin] = useState(true)

	// Инициализируем стейт данными из localStorage, если они там есть
	const [email, setEmail] = useState(localStorage.getItem('temp_email') || '')
	const [password, setPassword] = useState(
		localStorage.getItem('temp_pass') || ''
	)

	const [isSubmitting, setIsSubmitting] = useState(false)
	const navigate = useNavigate()

	// Сохраняем введенные данные в localStorage при каждом изменении,
	// чтобы они не пропали при обновлении страницы
	useEffect(() => {
		localStorage.setItem('temp_email', email)
		localStorage.setItem('temp_pass', password)
	}, [email, password])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault() // Обязательно! Чтобы страница не перезагрузилась
		setIsSubmitting(true)

		await new Promise(resolve => setTimeout(resolve, 1000))

		const users = JSON.parse(localStorage.getItem('ruscargo_users') || '[]')

		if (isLogin) {
			// ЛОГИКА ВХОДА
			const user = users.find(
				(u: any) => u.email === email && u.password === password
			)
			if (user) {
				localStorage.setItem('currentUser', JSON.stringify(user))
				// Очищаем временные данные формы после успешного входа
				localStorage.removeItem('temp_email')
				localStorage.removeItem('temp_pass')

				window.dispatchEvent(new Event('storage'))
				toast.success(`С возвращением!`)
				navigate('/admin')
			} else {
				toast.error('Неверный логин или пароль')
			}
		} else {
			// ЛОГИКА РЕГИСТРАЦИИ
			if (users.find((u: any) => u.email === email)) {
				toast.error('Email уже занят')
			} else {
				const newUser = {
					id: Date.now(),
					email,
					password,
					name: email.split('@')[0]
				}
				const updatedUsers = [...users, newUser]
				localStorage.setItem('ruscargo_users', JSON.stringify(updatedUsers))
				localStorage.setItem('currentUser', JSON.stringify(newUser))

				localStorage.removeItem('temp_email')
				localStorage.removeItem('temp_pass')

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
