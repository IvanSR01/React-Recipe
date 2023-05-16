import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	data:null
}

const userDataSlice = createSlice({
	name:'UserData',
	initialState,
	reducers:{
		setUser: (state, action) => {
			state.data = action.payload
		},
		removeUser: (state) =>{
			state.data = null
		}
	}
})
export const { setUser, removeUser } = userDataSlice.actions

export default userDataSlice.reducer