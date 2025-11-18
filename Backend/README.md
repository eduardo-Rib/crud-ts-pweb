# Backend - Sistema de Gerenciamento Geográfico

Este backend  gerencia dados geográficos de continentes, países e cidades. Ele fornece uma API RESTful completa com
operações CRUD (Create, Read, Update, Delete) para cada entidade,
garantindo a integridade referencial entre os dados. Além disso,
integra-se com duas APIs externas:\
- **REST Countries API** (informações complementares de países)\
- **OpenWeatherMap API** (dados meteorológicos de cidades)

O projeto é construído em **TypeScript**, utilizando **Express** como
servidor web e **Prisma ORM** para acesso ao banco de dados MySQL. A arquitetura é totalmente modular, com rotas,
controladores e serviços separados.

------------------------------------------------------------------------

## 🏗️ Estrutura do Projeto

```
backend/
├── src/
│   ├── controllers/
│   │   ├── continenteController.ts
│   │   ├── paisController.ts
│   │   └── cidadeController.ts
│   ├── routes/
│   │   ├── continenteRoutes.ts
│   │   ├── paisRoutes.ts
│   │   └── cidadeRoutes.ts
│   ├── services/
│   │   └── apiService.ts
│   ├── app.ts
│   └── server.ts
├── prisma/
│   └── schema.prisma
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

------------------------------------------------------------------------

## 🚀 Funcionalidades

### 🌍 Continentes

-   CRUD completo\
-   Integração referencial (não permite excluir continentes com países
    vinculados)

### 🇧🇷 Países

-   CRUD completo\
-   Vínculo com continente\
-   Campos: nome, população, idioma oficial, moeda\
-   Informações adicionais via *REST Countries API*\
-   Não permite exclusão caso exista cidades vinculadas

### 🏙️ Cidades

-   CRUD completo\
-   Vínculo com país e continente\
-   Campos: nome, população, latitude, longitude\
-   Dados climáticos via *OpenWeatherMap API*

------------------------------------------------------------------------

## 📡 Endpoints da API

---

### 🌍 Continentes

| Método | Endpoint            | Descrição                    |
|--------|----------------------|------------------------------|
| GET    | /continentes         | Lista todos os continentes   |
| GET    | /continentes/:id     | Obtém um continente específico |
| POST   | /continentes         | Cria um novo continente      |
| PUT    | /continentes/:id     | Atualiza um continente       |
| DELETE | /continentes/:id     | Exclui um continente         |

---

### 🇧🇷 Países

| Método | Endpoint                     | Descrição                          |
|--------|-------------------------------|--------------------------------------|
| GET    | /paises                       | Lista todos os países                |
| GET    | /paises/:id                   | Obtém um país específico             |
| POST   | /paises                       | Cria um novo país                    |
| PUT    | /paises/:id                   | Atualiza um país                     |
| DELETE | /paises/:id                   | Exclui um país                       |
| GET    | /paises/continente/:id        | Lista países por continente          |
| GET    | /paises/:id/info              | Informações adicionais do país       |
| GET    | /paises/info/nome/:nome       | Informações do país por nome         |

---

### 🏙️ Cidades

| Método | Endpoint                      | Descrição                              |
|--------|--------------------------------|------------------------------------------|
| GET    | /cidades                       | Lista todas as cidades                   |
| GET    | /cidades/:id                   | Obtém uma cidade específica              |
| POST   | /cidades                       | Cria uma nova cidade                     |
| PUT    | /cidades/:id                   | Atualiza uma cidade                      |
| DELETE | /cidades/:id                   | Exclui uma cidade                        |
| GET    | /cidades/pais/:id              | Lista cidades por país                   |
| GET    | /cidades/continente/:id        | Lista cidades por continente             |
| GET    | /cidades/:id/clima             | Dados meteorológicos da cidade           |

---


------------------------------------------------------------------------

## 🛠️ Configuração e Instalação

### **Requisitos**

-   Node.js 16+
-   Banco de dados MySQL
-   Chave da API OpenWeatherMap

### **Passos**

1.  Clone o repositório:
        
        git clone https://github.com/eduardo-Rib/crud-ts-pweb.git

2.  Navegue até a pasta do backend:
        
        cd Backend

3.  Instale as dependências:

        npm install

4.  Configure o arquivo `.env`     (Usar o .env.example de base)

        cp .env.example .env
        

5.  Gere o cliente Prisma:

        npx prisma generate

6.  Crie as tabelas no banco:

        npx prisma db push

7.  Execute em modo desenvolvimento:

        npm run dev

------------------------------------------------------------------------

## 🧪 Testando a API

A ordem recomendada é:

1.  Criar Continentes\
2.  Criar Países\
3.  Criar Cidades

Ferramentas recomendadas: **Postman**, **Insomnia**, **cURL**.

------------------------------------------------------------------------


## 🎓 Créditos

Desenvolvido como parte da disciplina **Programação Web**, sob
orientação do **Professor André Olimpio**.
