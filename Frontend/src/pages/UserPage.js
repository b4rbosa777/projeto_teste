import React, { useState, useEffect } from 'react';
import UserInfoCard from '../components/UserInfoCard/UserInfoCard';

const UserPage = () => {
  // Estado com dados fictícios (a ser substituído pela API)
  const [userData, setUserData] = useState({
    name: 'João da Silva',
    password: '********', // Senha fictícia oculta
  });
  const [editMode, setEditMode] = useState(false); // Controla o modo de edição
  const [newName, setNewName] = useState(userData.name);
  const [newPassword, setNewPassword] = useState(''); // Campo para a nova senha

  // Simulação de busca de dados de usuário (substituir pela API)
  useEffect(() => {
    const fetchUserData = async () => {
      // Exemplo de requisição futura da API (substitua 'URL_DA_API' pela sua URL)
      // const response = await fetch('URL_DA_API/user');
      // const data = await response.json();
      // setUserData(data); // Atualiza o estado com os dados reais da API

      console.log('Dados fictícios carregados');
    };

    fetchUserData();
  }, []);

  // Função para salvar as alterações (substituir pela API)
  const handleSave = async () => {
    // Exemplo de requisição PUT ou PATCH para atualizar os dados (substitua 'URL_DA_API' pela sua URL)
    // await fetch('URL_DA_API/user', {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ name: newName, password: newPassword })
    // });

    setUserData({ ...userData, name: newName });
    setEditMode(false);
    console.log('Alterações salvas'); // Remover após integração com a API
  };

  return (
    <div style={{
      maxWidth: '400px', // Card mais compacto
      margin: '0 auto',
      padding: '1.5rem',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      textAlign: 'left',
    }}>
      <h2 style={{
        textAlign: 'center',
        color: '#333',
        marginBottom: '1rem',
        fontSize: '1.5rem',
      }}>
        Perfil do Usuário
      </h2>

      {editMode ? (
        <>
          <div style={{ marginBottom: '1rem' }}>
            <label>Nome:</label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                marginTop: '0.5rem',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label>Nova Senha:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                marginTop: '0.5rem',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            />
          </div>

          <button
            onClick={handleSave}
            style={{
              width: '100%',
              padding: '0.5rem',
              backgroundColor: '#4CAF50',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginBottom: '0.5rem',
            }}
          >
            Salvar Alterações
          </button>
          <button
            onClick={() => setEditMode(false)}
            style={{
              width: '100%',
              padding: '0.5rem',
              backgroundColor: '#ccc',
              color: '#333',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Cancelar
          </button>
        </>
      ) : (
        <>
          <UserInfoCard label="Nome" value={userData.name} />
          <UserInfoCard label="Senha" value={userData.password} />
          <button
            onClick={() => setEditMode(true)}
            style={{
              width: '100%',
              padding: '0.5rem',
              backgroundColor: '#4CAF50',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '1rem',
            }}
          >
            Editar Perfil
          </button>
        </>
      )}
    </div>
  );
};

export default UserPage;
