import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Catalog from "../../features/catalog/Catalog";
import Header from "./Header";
import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { Route, withRouter } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ProductDetails from '../../features/catalog/ProductDetails';
import AboutPage from '../../features/about/AboutPage';
import ContactPage from '../../features/contact/ContactPage';
import BasketPage from '../../features/basket/BasketPage';
import { getCookie } from '../util/util';
import agent from '../api/agent';
import CheckoutPage from '../../features/checkout/CheckoutPage';
import { useAppDispatch } from '../store/configureStore';
import { setBasket } from '../../features/basket/basketSlice';
import LoginPage from '../../features/identity/LoginPage';
import RegisterPage from '../../features/identity/RegisterPage';

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie('buyerId');
    if (buyerId) {
      agent.Basket.get()
        .then(basket => dispatch(setBasket(basket)))
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [dispatch]);

  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode? 'dark': 'light';
  
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light'? '#e8dcb5': '#121212'
      }
    }
  }); 

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  return (
    <ThemeProvider theme={theme} >
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
            <Route exact path='/' component={withRouter(LoginPage)} />
            <Route exact path='/catalog' component={withRouter(Catalog)} />
            <Route exact path='/catalog/:id' component={withRouter(ProductDetails)} />
            <Route exact path='/about' component={withRouter(AboutPage)} />
            <Route exact path='/contact' component={withRouter(ContactPage)} />
            <Route exact path='/basket' component={withRouter(BasketPage)} />
            <Route exact path='/checkout' component={withRouter(CheckoutPage)} />
            <Route exact path='/login' component={withRouter(LoginPage)} />
            <Route exact path='/register' component={withRouter(RegisterPage)} />
      </Container>
    </ThemeProvider>
  );
}

export default App;
