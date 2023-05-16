import axios from '../axios'

export const LoginService = async(email, password) => {
	try {
		const { data } = await axios.post('/auth/login', {email , password})
		if(!data) {
			console.log('Ошибка авторизации')
		}
		if(data.token){
			window.localStorage.setItem('token', data.token)
		}
		
		return data
	} catch (error) {
		 console.log(error)
		
	}
}
export const RegisterService = async(email, password, fullName) => {
	try {
		const {data} = await axios.post('/auth/register', {email , password, fullName})
		if(!data) {
			return  console.log('Ошибка регистрации')
		}
		if(data.token){
			window.localStorage.setItem('token', data.token)
		}
		
		return data
	} catch (error) {
		 console.log(error)
		
	}
}