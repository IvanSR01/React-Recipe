import React from 'react'
import Product from '../../components/Product/Product'
import styles from './Favorite.module.scss'
import { useSelector } from 'react-redux'
const Favorite = () => {
	const { items } = useSelector(state => state.favorite)
	return (
		<div className={styles.wrapper}>
			{items.length !== 0 ? (
				<>
					<h2 className={styles.h2}>Избарное</h2>
					<div>
						{items.map((item, i) => (
							<Product {...item} key={i} />
						))}
					</div>
				</>
			) : (
				<>
					<h2 className={styles.NotItem}>Тут ничего нет :(</h2>
				</>
			)}
		</div>
	)
}

export default Favorite
