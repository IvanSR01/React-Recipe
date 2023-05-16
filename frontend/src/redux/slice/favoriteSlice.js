import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	items:[]
}

const favoriteSlice = createSlice({
	name:'favorite',
	initialState,
	reducers:{
		toggleItemsFavorite: ({items}, {payload}) => {
			const findItem = items.find(obj => obj._id === payload._id)
			if(findItem){
				const findIndex = items.indexOf(findItem)
				 items = items.splice(findIndex, findIndex + 1)
			} else {
				items.push(payload)
			}

		}
	}
})
export const { toggleItemsFavorite } = favoriteSlice.actions

export default favoriteSlice.reducer