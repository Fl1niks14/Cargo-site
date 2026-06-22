import React from 'react'
import HomePage from '../container/HomePage'
import CalculatorPage from '../container/CalculatorPage'
import Resett from '../container/404'
import Admin from '../container/AdminPanel'
import AuthPage from '../container/AuthPage'
import Tariffs from '../container/Tariffs'

// Добавим простую обертку для защиты админки (Private Route)
const ProtectedAdmin = () => {
	const user = localStorage.getItem('currentUser')
	if (!user) {
		window.location.href = '/login'
		return null
	}
	return <Admin />
}

export interface IRoute {
	path: string
	Component: React.ComponentType
}

const routesConfig: IRoute[] = [
	{ path: '/', Component: HomePage },
	{ path: '/calc', Component: CalculatorPage },
	// Используем защищенный компонент для админки
	{ path: '/admin', Component: ProtectedAdmin as any },
	{ path: '/login', Component: AuthPage },
	{ path: '/tariffs', Component: Tariffs },
	{ path: '*', Component: Resett }
]

export default routesConfig
