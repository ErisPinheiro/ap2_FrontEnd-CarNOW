import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkLoginStatus = () => {
            const isUserLoggedIn = localStorage.getItem('isLoggedIn');
            setIsLoggedIn(isUserLoggedIn === 'true');
        };

        checkLoginStatus(); // Verifica o status ao montar o componente

        const handleLoginEvent = () => {
            checkLoginStatus(); // Atualiza o status sempre que o evento for disparado
        };

        // Adiciona um event listener para capturar mudanças no estado de login
        window.addEventListener('Login', handleLoginEvent);

        // Remove o event listener ao desmontar o componente
        return () => {
            window.removeEventListener('Login', handleLoginEvent);
        };
    }, []);

    const handleButtonClick = () => {
        if (isLoggedIn) {
            navigate('/aluguel');
        } else {
            navigate('/login'); 
        }
    };

    return (
        <div className="home-page">
            <div className="content">
                <div>
                    <h1 className="hero-title">Seja bem-vindo a DriveNOW, veja as Ofertas disponíveis!</h1>
                    <p className="hero-subtitle">
                        Aluguel de veículos com segurança. Tecnologia de ponta, processo 100% digital, liberdade total em suas mãos.
                    </p>
                    <div className="button-group">
                        <button className="secondary-button" onClick={handleButtonClick}>
                            {isLoggedIn ? 'Alugue já!' : 'Faça Login'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
