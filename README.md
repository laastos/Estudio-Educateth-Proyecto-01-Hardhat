# EducatETH - Clase hardhat

## Quick start 🏄

Prerequisites: [Node (v20 LTS)](https://nodejs.org/en/download/) and [Git](https://git-scm.com/downloads)

> Clone the repository:

```
git clone https://github.com/salviega/educateth-clase-hardhat.git
```

> Install dependencies:

```
yarn
```

> Run the project:

```
yarn test
```

## Authors 🏗

[salviega](https://github.com/salviega)

# 1. Configuración del entorno

## 1.1. Validar Node.js, NPM y Yarn
node -v
npm -v
yarn -v

## 1.2. Crea carpeta
mkdir Proyecto_01

## 1.3. Inicializar proyecto
npm init -y
yarn add hardhat
npx hardhat init

## 1.4. Librerías
yarn add -D dotenv
yarn add -D hardhat-deploy

# 2. Escribir contrato

## 2.1. Instalar OpenZeppelin
yarn add @openzeppelin/contracts

## 2.2. Crear contrato
touch contracts/LAAB.sol

# 3. Deployment
touch scripts/deploy.js
