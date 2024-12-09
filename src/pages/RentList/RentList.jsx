import { useState, useEffect } from 'react';
import axios from 'axios';
import './RentList.css';

function RentList() {
  const [clientes, setClientes] = useState([]); // Lista de clientes
  const [clienteId, setClienteId] = useState(''); // Cliente selecionado
  const [nomeCliente, setNomeCliente] = useState(''); // Nome do cliente
  const [emprestimos, setEmprestimos] = useState([]); // Lista de empréstimos

  useEffect(() => {
    // Função para buscar clientes ao carregar o componente
    const fetchClientes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/admin/listarClientes');
        setClientes(response.data.clientes); // Salva a lista de clientes
        console.log("Clientes recebidos:", response.data.clientes);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        alert('Erro ao buscar clientes');
      }
    };

    fetchClientes();
  }, []); // Executa apenas uma vez ao montar o componente

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!clienteId) {
      alert('Por favor, selecione um cliente.');
      return;
    }

    try {
      // Chama a rota para listar os empréstimos do cliente
      const response = await axios.get(`http://localhost:3000/admin/listarEmprestimosCliente/${clienteId}`);
      
      if (response.data.emprestimos.length > 0) {
        // Atualiza a lista de empréstimos
        setEmprestimos(response.data.emprestimos);
        
        // Atualiza o nome do cliente
        setNomeCliente(response.data.nome_cliente);
      } else {
        setEmprestimos([]);
        setNomeCliente('');
      }
    } catch (error) {
      console.error('Erro ao buscar empréstimos:', error);
      alert('Erro ao buscar empréstimos');
    }
  };

  return (
    <div className="rent-list-container">
      <form className="rent-list-form" onSubmit={handleSubmit}>
        <label htmlFor="cliente">Selecione o Cliente</label>
        <select
          id="cliente"
          value={clienteId}
          onChange={(e) => setClienteId(e.target.value)}
          required
        >
          <option value="">Selecione um Cliente</option>
          {clientes && clientes.length > 0 ? (
            clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nome}
              </option>
            ))
          ) : (
            <option value="">Nenhum cliente encontrado</option>
          )}
        </select>
        <button type="submit">Listar Empréstimos</button>
      </form>

      <div className="rent-list-results">
        {nomeCliente && <h2>Empréstimos de {nomeCliente}</h2>}

        {emprestimos.length > 0 ? (
          <ul>
            {emprestimos.map((emprestimo, index) => (
              <li key={emprestimo.id}>
                <strong>Empréstimo {index + 1}:</strong> {emprestimo.marca} {emprestimo.modelo} - {emprestimo.devolvido ? 'Devolvido' : 'Não Devolvido'}
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhum empréstimo encontrado para este cliente.</p>
        )}
      </div>
    </div>
  );
}

export default RentList;
