# My Router Database API

API desenvolvida com intuito de aprimorar o <a href="https://github.com/iSherlott/SystemBot">SystemBot</a>, O bot será reformulado e dividido em diversos outros modulos interligado a essa API.

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

<p>Envie o parâmetro a serem atualizado por meio body-json em method POST e quem será atualizado por URL, não será possível atualizar a Primary Key, caso efetue uma tentativa, será retornado erro Parameter entered cannot be changed.</p>
<p>Caso seja efetuado com sucesso o procedimento, terá um retorno Update successfully e em terro terá um retorno Update Failed</p>

### Insert

Inserir um registro: localhost:5000/<i>table</i> <br />

<p>Envie o parâmetro por meio body-json em method POST para registrar um novo usuário, caso seja efetuado com sucesso o procedimento, terá um retorno Registration Successfully, em erro terá um retorno Registration Failed.</p>

### Delete

Deletar registro: localhost:5000/<i>table</i>/:id <br />

<p>Envie o parâmetro por meio URL em method DELETE para deletar um usuário existente no banco, caso seja efetuado com sucesso o procedimento, terá um retorno Delete Successfully, em erro terá um retorno Delete Failed.</p>

### Find Coin

Pesquisar rank de moedas: localhost:5000/wallet <br />

<p>Envie o parâmetro por meio URL em method GET para pesquiar todos os registros, limitando eles por meio de adicionando após "?" a especificação limit=<i>quantidade que deseja limitar</i> e/ou order=<i>desc/asc</i> para ordernar se deseja de forma crescente ou decrescente. caso não informe o parâmetro limit, será fornecido de forma default o valor 100.</p>
<p>Caso ocorra um erro no recebimento dos parâmetros, será retornado body invalid, em situação de sucesso, retornara um "Array of Json" e caso contrario recebera a informação Find failed!</p>

### Balance

Pesquisar valor em sua carteira: localhost:5000/wallet <br />

<p>Envie o parâmetro por meio URL em method GET o parâmetro id contendo o id de quem deseja visualizar o valor em carteira. caso seja vem sucedido, terá um retorno "Json", em caso de erro retorna Bad gateway, em situação de erro interno, recebera Balance failed</p>

### Pay

Debitar moedas: localhost:5000/wallet/balance <br />

<p>Envie o parâmetro por meio body-json em method POST, com as informações id e pay, sendo o pay obrigatoriamente em formato Number, caso a informação seja inválida retornara Body invalid, se multiplos usuarios forem localizado retornara User not found, caso a conta não tenha valor suficiente para ser debitado, retornara Insufficient funds. caso ocorra tudo devidamente, recebera Pay successfully em situação de erro interno, recebera Pay failed!</p>

### Receive

Receber moedas: localhost:5000/wallet/receive <br />

<p>Envie o parâmetro por meio body-json em method POST, com as informações id e receive, sendo o pay obrigatoriamente em formato Number, caso a informação seja inválida retornara Body invalid, se multiplos usuarios forem localizado retornara User not found, caso ocorra tudo devidamente, recebera receive successfully em situação de erro interno, recebera receive failed!</p>

### Transfer

Transferir moedas: localhost:5000/wallet/transfer <br />

<p>Envie o parâmetro por meio body-json em method POST, com as informações id_payer, id_receive e value, sendo todos os parâmetros obrigatorio para efetuar o procedimento, além do parâmetro value ser obrigatorio em formato Number. caso a informação seja inválida retornara Body invalid, se multiplos usuarios forem localizado retornara User not found, caso a conta não tenha valor suficiente para ser debitado, retornara Insufficient funds. caso ocorra tudo devidamente, recebera Receive successfully em situação de erro interno, recebera Receive failed!</p>

## Status List

### Find

```
Status: 200 – “Array of Json”
Status: 400 – Find Failed
Status: 404 – Find Failed
```

### FindOne

```
Status: 200 – “Array of Json”
Status: 201 – Divirgent params
Status: 400 – “Error”
Status: 404 – Find failed
```

### FindAll

```
Status: 200 – “Json”
Status: 404 – Find failed
```

### Update

```
Status: 200 – Update successfully
Status: 400 – Invalid Params
Status: 403 - Parameter entered cannot be changed
Status: 404 – Update Failed
```

### Insert

```
Status: 200 - Registration Successfully
Status: 404 - Registration Failed
```

### Delete

```
Status: 200 - Delete Successfully
Status: 404 - Delete Failed
```

### Find Rank coin

```
Status: 200 - "Array of Json"
Status: 400 - Body Invalid
Status: 500 - Find Failed
Status: 502 - Bad gateway
```

### Balance

```
Status: 200 - "Json"
Status: 406 - User not found
Status: 500 - Balance failed
Status: 502 - Bad gateway
```

### Pay

```
Status: 400 - Body Invalid
Status: 406 - User not found
Status: 406 - Insufficient funds
Status: 500 - Pay failed
Status: 502 - Bad gateway
```

### Receive

```
Status: 201 - Receive successfully
Status: 400 - Body invalid
Status: 406 - User not found
Status: 500 - Receive failed
Status: 502 - Bad gateway
```

### Transfer

```
Status: 201 - Procedure carried out successfully.
Status: 400 - Body invalid
Status: 400 - User not found
Status: 406 - Insufficient funds
Status: 500 - Transfer failed.
```
