import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import styles from './ReportGenerator.module.css';

const ReportGenerator = () => {
  // Estado dos filtros de data e tipo de relatório
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportType, setReportType] = useState('temperature');

  // Estado para os dados do relatório; atualmente usa dados fictícios
  const [data, setData] = useState([]);

  /**
   * Função `fetchData` simula a obtenção de dados do relatório.
   * FUTURAMENTE: substituir a lógica abaixo por uma requisição real para a API.
   * 
   * Exemplo de integração com API:
   * - Descomente e substitua a URL da API conforme necessário.
   * - Use query params para `type`, `start`, e `end` para filtragem de dados na API.
   * 
   * Código da API (substitua `URL_DA_API` pela URL correta):
   * 
   * useEffect(() => {
   *   const fetchData = async () => {
   *     const response = await fetch(`URL_DA_API/reports?type=${reportType}&start=${startDate}&end=${endDate}`);
   *     const data = await response.json();
   *     setData(data); // Atualiza o estado com os dados da API
   *   };
   * 
   *   fetchData();
   * }, [reportType, startDate, endDate]);
   */
  useEffect(() => {
    const fetchData = () => {
      // Dados fictícios para simular o retorno da API
      const mockData = Array.from({ length: 10 }, (_, i) => ({
        date: `2024-10-${10 + i}`,
        value: Math.floor(Math.random() * 10) + 20, // Gera valores entre 20 e 30
      }));
      setData(mockData);
    };

    fetchData();
  }, [reportType]);

  /**
   * Função para gerar um relatório em PDF usando os dados disponíveis.
   * - O PDF será gerado com os dados em `data`, que futuramente virão da API.
   */
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Relatório de Dados da Estufa Inteligente', 10, 10);
    doc.text(`Tipo de Relatório: ${reportType === 'temperature' ? 'Temperatura' : reportType === 'humidity' ? 'Umidade do Ar' : 'Umidade do Solo'}`, 10, 20);
    doc.text(`Data de Início: ${startDate}`, 10, 30);
    doc.text(`Data de Fim: ${endDate}`, 10, 40);

    // Adiciona os dados fictícios (ou reais da API) ao PDF
    data.forEach((item, index) => {
      doc.text(`${item.date}: ${item.value} ${reportType === 'temperature' ? '°C' : '%'}`, 10, 50 + index * 10);
    });

    // Salva o PDF gerado
    doc.save(`Relatorio_${reportType}.pdf`);
  };

  return (
    <div className={styles.container}>
      <h2>Gerar Relatório</h2>
      
      {/* Filtros de Data e Tipo de Relatório */}
      <div className={styles.filters}>
        <div className={styles.filter}>
          <label>Data de Início:</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        
        <div className={styles.filter}>
          <label>Data de Fim:</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
        
        <div className={styles.filter}>
          <label>Tipo de Relatório:</label>
          <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
            <option value="temperature">Temperatura</option>
            <option value="humidity">Umidade do Ar</option>
            <option value="soil">Umidade do Solo</option>
          </select>
        </div>
      </div>

      {/* Pré-visualização dos Dados (dados fictícios) */}
      <div className={styles.dataPreview}>
        <h3>Dados de {reportType === 'temperature' ? 'Temperatura' : reportType === 'humidity' ? 'Umidade do Ar' : 'Umidade do Solo'}</h3>
        <ul>
          {data.map((item, index) => (
            <li key={index}>{item.date}: {item.value} {reportType === 'temperature' ? '°C' : '%'}</li>
          ))}
        </ul>
      </div>

      {/* Botão para Download do PDF */}
      <button className={styles.downloadButton} onClick={generatePDF}>Baixar Relatório</button>
    </div>
  );
};

export default ReportGenerator;
