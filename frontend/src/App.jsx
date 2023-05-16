import React, { useEffect, useState } from 'react'
import Header from './components/header/Header'
import { Route, useLocation } from 'react-router-dom'
import Router from './Router/Router'
import Home from './pages/Home/Home'
import FullProduct from './pages/FullProduct/FullProduct'
import Login from './pages/Login/Login'
import { useQuery } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './redux/slice/userDataSlice'
import { GetMeService } from './services/user.service'
import Register from './pages/register/Register'
import Favorite from './pages/Favorite/Favorite'
import Add from './pages/Add/Add'
const App = () => {
	const { pathname } = useLocation()
	const token = window.localStorage.token
	if (token) {
		const { data } = useQuery(['getMe'], () => GetMeService())
		useEffect(() => {
			if (data) {
				dispatch(setUser(data))
			}
		}, [data])
	}
	const dispatch = useDispatch()

	return (
		<div className='body'>
			{pathname === '/auth/login' || pathname === '/auth/register' ? (
				<></>
			) : (
				<Header />
			)}
			<Router />
		</div>
	)
}

export default App
