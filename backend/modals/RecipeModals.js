import mongoose from "mongoose";


const RecipeSchema = new mongoose.Schema({
	title:{
		type:String,
		require:true,
		unique:true
	},
	text:{
		type:String,
		require:true
	},
	viewsCount:{
		type: Number,
		default:0
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		require:true
	},
	timeOut: {
		type:Number,
		require:true
	},
	imageUrl: String,
}, {
	timestamps:true,
})

export default mongoose.model('Recipe', RecipeSchema)
