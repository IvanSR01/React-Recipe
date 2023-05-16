import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchRecipe = createAsyncThunk('recipe/fetchRecipe', async() => {
	const { data } = await axios.get('/recipes')

	return data
})
export const fetchRecipeOne = createAsyncThunk('recipeOne/fetchRecipeOne', async(id) => {
	const { data } = await axios.get(`/recipe/${id}`)
	return data
})
const initialState = {
	items:[],
	itemsOne:{},
	status: 'loading' // loading || success || error
}
const getRecipeSlice = createSlice({
	name:'getRecipe',
	initialState,
	extraReducers: builder => {
		builder.addCase(fetchRecipe.pending, state => {
			state.status = 'loading'
			state.items = []
		})
		builder.addCase(fetchRecipe.fulfilled, (state, {payload}) => {
			state.status = 'success'
			state.items = payload
		})
		builder.addCase(fetchRecipe.rejected, state => {
			state.status = 'error'
			state.items = []
		})
		builder.addCase(fetchRecipeOne.pending, state => {
			state.status = 'loading'
			state.itemsOne = []
		})
		builder.addCase(fetchRecipeOne.fulfilled, (state, {payload}) => {
			state.status = 'success'
			state.itemsOne = payload
		})
		builder.addCase(fetchRecipeOne.rejected, state => {
			state.status = 'error'
			state.itemsOne = []
		})
	}
})
export default getRecipeSlice.reducer