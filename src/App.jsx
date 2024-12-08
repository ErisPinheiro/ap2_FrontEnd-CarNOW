import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './consts/Layout';
import CarList from './pages/CarList/CarList';
import RentForm from './pages/RentForm/RentForm';
import MyRent from './pages/MyRent/MyRent';
import Login from './components/LoginRegister/Login';
import Register from './components/LoginRegister/Register';
import { ROUTES } from './consts/routes';
import './index.css';
import Home from './pages/Home/Home';
import AddCar from './pages/AddCar/AddCar';
import RentList from './pages/RentList/RentList';

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        { path: ROUTES.HOME, element: <Home /> },
        { path: ROUTES.CARROS, element: <CarList /> },
        { path: ROUTES.ALUGUEL, element: <RentForm /> },
        { path: ROUTES.MEUSALUGUEIS, element: <MyRent /> },
        { path: ROUTES.LOGIN, element: <Login /> },
        { path: ROUTES.REGISTRO, element: <Register /> },
        { path: ROUTES.ADICIONARCARRO, element: <AddCar /> },
        { path: ROUTES.LISTAREMPRESTIMOS, element: <RentList /> },

      ],
    },
  ]);

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;