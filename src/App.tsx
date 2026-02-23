import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import routesConfig from './rootConfig/rootConfig'

const App: React.FC = () => {
	return (
		<>
			<Router>
				<Routes>
					{routesConfig.map((route, index) => {
						const Component = route.Component
						return (
							<Route key={index} path={route.path} element={<Component />} />
						)
					})}
				</Routes>
			</Router>
		</>
	)
}

export default App
