import { useState } from 'react';

import { api } from './services/api';

import { FiSearch } from 'react-icons/fi'

import './styles/app.css'

function App() {

  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});

  async function handleSubmit(){
    
    if(input === ""){
      alert("Digite um CEP");
      return;
    }

    try{
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput("");
    }catch{
      alert("Erro ao buscar CEP")
      setInput("");
    }
  }

  return (

    <div className="container">
      <h1 className="title">Buscador CEP</h1>
      <div className="containerInput">
        <input 
          type="text" 
          placeholder="Digite seu CEP"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSubmit}>
          <FiSearch size={25} color="#fff"/>
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>Estado: {cep.uf}</span>
          <span>Cidade: {cep.localidade}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>Rua: {cep.logradouro}</span>
        </main>
      )}
      
    </div>
  )
}

export default App
