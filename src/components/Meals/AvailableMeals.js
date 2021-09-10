import styles from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import {useCallback, useEffect, useState} from 'react';

const mealsList = [];

const AvailableMeals = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	const fetchMealsData = useCallback(async () => {
		setIsLoading(true);
		setIsError(false);

		try {
			const response = await fetch('https://react-http-8bdc1-default-rtdb.europe-west1.firebasedatabase.app/meals.json');

			if (!response.ok) {
				throw new Error('Something went wrong!');
			}

			const data = await response.json();

			if (!data) {
				throw new Error('no data');
			}

			for (const key in data) {
				mealsList.push(data[key]);
			}
		} catch (error) {
			setIsError(error.message);
		}

		setIsLoading(false);
	}, []);

	useEffect(() => {
		fetchMealsData();
	}, [fetchMealsData]);

	const mealList = mealsList.map((meal) => (
		<MealItem
			id={meal.id}
			key={meal.id}
			name={meal.name}
			description={meal.description}
			price={meal.price}
		/>
	));

	return (
		<section className={styles.meals}>
			<Card>
				<ul>
					{isLoading ? <p>Loading...</p> : mealList}
					{isError}
				</ul>
			</Card>
		</section>

	);
};

export default AvailableMeals;