import { useState } from 'react';
import axios from 'axios';
import './AddCar.css'; 

function AddCar() {
  const [modelo, setModelo] = useState('');
  const [marca, setMarca] = useState('');
  const [anoFabricacao, setAnoFabricacao] = useState('');
  const [valorDiaria, setValorDiaria] = useState('');
  const [placa, setPlaca] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/admin/adicionarVeiculo', {
        modelo,
        marca,
        ano_fabricacao: anoFabricacao,
        valor_diaria: valorDiaria,
        placa,
      });
      alert(response.data.message);
    } catch (error) {
      console.error('Erro ao adicionar carro:', error);
      alert('Erro ao adicionar carro');
    }
  };

  return (
    <div className="addcar-container">
      <form className="addcar-form" onSubmit={handleSubmit}>
        <h2>Adicionar Carro</h2>
        <div className="form-group">
          <label>Modelo</label>
          <input
            type="text"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
            placeholder="Modelo"
            required
          />
        </div>
        <div className="form-group">
          <label>Marca</label>
          <input
            type="text"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            placeholder="Marca"
            required
          />
        </div>
        <div className="form-group">
          <label>Ano de Fabricação</label>
          <input
            type="number"
            value={anoFabricacao}
            onChange={(e) => setAnoFabricacao(e.target.value)}
            placeholder="Ano de Fabricação"
            required
          />
        </div>
        <div className="form-group">
          <label>Valor Diário</label>
          <input
            type="number"
            value={valorDiaria}
            onChange={(e) => setValorDiaria(e.target.value)}
            placeholder="Valor Diário"
            required
          />
        </div>
        <div className="form-group">
          <label>Placa</label>
          <input
            type="text"
            value={placa}
            onChange={(e) => setPlaca(e.target.value)}
            placeholder="Placa"
            required
          />
        </div>
        <button className="addcar-button" type="submit">Adicionar Carro</button>
      </form>
    </div>
  );
}

export default AddCar;
