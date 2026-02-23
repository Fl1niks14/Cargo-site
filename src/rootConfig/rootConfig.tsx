import React from 'react'
import HomePage from '../container/HomePage'
import CalculatorPage from '../container/CalculatorPage'
import Reset from '../container/404'

export interface IRoute {
	path: string
	Component: React.ComponentType
}

const routesConfig: IRoute[] = [
	{ path: '/', Component: HomePage },
	{ path: '/calc', Component: CalculatorPage },
	{ path: '*', Component: Reset }
]

export default routesConfig
