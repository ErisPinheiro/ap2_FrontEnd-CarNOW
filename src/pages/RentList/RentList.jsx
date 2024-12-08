import { useState } from 'react';
import axios from 'axios';

function RentList() {
  const [clienteId, setClienteId] = useState('');
  const [emprestimos, setEmprestimos] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:3000/admin/listarEmprestimosCliente/${clienteId}`);
      setEmprestimos(response.data.emprestimos);
    } catch (error) {
      console.error('Erro ao buscar empréstimos:', error);
      alert('Erro ao buscar empréstimos');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={clienteId}
          onChange={(e) => setClienteId(e.target.value)}
          placeholder="ID do Cliente"
          required
        />
        <button type="submit">Listar Empréstimos</button>
      </form>

      <div>
        {emprestimos.length > 0 ? (
          <ul>
            {emprestimos.map((emprestimo) => (
              <li key={emprestimo.id}>
                {emprestimo.marca} {emprestimo.modelo} - {emprestimo.devolvido ? 'Devolvido' : 'Não Devolvido'}
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
