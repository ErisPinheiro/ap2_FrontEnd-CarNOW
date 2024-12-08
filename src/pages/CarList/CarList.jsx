import { useEffect, useState } from 'react';
import axios from 'axios';
import './CarList.css';

function CarList() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3000/listarVeiculos')
      .then(response => {
        setCars(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar os carros:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="car-list container">
      <h1>Carros Disponíveis</h1>
      <div className="car-grid">
        {cars.map(carro => (
          <div 
            key={carro.id} 
            className={`car-card ${!carro.disponivel ? 'indisponivel' : ''}`}
          >
            <div className="car-info">
              <h2>{carro.marca} {carro.modelo}</h2>
              <p>Ano: {carro.ano_fabricacao}</p>
              <p>Valor diária: R$ {carro.valor_diaria},00</p>
              <p>Placa: {carro.placa}</p>
              <button 
                disabled={!carro.disponivel}
                className={carro.disponivel ? 'btn-alugar' : 'btn-indisponivel'}
              >
                {carro.disponivel ? 'Disponivel' : 'Indisponível'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarList;
