import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModal from "../modals/UserModals.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModal.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "Пользовател не найден" });
    }
		console.log(user)
   const isValidPass = await bcrypt.compare(password, user._doc.passwordHash);
    if (!isValidPass) {
      return res.status(403).json({ message: "Неверный логин или пароль" });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
			 "secret123",
      {
				expiresIn: '30d'
			}
    );
		const { passwordHash, ...userData } = user._doc
		console.log(userData)
		res.json({ ...userData, token })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось авторизоватся",
    });
  }
};
export const register = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json(error.array());
    }
    const {  email, password , fullName } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const doc = new UserModal({
      email,
      passwordHash: hash,
      fullName,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );
		const { passwordHash , ...userData } = user._doc
    res.json({userData , token});
  } catch (error) {
		console.log(error)
    res.status(500).json({ message: "Ошибка на сервере" });
  }
};
export const getMe = async(req,res) => {
	try {
		const user = await UserModal.findOne({_id:req.userId})
		if(!user) {
			return res.status(404).json({message:'Нет пользавателя'})
		}
		const { passwordHash, ...userData } = user._doc
		res.json(userData)
	} catch (error) {
		console.log(error)
		res.status(500).json({message:'Ошибка на сервере'})
	}
}