# ⚛️ Frontend - Sistema de Gerenciamento Geográfico

Interface web moderna desenvolvida em React com TypeScript para consumo da API de gerenciamento geográfico, permitindo o gerenciamento completo de continentes, países e cidades.

------------------------------------------------------------------------

## 🏗️ Estrutura do Projeto

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/          
│   │   ├── CityForm.tsx    
│   │   ├── ContinentForm.tsx
│   │   ├── CountryForm.tsx
│   │   ├── FlagDisplay.tsx 
│   │   ├── Navbar.tsx      
│   │   ├── ThemeToggle.tsx 
│   │   └── WeatherDisplay.tsx 
│   ├── contexts/           
│   │   └── ThemeContext.tsx 
│   ├── pages/              
│   │   ├── Cities.tsx      
│   │   ├── Continents.tsx  
│   │   └── Countries.tsx   
│   ├── services/           
│   │   ├── api.ts          
│   │   ├── cities.ts       
│   │   ├── continents.ts   
│   │   ├── countries.ts    
│   │   └── weather.ts      
│   ├── types/              
│   │   └── index.ts        
│   ├── styles/             
│   │   └── global.css      
│   ├── App.tsx             
│   └── index.tsx           
├── package.json
└── tsconfig.json
```

------------------------------------------------------------------------

## 🎨 Tecnologias Utilizadas

- **React 18** - Biblioteca para construção de interfaces de usuário
- **TypeScript** - JavaScript com tipagem estática para maior confiabilidade
- **React Router DOM** - Sistema de roteamento para aplicação single-page
- **Context API** - Gerenciamento de estado global para temas e dados
- **Axios** - Cliente HTTP para consumo da API backend
- **CSS Variables** - Sistema de temas dinâmico e customizável

------------------------------------------------------------------------

## ✨ Funcionalidades Principais

### 🗺️ Gerenciamento de Dados Geográficos
- **Continentes**: CRUD completo com validações
- **Países**: Cadastro vinculado a continentes com dados populacionais e culturais
- **Cidades**: Localização geográfica com coordenadas e dados meteorológicos

------------------------------------------------------------------------

## Funcionalidades Especiais
### 🌍 Busca Automática de Informações de Países

- No formulário de criação/edição de países, digite o nome do país

- Clique em "Buscar Info da API" para preenchimento automático

- Os campos de idioma, moeda e população serão preenchidos com dados da REST Countries API

- Funciona com nomes em português (ex: "Japão", "Estados Unidos")

### 🌤️ Dados Meteorológicos em Tempo Real
- Na lista de cidades, clique no botão "Clima" de qualquer cidade

- Visualize informações meteorológicas em tempo real:

- Temperatura atual

- Condições climáticas

- Umidade relativa do ar

- Velocidade do vento

### 🔍 Sistema de Filtros
- Continentes: Filtre por nome

- Países: Filtre por nome e continente

- Cidades: Filtre por nome, país e continente

------------------------------------------------------------------------

### 🎨 Interface e Experiência do Usuário
- **Design Responsivo**: Adaptável a desktop, tablet e mobile
- **Sistema de Temas**: Alternância entre modo claro e escuro
- **Navegação Intuitiva**: Sidebar lateral para fácil acesso às seções
- **Filtros Avançados**: Busca e filtragem em todas as listagens

------------------------------------------------------------------------

### 🔗 Integração com APIs
- **Busca Automática**: Preenchimento automático de dados de países via REST Countries API
- **Dados Meteorológicos**: Condições climáticas em tempo real via OpenWeatherMap API
- **Validações**: Verificação de integridade referencial em tempo real

------------------------------------------------------------------------

## 🛠️ Configuração e Instalação

### Pré-requisitos
- Node.js 16 ou superior
- NPM ou Yarn
- Backend da aplicação rodando na porta 3000

------------------------------------------------------------------------

### Passo a Passo para Execução

1.  Clone o repositório:
        
        git clone https://github.com/eduardo-Rib/crud-ts-pweb.git

2.  Navegue até a pasta do frontend:
        
        cd Frontend

3.  Instale as dependências:

        npm install

4.  Execute em modo desenvolvimento:

        npm start  


---

## 🎓 Créditos

Desenvolvido como parte da disciplina **Programação Web**, sob
orientação do **Professor André Olimpio**.