Pra configurar development

Criar conta no heroku, adicionar addons SendGrid, Airbrake Bug Tracker, Logentries e SearchBox Elasticsearch.

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
npm i -g pg sequelize-cli create-react-app nodemon
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

Exportar variaveis de ambiente, sugiro criar um arquivo na raiz do projeto chamado config.env e colocar nele.

Exemplo (lembrar que pra windows é com set):

```
export SENDGRID_APIKEY=SG.D8Kte9yITmyYO99E5f5PcA.Bqi69X4yyuIah-xxxxxxxxxxxxxxxxxxxxxxxxx
export AIRBRAKE_API_KEY=4a68026f35d09256a77xxxxxxxxxxxx
export AIRBRAKE_PROJECT_ID=10000
export LOGENTRIES_TOKEN=b8xxxx7c-xxxx-46e3-b564-xxxxxxxxxxx
```

Essas infos voce pega nos serviços a partir do heroku, algumas delas não são cadastradas automaticamente, então sugiro introduzir manualmente em https://dashboard.heroku.com/apps/seuprojeto/settings clicanco em **Reveal Config Vars***.

Criar o banco e rodar a app.
```
npm run db:create
sequelize db:migrate
sequelize db:seed:all
npm run dev
```
