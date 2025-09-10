# :books: Livro CRUD 

O sistema Livro CRUD é uma aplicação para gerenciar um catálogo de livros, permitindo inserir, consultar, editar e excluir livro. 

Na interface há um campo de busca com ícone de lupa para informar o ID: ao buscar por um ID o sistema lista e exibe os dados completos daquele livro. Ao inserir um novo livro, os dados (ID, título, data de lançamento, ISBN, editora, categoria, número de páginas, imagem de capa etc.) são armazenados e imediatamente aparecem na lista de livros, que contém todas as informações de cada livro inserido. Edição e exclusão permitem manter o catálogo atualizado e consistente, enquanto validações básicas (ID, ISBN único, campos obrigatórios) garantem a integridade dos dados. 

# :mag: Escopo do CRUD 

O sistema possibilita realizar as cinco operações fundamentais: 

**Criar:** inserir novos livros no catálogo, informando dados como título, autor, ano de lançamento, ISBN, categoria, editora, número de páginas e imagem da capa. 

**Listar:** consultar todos os livros cadastrados em uma lista completa, exibindo informações gerais de cada livro.

**Listar por ID:** buscar diretamente um livro específico pelo seu ID, exibindo todos os dados cadastrados.

**Atualizar:** editar as informações de um livro já existente, garantindo que o catálogo permaneça atualizado. 

**Excluir:** remover livros cadastrados, mantendo apenas os registros relevantes no catálogo. 

# :thought_balloon: Descrição de como utilizar cada funcionalidade

**1. Criar Livro**

Para cadastrar um novo livro, preencha os campos do formulário exibido na interface.

Campos como editora, título, autor, ano de lançamento e ISBN são obrigatórios.

Campos como categoria, número de páginas e imagem de capa são opcionais e podem ser deixados em branco.

Após preencher os dados, clique em Salvar.

O livro será adicionado automaticamente à lista de livros exibida na tela.

**2. Ler Livro**

É possível visualizar todos os livros cadastrados na lista exibida na interface.

Para buscar um livro específico, utilize o campo de busca com ícone de lupa.

Digite o ID do livro desejado.

O sistema exibirá as informações completas do livro correspondente.

**3. Atualizar Livro**

Clique no botão Editar ao lado do livro desejado.

Os dados do livro serão carregados automaticamente no formulário.

Altere as informações que desejar e clique em Salvar novamente.

O sistema atualizará os dados e o livro modificado aparecerá na lista.

**4. Excluir Livro**

Clique no botão Excluir ao lado do livro que deseja remover.

O sistema solicitará a exclusão e o livro será apagado definitivamente do catálogo.

Após a exclusão, o livro desaparece da lista exibida.

# :white_circle: Imagens do projeto

<img width="689" height="920" alt="Captura de tela 2025-09-07 003853" src="https://github.com/user-attachments/assets/8b0ff7e4-3d47-4dfe-a4b4-4662486a028c" />
<img width="1066" height="721" alt="Captura de tela 2025-09-07 134022" src="https://github.com/user-attachments/assets/71938e52-7852-468b-be6b-43867c6c4e1f" />


# :bulb: Decisões Tomadas

- **Interface Intuitiva**

Com campos claros, busca por ID com lupa e botões de ação (salvar, editar, excluir) para tornar a experiência mais prática.

- **Catálogo de livros ao invés de controle de estoque**

O foco do sistema é organizar informações bibliográficas, e não gerenciar quantidade em estoque.

- **Banco de Dados**

Escolha do SQLite (better-sqlite3) para armazenar os dados dos livros por ser um banco de dados leve leve, rápido e que não exige servidor dedicado, ideal para aplicações de pequeno e médio porte.

- **Frontend em React.js**

O React foi escolhido por sua modularidade, facilidade em gerenciar componentes reutilizáveis e por permitir atualização dinâmica da interface sem recarregar a página.

- **Validações de cadastro**

ISBN deve ser único, evitando duplicidade de registros.

O campo ID é gerado automaticamente e utilizado como chave primária para busca, edição e exclusão.

Campos obrigatórios definidos para garantir integridade mínima dos dados (título, autor, ano de lançamento e ISBN).

# :snowflake: Premissas

- **O usuário deve possuir instalado**

Visual Studio Code ° Git ° Node.js ° NPM 

- **Conhecimento básico de informática/CLI**

O usuário possui conhecimento básico de informática, suficiente para instalar dependências e iniciar backend e frontend.

- **Banco de dados embutido**

O sistema utiliza um banco SQLite local, não sendo necessária configuração de um servidor de banco de dados externo.

- **Uso Local**
  
A aplicação foi projetada inicialmente para rodar em ambiente local (localhost), não havendo configuração de hospedagem em nuvem neste estágio.

- **Objetivo da Aplicação**

A aplicação é voltada para consulta e organização de catálogo, e não para controle de estoque ou vendas.

- **Confiabilidade dos Dados**
  
Assume-se que o usuário fornecerá informações corretas e completas nos campos obrigatórios.

- **Conexão entre Frontend e Backend**

Para o funcionamento pleno da aplicação, é necessário manter o backend em execução (porta configurada) e o frontend devidamente conectado a ele.

# :computer: Instalações 

### :large_blue_circle: Visual Studio Code

<img width="1298" height="345" alt="Captura de tela 2025-09-05 214534" src="https://github.com/user-attachments/assets/a7b67270-bd79-4913-a303-4104d61608bc" />

### :green_circle: Node.js 

<img width="1291" height="282" alt="Captura de tela 2025-09-05 214721" src="https://github.com/user-attachments/assets/3cd8586e-2d60-4fd3-970a-3e0be34901c4" />

### :orange_circle: Git 

<img width="1304" height="334" alt="Captura de tela 2025-09-05 215854" src="https://github.com/user-attachments/assets/3e0f29d7-c9b2-4272-969a-2c82ebd8fdb7" />

# :white_check_mark: Dependências  

Instala duas dependências no seu projeto: express e cors

`npm install express cors` 

Instala o nodemon como dependência de desenvolvimento
  
`npm install -D nodemon`

Instala o better-sqlite3, uma biblioteca para trabalhar com bancos de dados SQLite no Node.js.

`npm install better-sqlite3` 

# :page_facing_up: Instruções de como iniciar a aplicação 

 
### :small_blue_diamond: Lá no VSCode 

Clone um repositório em um novo diretório 

`git clone https://github.com/11DYOGO/Livro-CRUD.git` 

Altera o diretório atual 

`cd Livro-CRUD` 

Você pode iniciar o VS Code na linha de comando 

`code .` 

**Crie dois terminais separados: um para rodar o backend e outro para rodar o frontend.** 

**Insira os comandos listados.** 

 :white_small_square: **1º   terminal backend** 

Altera o diretório atual 
 
`cd backend`

Instale as dependências na pasta local 

`npm install` 

O "npm run dev" executa o "script" de nome "dev" 

`npm run dev` 

 :black_small_square: **2º   terminal frontend** 

Altera o diretório atual 

`cd frontend` 

Instale as dependências na pasta local 

`npm install` 

Isso executa um comando predefinido especificado na propriedade do objeto de um pacote."start""scripts" 
 
`npm start`  

# :cloud: Linguagem e Tecnologias  

- Git/GitHub → Versionamento e hospedagem de código 

- CLI (Prompt/Terminal) → Execução dos comandos 

- VS Code → Editor de código 

- Node.js + NPM → Ambiente de execução e gerenciador de pacotes 

- React.js (Frontend) → Biblioteca para interface do usuário 

- HTML → Estrutura da aplicação (base no index.html e JSX no React) 

- CSS → Estilização da interface (arquivos .css no projeto) 

- Express.js (Backend) → Framework para APIs REST 

- CORS → Middleware para controle de acesso 

- Nodemon → Reinicia automaticamente servidor Node.js

- SQLite (better-sqlite3) → Banco de dados relacional leve 

# :white_flag: Recurso escolhido e suas propriedades 

### Livro 
 

**Id** (Integer) Obrigatório   

**Título** (Text) Obrigatório   

**Autor** (Text) Obrigatório   

**Editora** (Text) Obrigatório  

**Categoria** (Text) Opcional (pode ser informado em branco)  

**ISBN** (Text) Obrigatório  

**Número de páginas** (Integer) Opcional (pode ser informado em branco)  

**Lançamento** (Date) Obrigatório  

**Imagem** (Capa) (Text) Opcional (pode ser informado em branco) 

# :martial_arts_uniform: Desenvolvedor

Dyogo Huann De Azevedo Rocha
 


