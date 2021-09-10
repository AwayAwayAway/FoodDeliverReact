import {useState} from 'react';

const useInput = validateValue => {
	const [enteredValue, setEnteredValue] = useState('');
	const [isTouched, setIsTouched] = useState(false);

	const valueIsValid = validateValue(enteredValue);
	const valueIsInvalid = !valueIsValid && isTouched;

	const valueChangeHandler = event => {
		setEnteredValue(event.target.value);
	};

	const valueBlurHandler = event => {
		setIsTouched(true);
	};

	const resetValue = () => {
		setEnteredValue('');
		setIsTouched(false);
	}

	return {
		enteredValue,
		valueIsValid,
		valueIsInvalid,
		isTouched,
		valueChangeHandler,
		valueBlurHandler,
		resetValue
	}
};

export default useInput;