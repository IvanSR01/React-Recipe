import React, { useEffect } from "react";
import style from "./Home.module.scss";
import Product from "../../components/Product/Product";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipe } from "../../redux/slice/getRecipeSlice";
const Home = () => {
	const dispatch = useDispatch()
	const items = useSelector(state => state.getRecipe.items)
	useEffect(() => {
		dispatch(fetchRecipe())
	} , [])
  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <h2 className={style.h2}>Все рецепты</h2>
      </div>
			<div className={style.items}>
				{items.map((item, i) => (
					<Product {...item} key={i}/>
				))}
			</div>
    </div>
  );
};

export default Home;
