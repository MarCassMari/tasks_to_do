# Task Manager - Tarefas "To Do"

Este é um projeto simples de gerenciamento de tarefas desenvolvido com Node.js e Express. Ele fornece uma API básica para listar tarefas.

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

-   [Node.js](https://nodejs.org/) (versão 14 ou superior)
-   [NPM](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
-   Uma conta no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) para configurar um cluster do MongoDB

## Instalação

1. Clone este repositório:

    ```bash
    git clone https://github.com/seu-usuario/task_manager.git
    cd task_manager
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```

3. Crie e configure o arquivo .env na raiz do projeto e adicione a string de conexão do MongoDB no arquivo dentro da pasta de database. Por exemplo:

    ```bash
     MONGO_URI=mongodb+srv://<usuario>:<senha>@cluster0.mongodb.net/task_manager?retryWrites=true&w=majority
    ```

    Substitua <usuario> e <senha> pelas credenciais do seu cluster no MongoDB Atlas.

## Configurando um Cluster no MongoDB Atlas

    1.Acesse o MongoDB Atlas e faça login ou crie uma conta.

    2.Clique em "Create a Cluster" e escolha a opção gratuita (Shared Cluster).

    3.Siga as etapas para configurar o cluster, incluindo a escolha de uma região(SP).

    4.Após a criação do cluster, clique em "Connect" e escolha "Connect your application".

    5.Copie a string de conexão fornecida e substitua <usuario> e <senha> pelas credenciais do seu cluster.

    6.Adicione essa string ao arquivo .env como mostrado acima, por uma questão de segurança.

# Uso

Para iniciar o servidor em modo de desenvolvimento, execute:

```bash
npm run start:dev
```

O servidor estará disponível em http://localhost:3000.

# Tecnologias usadas:

-   [Express](https://expressjs.com/) - Framework para Node.js
-   [Mongoose](https://mongoosejs.com/) - ODM para MongoDB
-   [Nodemon](https://nodemon.io/) - Ferramenta para reiniciar automaticamente o servidor durante o desenvolvimento
-   [Postman](https://www.postman.com/) - Ferramenta para testar APIs e endpoints

## Como contribuir

Contribuições são bem-vindas! Se quiser ajudar a melhorar este projeto:

1. Faça um **fork** do repositório.
2. Crie uma branch para sua feature ou correção:
    ```bash
    git checkout -b minha-feature
    ```
3. Faça suas alterações e commit seguindo boas práticas:
    ```bash
    git commit -m feat: "descrição da sua mudança"
    ```
4. Envie seu fork:
    ```bash
    git push origin minha-feature
    ```
5. Abra um Pull Request explicando suas mudanças: Se tiver dúvidas, abra um **issue** antes para conversarmos.
