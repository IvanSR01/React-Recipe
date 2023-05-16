import React, { useEffect, useState } from "react";
import styles from "./Product.module.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleItemsFavorite } from "../../redux/slice/favoriteSlice";
const Product = ({_id, title , text, imageUrl, user, viewsCount}) => {
  const [isLike, setIsLike] = useState(false);
	const { items } = useSelector(state => state.favorite)
	const item = {_id, title, text , imageUrl, user, viewsCount }
	const dispatch = useDispatch()
	useEffect(() => {
		const findItem = items.find(obj => obj._id === item._id)
		if(findItem) return setIsLike(true)
	},[items])
  const onClick = () => {
		dispatch(toggleItemsFavorite(item))
    if (isLike) return setIsLike(false);
    return setIsLike(true);
  };
  return (
    <div className={styles.wrapper}>
      <div>
        <img className={styles.img} src={`http://localhost:4444${imageUrl}`} alt="" />
      </div>
      <div className={styles.desc}>
        <Link to={`/full/${_id}`} style={{ textDecoration: "none" }}>
          <h2>{title}</h2>
        </Link>
        <p>Автор: {user.fullName}</p>
        <div className={styles.footer}>
          <button onClick={() => onClick()} className={isLike ? styles.active : ''}>
            {isLike ? (
              <>
                <img src="public/serviceImg/remove-svgrepo-com.svg" alt="" />
                Удалить из избраного
              </>
            ) : (
              <>
                <img src="public/serviceImg/favorite-svgrepo-com.svg" alt="" />
                Добавить в избраное
              </>
            )}
          </button>
          <span>
            <img src="public/serviceImg/eye-svgrepo-com.svg" alt="" />
						{viewsCount}
          </span>
          <span>
            <img src="public/serviceImg/favorite-book-svgrepo-com.svg" alt="" />
            0
          </span>
        </div>
      </div>
    </div>
  );
};

export default Product;
