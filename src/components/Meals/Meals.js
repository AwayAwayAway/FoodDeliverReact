import MealsSummary from './MealsSummary';
import AvailableMeals from './AvailableMeals';
// import styles from './Meals.module.css'
import {Fragment} from 'react';

const Meals = props => {
	return (
		<Fragment>
			<AvailableMeals />
			<MealsSummary />
		</Fragment>
	)
}

export default Meals