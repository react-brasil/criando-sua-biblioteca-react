[![Criando sua biblioteca React](logo.png)](https://andrelmlins.gitbook.io/criando-sua-biblioteca-react/)

No dia a dia utilizamos várias bibliotecas para React ou Javascript com o objetivo de facilitar nosso trabalho. Bibliotecas de componentes, datas, rotas, gerenciamento de estados, entre outras, são comuns na criação de aplicações. Mas você já parou para pensar em tudo que necessita para criar bibliotecas?

Se você chegou até aqui é porque tem interesse em aprender como desenvolver essas bibliotecas. Existem algumas ferramentas, CLIs e scripts, que facilitam e automatizam esse processo, você pode encontrar mais sobre essas ferramentas [aqui](BIBLIOTECAS.md). Mas aqui vamos entender de forma manual como configurar e desenvolver uma biblioteca.

A biblioteca que iremos criar será um componente que estiliza uma mensagem de erro em requisições dentro de uma aplicação. Ele terá como propriedade um código de erro e uma descrição. Ao seguir esse tutorial já pode mudar as referências de nome para sua biblioteca.

## Primeiro vamos criar as pastas e inicializar um projeto através do yarn

Nosso primeiro passo é iniciar um projeto através do yarn e criar algumas pastas, você pode mudar o nome da pasta para o de sua biblioteca.

```bash
mkdir react-error-screen
cd react-error-screen
mkdir src
mkdir public
yarn init
```

## Agora vamos instalar o react e sua base de bibliotecas

O objetivo aqui é desenvolver biblioteca para React, então vamos instalar sua base de bibliotecas.

```bash
yarn add -D react react-dom prop-types
```

## Já podemos iniciar nosso componente que se tornará uma biblioteca

Nessa fase iremos de fato criar a nossa biblioteca react.

### Crie o arquivo `src/ErrorComponent.js` e coloque o seguinte código

```jsx
import React from "react";
import PropTypes from "prop-types";

const ErrorComponent = ({ error, description }) => (
  <div style={styles.root}>
    <h2 style={styles.error}>{error}</h2>
    <h4 style={styles.description}>{description}</h4>
  </div>
);

const styles = {
  root: {
    display: "flex",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: "0% 30%",
    boxSizing: "border-box",
    backgroundColor: "#EAEAEA",
    textAlign: "center",
    fontFamily: "arial"
  },
  error: { fontSize: 100, fontWeight: 700, margin: 0 },
  description: { fontSize: 40, fontWeight: 100, margin: 0 }
};

ErrorComponent.propTypes = {
  error: PropTypes.number,
  description: PropTypes.string
};

export default ErrorComponent;
```

### Crie o arquivo `src/index.js` e coloque o seguinte código

```jsx
export { default } from "./ErrorComponent";
```

## Vamos agora criar uma área para visualizar o componente

É muito importante podermos testar a nossa biblioteca e visualizar o resultado do nosso componente, vamos a seguir trabalhar nessa etapa.

### Crie o arquivo `public/index.html`

Para iniciarmos a aplicação através do webpack precisamos de um arquivo base de html, para isso iremos criar o arquivo
`index.html` e colocar o seguinte conteúdo:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Minha Biblioteca</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

### Crie o arquivo `public/index.js`

Precisamos também criar nosso arquivo jsx de entrada, normalmente nas aplicações esse arquivo é a base da mesma, aqui só usaremos para testar como aplicação.

```jsx
import React from "react";
import ReactDOM from "react-dom";
import ErrorScreen from "../src";

const App = () => (
  <ErrorScreen error={503} description="Ocorreu um problema no servidor" />
);

ReactDOM.render(<App />, document.getElementById("root"));
```

## Está na hora de criarmos as configurações

Se tudo deu certo até aqui, agora vamos colocar as configurações iniciais. Iremos configurar o Babel para transpilar nossa biblioteca para js e o Webpack para podermos iniciar uma aplicação e verificar como ficou nossa biblioteca.

### Configurando o Babel

O [Babel](https://babeljs.io/) é um famoso transpilador javascript, que nos possibilitará converter nossa aplicação react em javascript puro através de alguns presets. Vamos primeiro instalar as dependências necessárias.

```bash
yarn add -D @babel/core @babel/cli @babel/preset-env @babel/preset-react cross-env
```

Após isso vamos criar o arquivo `.babelrc` e colocar a seguinte configuração:

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

### Configurando o Webpack

O [Webpack](https://webpack.js.org/) é um empacotador de módulo JavaScript de código aberto, vamos utilizar o mesmo junto com alguns plugins para iniciar uma aplicação e assim podermos testar nossa biblioteca. Vamos primeiro instalar as dependências necessárias.

```bash
yarn add -D webpack webpack-cli webpack-dev-server html-webpack-plugin babel-loader
```

Agora vamos criar o arquivo `webpack.config.js`, que é o arquivo de configuração do webpack. E colocar o seguinte conteúdo:

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const APP_PATH = "./public";

const config = {
  mode: "development",
  entry: path.resolve(__dirname, APP_PATH),
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    library: "default",
    libraryTarget: "umd"
  },

  resolve: { extensions: [".js", ".json"] },

  module: {
    rules: [
      { test: /\.(js)x?$/, loader: "babel-loader", exclude: /node_modules/ }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(APP_PATH, "index.html")
    })
  ]
};

module.exports = () => config;
```

## Já estamos chegando ao fim, vamos agora criar nossos scripts e ajustar o package.json

Para criar os scripts, vá no arquivo `package.json` e insira o seguinte código:

```json
{
  "scripts": {
    "start": "webpack-dev-server --progress --inline --hot --port 8080",
    "build": "cross-env NODE_ENV=production babel src --out-dir dist"
  }
}
```

Perceba que no build todo o conteúdo será transpilado para uma pasta chamada dist, para que outra lib ao utilizar seu módulo consiga utilizar na raiz modifique as propriedades `main` e `module`.

```json
{
  "main": "dist/index.js",
  "module": "dist/index.js"
}
```

Além disso nosso projeto tem várias configurações que não serão necessárias no pacote final da nossa biblioteca. Para diminuir o tamanho do pacote e só colocar o essencial, utilize a propriedade `files` para isso, fazendo da seguinte maneira.

```json
{
  "files": ["dist", "README.md"]
}
```

## Agora sim, vamos ver o componente da nossa biblioteca

Rode o comando abaixo na raiz do projeto.

```bash
yarn start
```

Acesse `http://localhost:8080/` e verá seu componente.

[comment]: <> (Colocar exemplo de uma aplicação)

## Vamos agora testar a transpilação

Rode o comando abaixo na raiz do projeto.

```bash
yarn build
```

No diretório `dist` que está na raiz do seu projeto, você verá seu componente transpilado.

## Hora de publicar

Você já deve ta muito feliz por ver seu componente funcionando e querendo usar em seu projeto. Então vamos agora publicar esse componente, e essa é a etapa mais simples. Rode o seguinte comando:

```bash
npm login
npm publish
```

É possível que o componente já exista com esse nome, caso isso aconteça mude o nome do seu componente no arquivo `package.json`. Lembre que é possível colocar um escopo, utilizando a seguinte nomenclatura:

```
@[ESCOPO]/[NOME_PROJETO]
```

## Estrutura de Arquivos

Caso tenha dúvida sobre a estrutura de arquivos geradas após o tutorial, acesse esse [link](ESTRUTURA.md).
