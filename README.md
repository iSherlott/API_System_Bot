# API_System_Bot

## my router database API

API desenvolvida com intuito de aprimorar o <a href="https://github.com/iSherlott/SystemBot">SystemBot</a> o bot será reformulado e dividido em diversos outros modulos interligado a essa API.

## dependencies

`discord.js: ^12.5.1` <br />
`body-parser: ^1.19.0` <br />
`express: ^4.17.1` <br />
`sqlite3: ^5.0.2` <br />

## Method of use

### Find

pesquisar registro: localhost:5000/<i>table</i>/search <br />

<p>Envie o parâmetro a ser pesquisado na URL por method POST, caso todos sejam localizado ira retorna um Array of Json, caso contrário em situação de erro retorna Find Failed</p>

### FindOne

Pesquisar um registro: localhost:5000/<i>table</i>/:id <br />

<p>Envie o parâmetro a ser pesquisado na URL por method GET, caso seja localizado o registro, retorna um Array of Json, em caso de encontra mais de um parâmetro com a mesma ID retorna Divergent params caso contrário em situação de falha retorna Find Failed.</p>

### FindAll

Obter todos os registros: localhost:5000/<i>table</i> <br />

<p>Não é necessário enviar nenhum parâmetro ou requisição HTTP, só uma requisição por method GET, caso consiga obter todos os registros, tem um retorno do array contendo todos os registros, em situação de falha retorna Find Failed.</p>

### Update

Atualizar o registro: localhost:5000/<i>table</i>/:id <br />

<p>Envie o parâmetro a serem atualizado por method body-json method POST e quem será atualizado por URL, não será possível atualizar a Primary Key, caso efetue uma tentativa, será retornado erro Parameter entered cannot be changed.</p>
<p>Caso seja efetuado com sucesso o procedimento, terá um retorno Update successfully e em terro terá um retorno Update Failed</p>

### Insert

Inserir um registro: localhost:5000/<i>table</i> <br />

<p>Envie o parâmetro por meio body-json em method POST para registrar um novo usuário, caso seja efetuado com sucesso o procedimento, terá um retorno Registration Successfully, em erro terá um retorno Registration Failed.</p>

### Delete

Deletar registro: localhost:5000/<i>table</i>/:id <br />

<p>Envie o parâmetro por meio URL em method DELETE para deletar um usuário existente no banco, caso seja efetuado com sucesso o procedimento, terá um retorno Delete Successfully, em erro terá um retorno Delete Failed.</p>

## Status List

```
Status: 200 – “Array of Json”
Status: 400 – Find Failed
Status: 404 – Find Failed
```

```
Status: 200 – “Array of Json”
Status: 201 – Divirgent params
Status: 400 – “Error”
Status: 404 – Find failed
```

```
Status: 200 – “Json”
Status: 404 – Find failed
```

```
Status: 200 – Update successfully
Status: 400 – Invalid Params
Status: 403 - Parameter entered cannot be changed
Status: 404 – Update Failed
```

```
Status: 200 - Registration Successfully
Status: 404 - Registration Failed
```

```
Status: 200 - Delete Successfully
Status: 404 - Delete Failed
```
