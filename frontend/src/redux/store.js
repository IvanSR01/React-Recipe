import { configureStore } from "@reduxjs/toolkit";
import userDataSlice from "./slice/userDataSlice";
import getRecipeSlice from "./slice/getRecipeSlice";
import favoriteSlice from "./slice/favoriteSlice";


export const store = configureStore({
	reducer:{
		UserData: userDataSlice,
		getRecipe: getRecipeSlice,
		favorite: favoriteSlice
	}
})