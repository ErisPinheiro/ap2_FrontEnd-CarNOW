import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/login', {
        email,
        password,
      });

      // Sucesso no login
      const data = response.data;

      if (response.status === 200) {
        // Salva os dados do usuário no localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', JSON.stringify(data.user));
        // Dispara um evento para notificar outros componentes
        window.dispatchEvent(new Event('Login'));
        navigate('/');
      }
    } catch (err) {
      if (err.response) {
        // Quando há uma resposta de erro do servidor
        setError(err.response.data.error || 'Erro ao fazer login');
      } else {
        setError('Erro ao fazer login. Tente novamente.');
      }
      console.error('Login error:', err);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="auth-button">Entrar</button>
          <p className="auth-switch">
            Não tem uma conta? <Link to="/registro">Registre-se</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
