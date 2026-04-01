import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'
import routesConfig from './rootConfig/rootConfig' // твой файл
import PageWrapper from './components/PageWrapper/PageWrapper'

const App: React.FC = () => {
	const [progress, setProgress] = useState(0)
	const location = useLocation()

	// Запускаем полоску при каждом переходе (изменение location)
	useEffect(() => {
		setProgress(30)
		const timer = setTimeout(() => setProgress(100), 300)
		return () => clearTimeout(timer)
	}, [location.pathname])

	return (
		<>
			<LoadingBar
				color='#d4a373'
				progress={progress}
				onLoaderFinished={() => setProgress(0)}
				height={3}
			/>

			<Routes location={location} key={location.pathname}>
				{routesConfig.map(({ path, Component }) => (
					<Route
						key={path}
						path={path}
						element={
							<PageWrapper>
								<Component />
							</PageWrapper>
						}
					/>
				))}
			</Routes>
		</>
	)
}

export default App
