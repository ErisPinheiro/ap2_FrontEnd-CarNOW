import './Home.css';

const Home = () => {
    return (
        <div className="home-page">
            <div className="content">
                <div>
                    <h1 className="hero-title">Seja bem-vindo a CarNOW, veja as Ofertas disponíveis!</h1>
                    <p className="hero-subtitle">
                        Aluguel de veículos com segurança. Tecnologia de ponta, processo 100% digital, liberdade total em suas mãos.
                    </p>
                    <div className="button-group">

                        <button className="secondary-button">
                            Alugue ja!
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
