import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CarList.css';

function CarList() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCars();
    checkAdminStatus(); 
  }, []);

  const fetchCars = () => {
    setLoading(true);
    axios.get('http://localhost:3000/listarVeiculos')
      .then(response => {
        setCars(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar os carros:', error);
        setLoading(false);
      });
  };

  const checkAdminStatus = () => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser && parsedUser.nome === 'Admin') {
        setIsAdmin(true);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
        await axios.delete(`http://localhost:3000/admin/deletarVeiculo/${id}`);
        alert('Carro excluído com sucesso!');
        fetchCars(); // Atualiza a lista após exclusão
    } catch (error) {
        console.error('Erro ao excluir o carro:', error);
        alert('Erro ao excluir o carro');
    }
  };

  const handleEdit = (id) => {
    navigate(`/editarCarro/${id}`); // Navega para a página de edição
  };

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

              {/* Indicação de disponibilidade */}
              <p className={`car-status ${carro.disponivel ? 'disponivel' : 'indisponivel'}`}>
                {carro.disponivel ? 'Disponível' : 'Indisponível'}
              </p>

              {isAdmin && ( // Exibe os botões de editar e excluir apenas se o usuário for admin
                <div className="button-group">
                  <button 
                    className="btn-control"
                    onClick={() => handleEdit(carro.id)}
                  >
                    Editar
                  </button>
                  <button 
                    className="btn-control"
                    onClick={() => handleDelete(carro.id)}
                  >
                    Excluir
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarList;
