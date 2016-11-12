Pra configurar development

Pré-requisitos:
[Node 7 (sugiro com nvm)](https://github.com/creationix/nvm)
Postgresql

Instalar node.
```
nvm install node
```
Caso já tenho nvm, garantir que está usando o último.
```
nvm use 7
```
Instalar pacotes globais.
```
npm i -g pg sequelize-cli
```
Clonar o projeto e instalar dependências.
```
git clone git@github.com:cmilfont/biohacking.git
cd biohacking
npm i
cd client
npm i
```
Configurar dados do banco postgres no arquivo server/config/config.json

Criar o banco e rodar a app.
```
npm run db:create
sequelize db:migrate
sequelize db:seed:all
npm run dev
```
