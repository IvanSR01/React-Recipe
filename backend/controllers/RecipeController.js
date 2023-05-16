import RecipeModals from "../modals/RecipeModals.js";

export const getAll = async (req, res) => {
  try {
    const recipes = await RecipeModals.find().populate("user").exec();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Ошибка на сервере" });
  }
};
export const create = async (req, res) => {
  try {
    const { title, timeOut, text, imageUrl } = req.body;
    const doc = new RecipeModals({
      title,
			timeOut,
      text,
      imageUrl,
      user: req.userId,
    });
    const recipe = await doc.save();
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Не удалось создать статью" });
  }
};
export const getOne = async (req, res) => {
  try {
    const recipeId = req.params.id;
    RecipeModals.findOneAndUpdate(
      { _id: recipeId },
      { $inc: { viewsCount: 1 } },
      { returnDocument: "after" }
    ).then((doc, err) => {
      if (err) {
        return res.status(500).json({ message: "Не удалось получить статью" });
      }
      if (!doc) {
        return res.status(404).json({ message: "Статья не найдена" });
      }
      res.json(doc);
    });
  } catch (error) {
    res.status(500).json({ message: "Ошибка при получение" });
  }
};

export const update = async (req, res) => {
	try {
		const recipeId = req.params.id
		const { title, text, timeOut, imageUrl, tags } = req.body
		await RecipeModals.updateOne(
			{ _id: recipeId },
			{ title, text,timeOut, imageUrl, tags, user: req.userId }
		).then((doc, err) => {
			if (err) {
				return res.status(500).json({ message: 'Не удалось обновить статью' })
			}
			if (!doc) {
				return res.status(404).json({ message: 'Не удалось найти статью' })
			}
			res.json({ success: true })
		})
	} catch (error) {
		res.status(500).json({message:'Не удалось обновить'})
	}
};
export const remove = (req,res) => {
	try {
		const recipeId = req.params.id 
		RecipeModals.deleteOne({_id:recipeId})
		.then((doc,err) => {
			if(err){
				console.log(err)
				res.status(500).json({message:'Ошибка при удаление'})
			}
			if (!doc) {
				return res.status(404).json({ message: 'Cтатья не найдена' })
			}
			return res.json({ success: true })
		})
	} catch (error) {
		res.status(500).json({message:'Ошибка при удаление'})
	}
}