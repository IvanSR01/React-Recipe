import axios from '../axios'

export const GetMeService = async() => {
	try {
		const res = await axios.get('/auth/me')
		return res.data
	} catch (error) {
	  console.log(error)
	}
}