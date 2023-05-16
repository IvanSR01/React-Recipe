import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import Register from '../pages/register/Register'
import FullProduct from '../pages/FullProduct/FullProduct'
import Favorite from '../pages/Favorite/Favorite'
import Add from '../pages/Add/Add'
import NotFound from '../pages/NotFound/NotFound'
export const DataRoute = [
	{
		path: '/',
		element: Home
	},
	{
		path: '/auth/login',
		element: Login
	},
	{
		path: '/auth/register',
		element: Register
	},
	{
		path: '/full/:id',
		element: FullProduct
	},
	{
		path: '/favorite',
		element: Favorite
	},
	{
		path: '/Add',
		element: Add
	},
	{
		path: '*',
		element: NotFound
	}
]
