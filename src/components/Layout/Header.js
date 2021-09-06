import { Fragment } from 'react';
import styles from './Header.module.css'
import mealsImage from '../../assets/meals.jpg'
import HeaderCartBtn from './HeaderCartBtn';

const Header = props => {
	return (
		<Fragment>
			<header className={styles.header}>
				<h1>ReactMeals</h1>
				<HeaderCartBtn  onClick={props.onShownCart}/>
			</header>
			<div className={styles['main-image']}>
				<img src={mealsImage} alt='A table full of food'/>
			</div>
		</Fragment>
	)
};

export default Header;