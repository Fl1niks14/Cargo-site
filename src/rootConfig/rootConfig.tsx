import React from 'react'
import HomePage from '../container/HomePage'
import CalculatorPage from '../container/CalculatorPage'
import Reset from '../container/404'
import AdminPanel from '../container/AdminPanel'

export interface IRoute {
	path: string
	Component: React.ComponentType
}

const routesConfig: IRoute[] = [
	{ path: '/', Component: HomePage },
	{ path: '/calc', Component: CalculatorPage },
	{ path: '/admin', Component: AdminPanel },
	{ path: '*', Component: Reset }
]

export default routesConfig
