    import { useState, useEffect } from 'react';
    import axios from 'axios';
    import './AddCar.css';
    import { useNavigate, useParams } from 'react-router-dom';

    function EditCar() {
    const [modelo, setModelo] = useState('');
    const [marca, setMarca] = useState('');
    const [anoFabricacao, setAnoFabricacao] = useState('');
    const [valorDiaria, setValorDiaria] = useState('');
    const [placa, setPlaca] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchCarDetails();
    }, []);

    const fetchCarDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/admin/detalhesVeiculo/${id}`);
        const { modelo, marca, ano_fabricacao, valor_diaria, placa } = response.data;
        setModelo(modelo);
        setMarca(marca);
        setAnoFabricacao(ano_fabricacao);
        setValorDiaria(valor_diaria);
        setPlaca(placa);
        } catch (error) {
        console.error('Erro ao buscar detalhes do carro:', error);
        alert('Erro ao buscar detalhes do carro');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // eslint-disable-next-line no-unused-vars
            const response = await axios.put(`http://localhost:3000/admin/atualizarVeiculo/${id}`, {
                modelo,
                marca,
                ano_fabricacao: anoFabricacao,
                valor_diaria: valorDiaria,
                placa: placa.toUpperCase(),
            });
        alert('Carro atualizado com sucesso!');
        navigate('/carros'); // Volta para a lista de carros
        } catch (error) {
        console.error('Erro ao atualizar carro:', error);
        alert('Erro ao atualizar carro');
        }
    };

    return (
        <div className="addcar-container">
        <form className="addcar-form" onSubmit={handleSubmit}>
            <h2>Editar Carro</h2>
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
                placeholder="Formato: AAA0A00"
                required
            />
            </div>
            <button className="addcar-button" type="submit">Atualizar Carro</button>
        </form>
        </div>
    );
    }

    export default EditCar;
