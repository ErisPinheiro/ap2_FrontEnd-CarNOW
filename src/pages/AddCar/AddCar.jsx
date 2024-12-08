import { useState } from 'react';
import axios from 'axios';

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={modelo}
        onChange={(e) => setModelo(e.target.value)}
        placeholder="Modelo"
        required
      />
      <input
        type="text"
        value={marca}
        onChange={(e) => setMarca(e.target.value)}
        placeholder="Marca"
        required
      />
      <input
        type="number"
        value={anoFabricacao}
        onChange={(e) => setAnoFabricacao(e.target.value)}
        placeholder="Ano de Fabricação"
        required
      />
      <input
        type="number"
        value={valorDiaria}
        onChange={(e) => setValorDiaria(e.target.value)}
        placeholder="Valor Diário"
        required
      />
      <input
        type="text"
        value={placa}
        onChange={(e) => setPlaca(e.target.value)}
        placeholder="Placa"
        required
      />
      <button type="submit">Adicionar Carro</button>
    </form>
  );
}

export default AddCar;
