import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
 
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
 
const ChartsPage = () => {
  const [timeRange, setTimeRange] = useState('7d');
 
  // Estado para os dados do gráfico
  const [chartData, setChartData] = useState({
    labels: [],
    temperature: [],
    humidity: [],
    soilMoisture: [],
  });
 
  // Função para buscar dados de temperatura
  const fetchTemperatureData = async () => {
    try {
      const response = await axios.get(`http://localhost:5271/api/Temperatura`);
      const data = response.data;
      return data.map(entry => ({
        date: entry.ultimaMedicao,
        value: entry.temperaturaAtual,
      }));
    } catch (error) {
      console.error("Erro ao buscar dados de temperatura:", error);
      return [];
    }
  };
 
  // Função para buscar dados de umidade do ar
  const fetchHumidityData = async () => {
    try {
      const response = await axios.get(`http://localhost:5271/api/Umidade`);
      const data = response.data;
      return data.map(entry => ({
        date: entry.ultimaMedicao,
        value: entry.umidadeAtual,
      }));
    } catch (error) {
      console.error("Erro ao buscar dados de umidade do ar:", error);
      return [];
    }
  };
 
  // Função para buscar dados de umidade do solo
  const fetchSoilMoistureData = async () => {
    try {
      const response = await axios.get(`http://localhost:5271/api/UmidadeTerra`);
      const data = response.data;
      return data.map(entry => ({
        date: entry.ultimaMedicao,
        value: entry.umidadeTerraAtual,
      }));
    } catch (error) {
      console.error("Erro ao buscar dados de umidade do solo:", error);
      return [];
    }
  };
 
  // Função para buscar todos os dados e configurar o estado do gráfico
  const fetchChartData = async () => {
    try {
      const [temperatureData, humidityData, soilMoistureData] = await Promise.all([
        fetchTemperatureData(),
        fetchHumidityData(),
        fetchSoilMoistureData(),
      ]);
 
      // Assumindo que as datas estão sincronizadas entre os dados
      const labels = temperatureData.map(entry => entry.date);
 
      setChartData({
        labels,
        temperature: temperatureData.map(entry => entry.value),
        humidity: humidityData.map(entry => entry.value),
        soilMoisture: soilMoistureData.map(entry => entry.value),
      });
    } catch (error) {
      console.error("Erro ao configurar os dados do gráfico:", error);
    }
  };
 
  // Atualiza o gráfico ao montar o componente e quando timeRange é alterado
  useEffect(() => {
    fetchChartData();
  }, [timeRange]);
 
  // Configuração dos dados do gráfico
  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Temperatura (°C)',
        data: chartData.temperature,
        borderColor: '#FF5733',
        backgroundColor: 'rgba(255, 87, 51, 0.2)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Umidade do Ar (%)',
        data: chartData.humidity,
        borderColor: '#337AFF',
        backgroundColor: 'rgba(51, 122, 255, 0.2)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Umidade do Solo (%)',
        data: chartData.soilMoisture,
        borderColor: '#33FF57',
        backgroundColor: 'rgba(51, 255, 87, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };
 
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      tooltip: { mode: 'index', intersect: false },
    },
    scales: {
      x: { title: { display: true, text: 'Data' } },
      y: { title: { display: true, text: 'Valores' }, min: 0 },
    },
  };
 
  return (
<div style={{ padding: '1rem', textAlign: 'center', borderRadius: '8px' }}>
<h2 style={{ marginBottom: '1rem' }}>Gráficos de Dados</h2>
 
      {/* Filtro de Intervalo de Tempo */}
<div style={{ marginBottom: '0.5rem' }}>
<label>Intervalo de Tempo: </label>
<select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '5px', marginLeft: '0.5rem' }}
>
<option value="1h">Última Hora</option>
<option value="24h">Últimas 24 Horas</option>
<option value="7d">Últimos 7 Dias</option>
<option value="30d">Últimos 30 Dias</option>
</select>
</div>
 
      {/* Contêiner do Gráfico */}
<div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '800px',
        backgroundColor: '#fff', 
        height: '300px',
        margin: '0 auto',
        padding: '1rem',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}>
<Line data={data} options={options} />
</div>
</div>
  );
};
 
export default ChartsPage;