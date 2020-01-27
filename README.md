mkdir react-library-test
cd react-library-test
yarn init
yarn add react react-dom prop-types
mkdir src
cd src
Criar arquivo src/index.js
Criar arquivo src/MyLibrary.js
yarn add -D @babel/core @babel/cli @babel/preset-env @babel/preset-react
yarn add -D webpack webpack-cli webpack-dev-server html-webpack-plugin babel-loader
Criar configuração de webpack
Criar configuração de babel
Criar public/index.html
Criar public/index.js
Criar script de start -> webpack-dev-server --progress --inline --hot --port 8080
yarn start
criar script de build -> cross-env NODE_ENV=production babel src --out-dir dist
yarn add -D cross-env
yarn build