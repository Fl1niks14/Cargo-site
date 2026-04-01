import React from 'react'
import HomePage from '../container/HomePage'
import CalculatorPage from '../container/CalculatorPage'
import Reset from '../components/404/404'

import Admin from '../container/AdminPanel'

import AuthPage from '../container/AuthPage'

export interface IRoute {
	path: string
	Component: React.ComponentType
}

const routesConfig: IRoute[] = [
	{ path: '/', Component: HomePage },
	{ path: '/calc', Component: CalculatorPage },
	{ path: '/admin', Component: Admin },
	{ path: '/login', Component: AuthPage },
	{ path: '*', Component: Reset }
]

export default routesConfig
