import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkLoginStatus = () => {
            const isUserLoggedIn = localStorage.getItem('isLoggedIn');
            const user = localStorage.getItem('user');

            if (isUserLoggedIn === 'true' && user) {
                setIsLoggedIn(true);
                const parsedUser = JSON.parse(user);
                if (parsedUser && parsedUser.nome) {
                    setUserName(parsedUser.nome);
                }
                if (parsedUser && parsedUser.nome === 'Admin') {
                    setIsAdmin(true);
                }
            }
        };


        checkLoginStatus();
        
        const handleLoginEvent = () => {
            checkLoginStatus();
        };

        window.addEventListener('Login', handleLoginEvent);

        return () => {
            window.removeEventListener('Login', handleLoginEvent);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUserName('');
        setIsAdmin(false);
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo"
                 onClick={() => navigate('/')}
            >
                <img src="/DriveNOW.png" alt="logo" />
            </div>
            <ul className="navbar-menu">
                <li><Link to="/carros">Carros</Link></li>
                {isAdmin && (
                    <>
                        <li><Link to="/adicionar-carro">Adicionar Carro</Link></li>
                        <li><Link to="/listar-emprestimos">Listar Empréstimos</Link></li>
                    </>
                )}
                {isLoggedIn && (
                    <>
                        <li><Link to="/aluguel">Novo Empréstimo</Link></li>
                        <li><Link to="/meus-alugueis">Meus Empréstimos</Link></li>
                        <li><span className="navbar-username">Bem-vindo, {userName}</span></li>
                    </>
                )}
                {!isLoggedIn ? (
                    <li><Link to="/login">Login</Link></li>
                ) : (
                    <li>
                        <button onClick={handleLogout} className="logout-button">Logout</button>
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
