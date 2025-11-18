import axios from 'axios';

const OPEN_WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY;

// Mapeamento de nomes de países em português para inglês
const countryNameMap: { [key: string]: string } = {
  'brasil': 'brazil',
  'estados unidos': 'united states',
  'estados unidos da america': 'united states',
  'eua': 'united states',
  'japão': 'japan',
  'japao': 'japan',
  'alemanha': 'germany',
  'frança': 'france',
  'franca': 'france',
  'itália': 'italy',
  'italia': 'italy',
  'espanha': 'spain',
  'portugal': 'portugal',
  'reino unido': 'united kingdom',
  'inglaterra': 'united kingdom',
  'canadá': 'canada',
  'canada': 'canada',
  'méxico': 'mexico',
  'mexico': 'mexico',
  'argentina': 'argentina',
  'chile': 'chile',
  'colômbia': 'colombia',
  'colombia': 'colombia',
  'peru': 'peru',
  'venezuela': 'venezuela',
  'equador': 'ecuador',
  'uruguai': 'uruguay',
  'paraguai': 'paraguay',
  'bolívia': 'bolivia',
  'bolivia': 'bolivia',
  'china': 'china',
  'índia': 'india',
  'india': 'india',
  'rússia': 'russia',
  'russia': 'russia',
  'austrália': 'australia',
  'australia': 'australia',
  'coreia do sul': 'south korea',
  'coreia sul': 'south korea',
  'coreia do norte': 'north korea',
  'coreia norte': 'north korea',
  'áfrica do sul': 'south africa',
  'africa do sul': 'south africa'
};

export const getCountryInfo = async (countryName: string) => {
  try {
    // Normaliza o nome do país (minúsculo, sem acentos)
    const normalizedName = countryName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    // Tenta encontrar o nome em inglês no mapeamento
    const englishName = countryNameMap[normalizedName] || countryName;
    
    console.log(`Buscando informações para: "${countryName}" -> "${englishName}"`);
    
    const response = await axios.get(`https://restcountries.com/v3.1/name/${englishName}`);
    
    if (!response.data || response.data.length === 0) {
      throw new Error(`País "${countryName}" não encontrado na API.`);
    }
    
    const country = response.data[0];
    
    return {
      nome: country.name.common,
      bandeira: country.flags.png,
      capital: country.capital?.[0] || 'N/A',
      area: country.area,
      populacao: country.population,
      moeda: country.currencies ? Object.values(country.currencies).map((c: any) => c.name).join(', ') : 'N/A',
      idioma: country.languages ? Object.values(country.languages).join(', ') : 'N/A',
    };
  } catch (error: any) {
    console.error('Erro detalhado ao buscar informações do país:', error.response?.data || error.message);
    
    if (error.response?.status === 404) {
      throw new Error(`País "${countryName}" não encontrado. Verifique o nome e tente novamente.`);
    }
    
    throw new Error(`Erro ao buscar informações para "${countryName}": ${error.message}`);
  }
};

export const getWeather = async (lat: string, lon: string, cityName?: string, countryName?: string) => {
  try {
    if (!OPEN_WEATHER_API_KEY) {
      throw new Error('Chave da API OpenWeatherMap não configurada.');
    }

    let weatherData;
    let methodUsed = 'coordenadas';

    // Primeira tentativa: buscar por coordenadas
    try {
      console.log(`Tentativa 1 - Buscando por coordenadas: ${lat}, ${lon}`);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric&lang=pt_br`
      );
      weatherData = response.data;
      console.log('Sucesso na busca por coordenadas');
    } catch (coordError) {
      console.log('Falha na busca por coordenadas, tentando por nome...');
      
      // Segunda tentativa: buscar por nome da cidade e país
      if (cityName && countryName) {
        try {
          methodUsed = 'nome_cidade_pais';
          // Converter nome do país para inglês se necessário
          const normalizedCountryName = countryName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          const englishCountryName = countryNameMap[normalizedCountryName] || countryName;
          
          console.log(`Tentativa 2 - Buscando por nome: ${cityName}, ${englishCountryName}`);
          
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)},${encodeURIComponent(englishCountryName)}&appid=${OPEN_WEATHER_API_KEY}&units=metric&lang=pt_br`
          );
          weatherData = response.data;
          console.log('Sucesso na busca por nome da cidade e país');
        } catch (nameError) {
          console.log('Falha na busca por nome da cidade e país, tentando apenas pelo nome da cidade...');
          
          // Terceira tentativa: buscar apenas pelo nome da cidade
          try {
            methodUsed = 'nome_cidade';
            console.log(`Tentativa 3 - Buscando apenas por nome da cidade: ${cityName}`);
            
            const response = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${OPEN_WEATHER_API_KEY}&units=metric&lang=pt_br`
            );
            weatherData = response.data;
            console.log('Sucesso na busca apenas por nome da cidade');
          } catch (cityOnlyError) {
            throw new Error(`Não foi possível encontrar dados meteorológicos para a localização fornecida. Métodos tentados: coordenadas, nome completo, nome da cidade.`);
          }
        }
      } else {
        throw new Error('Coordenadas inválidas e informações de cidade/país insuficientes para busca alternativa.');
      }
    }

    console.log(`Dados meteorológicos recebidos (método: ${methodUsed}):`, {
      cidade: weatherData.name,
      temperatura: weatherData.main.temp,
      condicao: weatherData.weather[0].description
    });
    
    return {
      temperatura: Math.round(weatherData.main.temp),
      condicao: weatherData.weather[0].description,
      umidade: weatherData.main.humidity,
      vento: weatherData.wind.speed,
      cidade: weatherData.name,
      pais: weatherData.sys.country,
      metodo: methodUsed
    };
  } catch (error: any) {
    console.error('Erro detalhado ao buscar dados meteorológicos:', error.response?.data || error.message);
    
    if (error.response?.status === 401) {
      throw new Error('Chave da API OpenWeatherMap inválida ou expirada.');
    }
    
    if (error.response?.status === 404) {
      throw new Error('Localização não encontrada para os dados fornecidos.');
    }
    
    throw new Error(`Erro ao buscar dados meteorológicos: ${error.message}`);
  }
};