# Projeto de Cadastro de Contatos com Integração ViaCEP e Google Maps

Este é o projeto de uma aplicação web para cadastro de contatos, integrada com a API do ViaCEP e o Google Maps. A aplicação foi desenvolvida utilizando React.js e utiliza o Material Design V3.

## Funcionalidades Principais:

1. **Autenticação de Usuário**:

   - Permite que os usuários se cadastrem no sistema.
   - Realiza autenticação com email e senha.

2. **Gerenciamento de Contatos**:

   - Cadastra contatos com nome, CPF, telefone e endereço completo (CEP + Posição Geográfica).
   - Filtros por CPF ou nome para a lista de contatos.
   - Possibilidade de atualizar e excluir contatos.

3. **Integração com API ViaCEP**:

   - Consulta informações do endereço através da API do ViaCEP.
   - Validação dos dados retornados pela API.

4. **Integração com Google Maps**:

   - Obtém as coordenadas geográficas (latitude e longitude) do endereço informado.
   - Inclui um mapa que mostra os contatos localizados na plataforma.

5. **Gerenciamento de Conta do Usuário**:
   - Permite que o usuário exclua sua conta, removendo todos os dados associados.

## Tecnologias Utilizadas:

- React.js
- Material Design V3
- LocalStorage para armazenamento local dos dados
- Axios para chamadas à API
- Axios-Toastify para feedback de operações de CRUD

## Como Executar o Projeto:

### Pré-requisitos:

- Node.js instalado no sistema
- NPM ou Yarn instalados no sistema

### Instalação das dependências:

```bash
npm install
```

ou

```bash
yarn install
```

### Executando a Aplicação:

```bash
npm start
```

ou

```bash
yarn start
```

## Estrutura do Projeto:

- `src/`: Pasta onde estão todos os arquivos fonte da aplicação.
  - `components/`: Componentes React reutilizáveis.
    - `ContactForm.js`: Formulário para cadastro de contatos.
    - `DeleteModal.js`: Modal para exclusão de contatos e conta do usuário.
    - `MapComponent.js`: Componente que integra o Google Maps para mostrar os contatos geograficamente.
  - `pages/`: Páginas da aplicação.
    - `ContactPage.js`: Pagina onde os usuários podem cadastrar, visualizar e gerenciar seus contatos.
  - `services/`: Serviços de comunicação com a API.
    - `apiService.js`: Serviço para chamadas à API do ViaCEP e Google Maps.
  - `utils/`: Utilitários reutilizáveis.
    - `cepUtil.js`: Funções relacionadas ao CEP, como validação e integração com a API do ViaCEP.
    - `mapUtil.js`: Funções para manipulação dos dados de endereço e integração com o Google Maps.

## Testes:

### Testes Unitários:

- A aplicação foi testada com vários testes unitários utilizando Jest.

### Testes de Integração:

- Realizados testes de integração para garantir a comunicação entre os componentes e as chamadas à API.

## Documentação e Feedback:

Para mais detalhes sobre o projeto ou quaisquer dúvidas, por favor, entre em contato conosco.

---

**Desenvolvido por:** [Henrique Rocha]

**Data da última atualização:** [28/10/2024]
