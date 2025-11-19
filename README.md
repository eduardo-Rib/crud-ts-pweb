# 🌍 Sistema de Gerenciamento Geográfico

Sistema completo para gerenciamento de dados geográficos, permitindo o cadastro, consulta, edição e exclusão de continentes, países e cidades. Desenvolvido com arquitetura moderna separando frontend e backend.

---

## 🏗️ Arquitetura do Projeto
```
crud-ts-pweb/
├── backend/  
├── frontend/ 
├── database.sql
└── README.md 
```

- **backend**  `API RESTful em Node.js + TypeScript`
- **frontend** `Interface web em React + TypeScript`
- **database.sql** `Script de criação do banco de dados`

---

## 🚀 Tecnologias Utilizadas

### Backend
- **Node.js** - Ambiente de execução JavaScript
- **TypeScript** - Superset JavaScript com tipagem estática
- **Express.js** - Framework web minimalista
- **Prisma ORM** - ORM para acesso ao banco de dados
- **MySQL** - Sistema de gerenciamento de banco de dados relacional
- **Axios** - Cliente HTTP para consumo de APIs externas

### Frontend
- **React** - Biblioteca para construção de interfaces
- **TypeScript** - JavaScript com tipagem estática
- **React Router DOM** - Roteamento para aplicação single-page
- **Context API** - Gerenciamento de estado global
- **Axios** - Cliente HTTP para consumo da API
- **CSS Variables** - Sistema de temas dinâmico

---

## 🔌 APIs Externas Integradas
### REST Countries API
- **Função:** Enriquecer dados dos países

- **Dados fornecidos:** Bandeira, capital, área, população, moeda, idiomas

- **Como acessar:** No formulário de países, clique em "Buscar Info da API"

### OpenWeatherMap API
- **Função:** Fornecer dados meteorológicos

- **Dados fornecidos:** Temperatura, condições climáticas, umidade, vento

- **Como acessar:** Na lista de cidades, clique em "Clima"

---

## 📋 Requisitos do Sistema
- Node.js 16+

- MySQL 5.7+

- NPM

- Conexão com internet (para APIs externas)

---

## 📊 Funcionalidades Principais

### ✅ Gerenciamento Completo de Dados
- **Continentes**: Cadastro, listagem, edição e exclusão
- **Países**: Vinculação a continentes, dados populacionais e culturais
- **Cidades**: Localização geográfica com latitude e longitude

### 🔗 Integridade Referencial
- Não permite exclusão de continentes com países vinculados
- Não permite exclusão de países com cidades vinculadas
- Validações em tempo real

### 🌐 Integração com APIs Externas
- **REST Countries API**: Informações complementares de países (bandeira, capital, área, etc.)
- **OpenWeatherMap API**: Dados meteorológicos em tempo real das cidades

### 🎨 Interface Moderna
- Design responsivo para todos os dispositivos
- Sistema de temas (claro/escuro)
- Navegação intuitiva com sidebar
- Filtros avançados em todas as listagens

## 🗃️ Configuração do Banco de Dados

### Pré-requisitos
- MySQL Server instalado e rodando
- Acesso de administrador (root)

### Passo a Passo para Importar o Banco de Dados no MySQL

1. **Abra o terminal no VSCode:**

2. **Rode esses comandos no terminal do MySQL**

```bash
# Abrindo o terminal no VSCode
mysql -u root -p
# Digite sua senha do MySQL

# Importando o arquivo SQL (contendo banco, tabelas e relações)
source ~/Projetos/meu_projeto/database.sql;

# Verificando as tabelas criadas
SHOW TABLES;

# Saindo do MySQL
exit;
```
- Supondo que o arquivo `.sql` esteja localizado na raiz do seu projeto e que ele já contenha a criação do banco de dados, tabelas e suas relações, basta usar o comando `source` para importar o arquivo:

---

### Estrutura do Banco Criado
- continentes - Armazena os continentes

- paises - Armazena os países com vínculo aos continentes

- cidades - Armazena as cidades com vínculo aos países

---

## Roando projeto
Siga as instruções do README de cada repositório 

- Instruções do [Backend](./Backend/README.md)

- Instruções do [Frontend](./Frontend/README.md)

---

## 🎥 Vídeo

Vídeo mostrando **como rodar o projeto do zero** usando o README.md como referência:

![Vídeo]([https://github.com/user-attachments/assets/635fb137-a697-41ef-bcb0-1c61b6694d31](https://youtu.be/8Yuh7jHqCwo))


---

## 🎓 Créditos

Desenvolvido como parte da disciplina **Programação Web**, sob
orientação do **Professor André Olimpio**.
