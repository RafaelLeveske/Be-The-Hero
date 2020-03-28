const express = require ('express'); // a partir do momento em que chamamos a variavel 'express' ela importa todas as dependências da biblioteca express para o projeto.

const cors = require('cors');

const routes = require('./routes');//Como a pasta de rotas se encontra dentro de uma pasta se usa './' para a localização da mesma, caso fosse fora se deveria usar '../' para a localização da mesma.

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);//O código para chamar o arquivo de rotas deve vir sempre abaixo do app.use(express.json());


/*
MÉTODOS HTTP:

O método GET é usado para buscar alguma informação no back-end
O método POST no caso serve para a criação de uma informação no back-end, por exemplo a pagina recebe os dados de um usuario e nisso cria um usuário.
O método PUT serve para alterar uma informação no back-end.
O método DELETE serve para deletar alguma informação no back-end.*/

/**
 * TIPOS DE PARÂMETROS:
 * 
 * Query Params: parâmetros nomeados enviados na rota após o "?" servem geralmente para (filtros, paginação)
 * Exemplo: "http://localhost:8008/users?name=Rafael" nesse caso irá buscar todos os usuarios com nome "Rafael"
 * Exemplo: "http://localhost:8008/users?page=2&name=Rafael&idade=28" nesse caso irá buscar todos os usuarios de todas as páginas da aplicação
 * "page2" com nome "Rafael" e idade "28", a concatenação ocorre pelo ícone "&";
 * 
 * Exemplo: 
 * app.get('/users', (request, response) => {
 * 
 * const params = request.query;

        console.log(params);

   No insomnia digite o seguinte endereço com método GET:
   
   http://localhost:3333/users?name=Rafael&idade=28

   e o retorno no terminal será esse:

   { name: 'Rafael', idade: '28' }
 * 
 * Route Params: Parâmetros utilizados para identificar recursos de um único usuário.
 * Exemplo: app.get('/users/:id') no localhost ficaria: "http://localhost:8008/users/1"
 * nesse caso o endereço retorna o usurario de id (1);
 * 
 * Exemplo:
 * 
 *   app.get('/users/:id', (request, response) => {

        const params = request.params;

        console.log(params);

    No insomnia digite o seguinte endereço com método GET:
    
    http://localhost:3333/users/1

    e o retorno no terminal será esse:

    { id: '1' }

    Request Body: É o corpo da requisição, utilizado para criar ou alterar recursos, pode ser usado para criação de usuários por exemplo.
    é usado como POST, o que vai retornar um JSON.

    Exemplo Prático:

    app.use(express.json()); (Declaramos o uso do json pela biblioteca express no topo do nosso código,
                             é importante que venha antes das rotas ou não irá funcionar.)

    
        app.post('/users', (request, response) => {

        const body = request.body;

        console.log(body);


    No insomnia digite o seguinte endereço com método POST, e em seguida selecione a opção JSON no corpo da aplicação insomnia:

    Endereço:

    http://localhost:3333/users

    Requisição JSON:

    {
	"nome": "Rafael Eraldo",
	"idade": 28
	
    }

    e o retorno no terminal será esse:

    { nome: 'Rafael Eraldo', idade: 28 }

    BANCO DE DADOS:

    SQL: SQLite, MySQL, PostgreSQL, Oracle,Microsoft: SQL Server
    NoSQL: MongoDB

    QUERY BUILDER: Escreve as query's usando JS,
    Exemplo: table('users').select('*'),where()
    O exemplo acima quer dizer: da tabela 'users' selecione todos '*';
    é vantajoso porque o mesmo código pode er usado para vários bancos SQL diferentes.
    O query builder usado nesse projeto será a biblioteca "knex".
    O primeiro passo será fazer a instalação através do comando: npm install knex
    O segundo passo será fazer a instalação da biblioteca do SQL de escolha, a biblioteca usada nesse projeto sera
    o SQLite3, sua instalação virá através do comando: npm install sqlite3
    com os dois pacotes instalados o proximo passo é iniciar o knex através do comando: npx knex init
    o que irá criar a pagina knexfile.js em seu diretório, sesse arquivo é onde se encontra as configurações de acesso ao banco de dados para cada um dos ambientes 
    da aplicação.
    no arquivo knexfile.js você precisa criar uma sessão chamada migrations:

    development: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/db.sqlite' //Nome do diretorio onde será hospedado a conexão com o banco de dados da aplicação
    },
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault:true, //esse comando é usado para evitar erro no sqlite3, pois o mesmo não suporta incerção de valores default
  },

    fazendo isso execute o seguinte comando no terminal: npx knex migrate:make create_ongs

    isso ira criar um arquivo no diretorio declarado na sessão migrations no knexfile.js, no caso relacionado a
    tabela de ONGs.

    com o arquivo feito agora é criar a tabela com suas propriedades.

    Exemplo:

    exports.up = function(knex) {
  return knex.schema.createTable('ongs', function (table){
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();
  });
};
/**
 * No caso todos os elementos acima serão responsaveis por criar a tabela e suas propriedades.
 * 
 *
exports.down = function(knex) {
    return knex.schema.dropTable('ongs');
  };
  
  exports.up será onde serão criadas todas as tabelas da aplicação.
  exports.down será onde você possa dropar a tabela em caso de erro subsequente (just in case)

  para executar a tabela criada excute o comando no terminal: npx knex migrate:latest

  isso automaticamente irá gerar um arquivo de banco de dados como o especificado previamente (dbs.qlite)


 */                         
    
    
    
       /* 
        ANOTAÇÕES:

         o que vier depois da ('/') seria o recurso de paginação da aplicação ex: app.get('/users') geralmente está relacionado a alguma tabela no BD.
        
         return response.send('Hello World');  no send ele envia o que estiver dentro do parênteses
        
         get('/'); serve para pegar uma rota ou simplesmente uma página da aplicação, por exemplo se você qisesse ir para páginas contatos da sua aplicação a descrição da rota get deveria ser app.get('/contato');
        
         request: Guarda todos os dados que vierem através da requisição do usuário.
         response: Retorna uma resposta ao usuário.

         se por acaso houver algum erro com relação ao banco de dados, exclua o doc db.sqlite, e execute o comando: npx knex migrate: latest
        
        
        */



app.listen(3333);

console.log('API rodando. Alterações salvas');
