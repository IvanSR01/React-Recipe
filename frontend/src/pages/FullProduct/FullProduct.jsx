import React, { useEffect } from "react";
import styles from "./FullProduct.module.scss";
import eye from "../../../public/serviceImg/eye-svgrepo-com.svg";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipeOne } from "../../redux/slice/getRecipeSlice";
const FullProduct = () => {
	const { id } = useParams()
	const dispatch = useDispatch()
	const item = useSelector(state => state.getRecipe.itemsOne)
	useEffect(() => {
		dispatch(fetchRecipeOne(id))
	} ,[])
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <header>
          <h2>{item.title}</h2>
          <img className={styles.viewCount} src={eye} alt="" />
					<span>{item.viewsCount}</span>
        </header>
        <div className={styles.text}>
          <div className={styles.img}>
            <img src={`http://localhost:4444${item.imageUrl}`} alt="" />
          </div>
					<p>
						{item.text}
					</p>
        </div>
      </div>
    </div>
  );
};

export default FullProduct;
