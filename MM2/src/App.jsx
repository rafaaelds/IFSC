import { useState, useEffect } from 'react';
import './App.css';

const ENDPOINT = 'https://jsonplaceholder.typicode.com/posts';

export default function App() {
  const [veiculo, setVeiculo] = useState({
    placa: '',
    marca: '',
    modelo: ''
  });
  const [erros, setErros] = useState({
    placa: '',
    marca: '',
    modelo: ''
  });
  const [formularioValido, setFormularioValido] = useState(false);

  const [enviando, setEnviando] = useState(false);
  const [statusEnvio, setStatusEnvio] = useState('');
  const [tipoStatus, setTipoStatus] = useState('');
  const [dadosEnviados, setDadosEnviados] = useState(null);

  const validarCampo = (nome, valor) => {
    const valorLimpo = valor.trim();

    if (nome === 'placa') {
      const regexPlaca = /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/i;
      if (!valorLimpo) return 'A placa é obrigatória.';
      if (!regexPlaca.test(valorLimpo.replace('-', ''))) {
        return 'Placa inválida (ex: ABC1234 ou ABC1D23).';
      }
    }

    if (nome === 'marca') {
      if (!valorLimpo) return 'A marca é obrigatória.';
      if (valorLimpo.length < 2) return 'A marca deve ter pelo menos 2 caracteres.';
    }
    if (nome === 'modelo') {
      if (!valorLimpo) return 'O modelo é obrigatório.';
      if (valorLimpo.length < 2) return 'O modelo deve ter pelo menos 2 caracteres.';
    }
    return '';
  };

  const handleChange = (evento) => {
    const { name, value } = evento.target;

    setVeiculo((anterior) => ({
      ...anterior,
      [name]: value
    }));

    setErros((anterior) => ({
      ...anterior,
      [name]: validarCampo(name, value)
    }));
  };
  useEffect(() => {
    const camposPreenchidos =
      veiculo.placa.trim() !== '' &&
      veiculo.marca.trim() !== '' &&
      veiculo.modelo.trim() !== '';

    const semErros =
      erros.placa === '' &&
      erros.marca === '' &&
      erros.modelo === '';

    setFormularioValido(camposPreenchidos && semErros);
  }, [veiculo, erros]);

  const handleSubmit = async (evento) => {
    evento.preventDefault();

    if (!formularioValido || enviando) return;

    const payload = {
      placa: veiculo.placa.toUpperCase().replace('-', '').trim(),
      marca: veiculo.marca.trim(),
      modelo: veiculo.modelo.trim()
    };

    setEnviando(true);
    setTipoStatus('');
    setStatusEnvio('Enviando dados para o endpoint REST...');
    setDadosEnviados(null);

    try {
      const resposta = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (resposta.ok) {
        const dadosResposta = await resposta.json();
        setTipoStatus('sucesso');
        setStatusEnvio('Sucesso! Veículo cadastrado. Resposta do servidor:');
        setDadosEnviados(dadosResposta);
        setVeiculo({ placa: '', marca: '', modelo: '' });
      } else {
        setTipoStatus('falha');
        setStatusEnvio('O servidor recusou o cadastro (código ' + resposta.status + '). JSON enviado:');
        setDadosEnviados(payload);
      }
    } catch (erro) {
      setTipoStatus('falha');
      setStatusEnvio('Não foi possível conectar ao endpoint. JSON que seria enviado:');
      setDadosEnviados(payload);
    } finally {
      setEnviando(false);
    }
  };
  return (
    <div className="container-pagina">
      <header className="topo-sistema">
        <h1>Sistema Norteador - Lavação</h1>
      </header>

      <main className="caixa-formulario">
        <h2>Cadastro de Veículos (React)</h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className="campo">
            <label htmlFor="placa">Número da Placa:</label>
            <input
              type="text"
              id="placa"
              name="placa"
              value={veiculo.placa}
              onChange={handleChange}
              placeholder="Ex: ABC1D23 ou ABC1234"
              maxLength="8"
            />
            {erros.placa && <span className="erro">{erros.placa}</span>}
          </div>

          <div className="campo">
            <label htmlFor="marca">Marca do Veículo:</label>
            <input
              type="text"
              id="marca"
              name="marca"
              value={veiculo.marca}
              onChange={handleChange}
              placeholder="Ex: Fiat, Renault, Chevrolet"
            />
            {erros.marca && <span className="erro">{erros.marca}</span>}
          </div>

          <div className="campo">
            <label htmlFor="modelo">Modelo do Veículo:</label>
            <input
              type="text"
              id="modelo"
              name="modelo"
              value={veiculo.modelo}
              onChange={handleChange}
              placeholder="Ex: Argo, Kwid, Onix"
            />
            {erros.modelo && <span className="erro">{erros.modelo}</span>}
          </div>

          {/* botão só fica ativo com o formulário válido e fora de um envio */}
          <button
            type="submit"
            className="btn-salvar"
            disabled={!formularioValido || enviando}
          >
            {enviando ? 'Enviando...' : 'Salvar Veículo'}
          </button>
        </form>

        {statusEnvio && (
          <div className={'alerta-status ' + tipoStatus}>
            <p><strong>Status:</strong> {statusEnvio}</p>
            {dadosEnviados && (
              <pre className="json-preview">
                {JSON.stringify(dadosEnviados, null, 2)}
              </pre>
            )}
          </div>
        )}
      </main>
    </div>
  );
}