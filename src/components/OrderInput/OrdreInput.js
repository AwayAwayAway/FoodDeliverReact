import useInput from './useInput';
import styles from './OrderInput.module.css';
import Modal from '../UI/Modal';
import {useContext, useState} from 'react';
import CartContext from '../../store/cart-context';

const OrderInput = props => {
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [orderSent, setOrderSent] = useState(false);

	const orderCtx = useContext(CartContext);

	const {
		enteredValue: nameValue,
		valueIsValid: nameIsValid,
		valueIsInvalid: nameHasError,
		valueChangeHandler: nameChangeHandler,
		valueBlurHandler: nameBlurHandler,
		resetValue: nameReset
	} = useInput(value => value.trim() !== '');

	const {
		enteredValue: addressValue,
		valueIsValid: addressIsValid,
		valueIsInvalid: addressHasError,
		valueChangeHandler: addressChangeHandler,
		valueBlurHandler: addressBlurHandler,
		resetValue: addressReset
	} = useInput(value => value.trim() !== '');

	let formIsValid = false;

	if (nameIsValid && addressIsValid) {
		formIsValid = true;
	}

	const formSubmitHandler = event => {
		event.preventDefault();

		if (!formIsValid) {
			return;
		}

		nameReset();
		addressReset();
	};

	const sendOrder = async () => {
		const order = {
			id: Math.random(),
			name: nameValue,
			address: addressValue,
			meal: orderCtx.items,
			amount: orderCtx.totalAmount
		}

		try {
			setIsLoading(true);
			setIsError(false);

			const sendOrder = await fetch('https://react-http-8bdc1-default-rtdb.europe-west1.firebasedatabase.app/meals-order.json', {
				method: 'POST',
				body: JSON.stringify(order),
				headers: {
					'Content-type': 'application/json'
				}
			})

			const response = await sendOrder.json();

			if(!response) {
				throw new Error('Order didn\'t send, try again');
			}

			setIsLoading(false);
			setOrderSent(true);
		} catch (error) {
			setIsLoading(false);
			setIsError(true);
		}
	}

	return (
		<Modal onClose={props.onClose}>
			<form onSubmit={formSubmitHandler}>
				<div className={styles.formControl}>
					<label htmlFor="name">Name</label>
					<input
						type="text"
						id="name"
						value={nameValue}
						onChange={nameChangeHandler}
						onBlur={nameBlurHandler}
					/>
					{nameHasError && <p className={styles.errorText}>Please enter your name</p>}
				</div>
				<div className={styles.formControl}>
					<label htmlFor="address">Address</label>
					<input
						type="text"
						id="address"
						value={addressValue}
						onChange={addressChangeHandler}
						onBlur={addressBlurHandler}
					/>
					{addressHasError && <p className={styles.errorText}>Please enter your name</p>}
				</div>
				<div className={styles.formActions}>
					{orderSent && <p className={styles.successText}>Order accepted</p>}
					{isLoading && <p>Loading...</p>}
					{isError && <p className={styles.errorText}>'Order didn't send, try again'</p>}
					<button onClick={sendOrder} disabled={!formIsValid}>Submit</button>
					<button onClick={props.onClose}>Close</button>
				</div>
			</form>
		</Modal>
	);
};

export default OrderInput;