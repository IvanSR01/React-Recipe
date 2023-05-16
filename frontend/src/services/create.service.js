import axios from "../axios"

export const CreateService = async(title,text,imageUrl) => {
	try {
		const { data } = await axios.post('/recipes/new',{title,text,imageUrl})
		return data
	} catch (error) {
		console.log(error)
	}
}