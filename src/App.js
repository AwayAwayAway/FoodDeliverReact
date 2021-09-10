import Header from './components/Layout/Header';
import {useState} from 'react';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';
import OrdreInput from './components/OrderInput/OrdreInput';

function App() {
	const [cartIsShown, setCartIsShown] = useState(false);
	const [orderConfirmIsShown, setOrderConfirmIsShown] = useState(false);

	const showCartHandler = () => {
		setCartIsShown(true)
	};

	const hideCartHandler = () => {
		setCartIsShown(false);
	};

	const showOrderConfirm = () => {
		setOrderConfirmIsShown(true);
	}

	const hideOrderConfirm = () => {
		setOrderConfirmIsShown(false);
	}

	return (
		<CartProvider>
			{cartIsShown && <Cart onClose={hideCartHandler} onOrderConfirm={showOrderConfirm}/>}
			{orderConfirmIsShown && <OrdreInput onClose={hideOrderConfirm}/>}
			<Header onShownCart={showCartHandler} />
				<main>
					<Meals/>
				</main>
		</CartProvider>
	);
}

export default App;
