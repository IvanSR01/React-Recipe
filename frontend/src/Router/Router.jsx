import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { DataRoute } from './DataRoute'
const Router = () => {
	return (
		<Routes>
			{DataRoute.map((item, i) => (
				<Route key={i} path={item.path} element={<item.element />} />
			))}
		</Routes>
	)
}

export default Router
