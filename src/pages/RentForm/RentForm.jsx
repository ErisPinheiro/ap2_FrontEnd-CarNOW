import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import './RentForm.css';

function RentForm() {
  const [formData, setFormData] = useState({
    clienteId: '', // Buscado do localStorage
    veiculoId: '', // Selecionado pelo usuário
    dataEmprestimo: '', // Preenchido pelo usuário
    dataDevolucao: '', // Preenchido pelo usuário
    valorEmprestimo: 0, // Atualizado dinamicamente
  });

  const [veiculos, setVeiculos] = useState([]);
  const [isDateValid, setIsDateValid] = useState(true); // Rastreia a validade das datas

  useEffect(() => {
    
    // Pega o clienteId do localStorage
    const clienteId = JSON.parse(localStorage.getItem('user'))?.id;
    setFormData((prev) => ({ ...prev, clienteId }));
  
    // Fetch veículos disponíveis
    const fetchVeiculos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/listarVeiculos');
  
        // Filtra apenas veículos disponíveis
        const veiculosDisponiveis = response.data.filter((veiculo) => veiculo.disponivel);
  
        setVeiculos(veiculosDisponiveis);
      } catch (err) {
        console.error('Erro ao buscar veículos:', err);
        alert('Erro ao buscar veículos disponíveis. Tente novamente.');
      }
    };
    fetchVeiculos();
  }, []);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    // Valida as datas e recalcula o valor do empréstimo
    const calcularValorEmprestimo = () => {
      const veiculo = veiculos.find((v) => v.id === parseInt(formData.veiculoId));
      if (!veiculo || !formData.dataEmprestimo || !formData.dataDevolucao) {
        return 0;
      }

      const dataInicio = new Date(formData.dataEmprestimo);
      const dataFim = new Date(formData.dataDevolucao);

      if (dataInicio >= dataFim) {
        setIsDateValid(false); 
        return 0;
      } else {
        setIsDateValid(true); 
      }

      const dias = Math.ceil((dataFim - dataInicio) / (1000 * 60 * 60 * 24)); // Calcula a diferença em dias
      return dias > 0 ? dias * veiculo.valor_diaria : 0;
    };

    const valorCalculado = calcularValorEmprestimo();
    setFormData((prev) => ({ ...prev, valorEmprestimo: valorCalculado }));
  }, [formData.dataEmprestimo, formData.dataDevolucao, formData.veiculoId, veiculos]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.valorEmprestimo <= 0) {
      alert('Por favor, selecione datas válidas.');
      return;
    }

    try {
      // Enviar os dados para o backend
      await axios.post('http://localhost:3000/inserirEmprestimos', {
        cliente_id: formData.clienteId,
        veiculo_id: formData.veiculoId,
        data_emprestimo: formData.dataEmprestimo,
        data_devolucao: formData.dataDevolucao,
        valor_emprestimo: formData.valorEmprestimo,
      });

      // Atualizar o veículo para indisponível
      const veiculoId = formData.veiculoId;
      await axios.put(`http://localhost:3000/disponibilidadeVeiculo/${veiculoId}`, {
        disponivel: false,
      });

      alert('Empréstimo solicitado com sucesso!');
    } catch (err) {
      console.error('Erro ao solicitar empréstimo:', err);
      alert('Erro ao processar a solicitação. Tente novamente.');
    }
  };

  return (
    <Fragment>
      <div className="rent-form container">
        <h1>Solicitar Empréstimo</h1>
        <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Selecione o Veículo</label>
          <select
            name="veiculoId"
            value={formData.veiculoId}
            onChange={handleChange}
            required
          >
            <option value="">Escolha um veículo</option>
            {veiculos.map((veiculo) => (
              <option key={veiculo.id} value={veiculo.id}>
                {veiculo.marca} {veiculo.modelo} - {veiculo.ano_fabricacao}
              </option>
            ))}
          </select>
        </div>
          <div className="form-row">
            <div className="form-group">
              <label>Data Empréstimo</label>
              <input
                type="date"
                name="dataEmprestimo"
                value={formData.dataEmprestimo}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Data Devolução</label>
              <input
                type="date"
                name="dataDevolucao"
                value={formData.dataDevolucao}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Valor do Empréstimo</label>
            <input
              type="text"
              value={`R$ ${formData.valorEmprestimo.toFixed(2)}`}
              readOnly
              disabled
            />
          </div>

          <button type="submit" className="btn-submit" hidden={!isDateValid}>
            Solicitar Empréstimo
          </button>

          {!isDateValid && (
            <div className="error-message" style={{ color: 'red' }}>
              A data de início deve ser menor que a data de devolução.
            </div>
          )}
        </form>
      </div>
    </Fragment>
  );
}

export default RentForm;
