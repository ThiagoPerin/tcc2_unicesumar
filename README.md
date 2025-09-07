# 🍺 Sistema de Gestão da Produção para Cervejarias Artesanais  

### Projeto de Trabalho de Conclusão de Curso (TCC)  
**Bacharelado em Engenharia de Software – Unicesumar**  
**Autor:** Thiago Perin Felipe da Cruz  
**RA:** 21191651-5  
**Data:** Agosto/2025  

---

## 📖 Sobre o Projeto  

Este repositório contém o código-fonte e documentação do **Sistema de Gestão da Produção para Cervejarias Artesanais**, desenvolvido como Trabalho de Conclusão de Curso.  

O projeto tem como objetivo **otimizar o processo produtivo em cervejarias artesanais**, oferecendo uma solução moderna para registro, rastreamento e análise de dados de produção.  

Trata-se de uma aplicação **web responsiva**, com funcionalidades que garantem **segurança, rastreabilidade e eficiência** no controle das etapas de produção da cerveja artesanal.  

---

## 🎯 Objetivos  

- Digitalizar o controle produtivo em cervejarias artesanais.  
- Garantir **segurança e integridade** dos dados de produção.  
- Reduzir desperdícios de tempo e recursos.  
- Disponibilizar **dashboards e relatórios** interativos.  
- Proporcionar **acessibilidade multiplataforma** (desktop e mobile).  

---

## ⚙️ Funcionalidades  

✅ Cadastro de cervejas  
✅ Criação e gerenciamento de ordens de produção  
✅ Registro de informações em todas as etapas do processo:  
- Brassagem  
- Inoculação de levedura  
- Monitoramento de extrato e temperatura  
- Fermentação  
- Medição de pH  
- Coleta de levedura  
- Dry hopping e adjuntos  
- Transferências  
- Carbonatação  
- Envase  

✅ Geração de relatórios em **PDF**  
✅ Dashboards dinâmicos (produção por data, cerveja e resultados de envase)  
✅ Autenticação com login e senha  

---

## 🖥️ Arquitetura do Sistema  

O sistema segue o padrão **3 camadas**:  

- **Frontend:**  
  - Framework: **Svelte**  
  - Estilização: **Bootstrap 5**  
  - Dashboards: **ApexCharts.js**  

- **Backend:**  
  - **Node.js + TypeScript**  
  - Framework: **Express.js**  
  - Arquitetura: Router → Controller → Model  
  - Autenticação via cookies de sessão  

- **Banco de Dados:**  
  - **MySQL 8+**  
  - Armazena de forma segura todas as informações de produção  

---

## 🛠️ Tecnologias Utilizadas  

- **Frontend:** Svelte, Bootstrap 5, ApexCharts.js  
- **Backend:** Node.js, TypeScript, Express.js  
- **Banco de Dados:** MySQL  
- **Controle de Versão:** GitHub  
- **Metodologia:** Kanban  

---

## 🚀 Como Executar o Projeto  

### Pré-requisitos  
- Node.js 20+  
- NPM  
- MySQL 8+ configurado  

### Passos  

1. Clone o repositório:  
   ```bash
   git clone https://github.com/ThiagoPerin/tcc2_unicesumar.git
   cd tcc2_unicesumar
   ```

2. Configure o arquivo `.env` com as variáveis necessárias:  
   ```env
   PORT=3000

   MYSQL_HOST=
   MYSQL_PORT=
   MYSQL_USER=
   MYSQL_PASS=
   MYSQL_DB=

   VALID_USER=
   USER_SALT=
   VALID_HASH=
   ```

3. Instale as dependências no frontend e backend:  
   ```bash
   cd frontend
   npm install
   npm run build

   cd ../backend
   npm install
   npm run build
   ```

4. Inicie o backend:  
   ```bash
   npm start
   ```

5. Acesse a aplicação pelo navegador em:  
   [http://localhost:3000](http://localhost:3000)  

---

## 📄 Licença  

Este projeto foi desenvolvido para fins **acadêmicos** como parte do TCC do curso de **Bacharelado em Engenharia de Software – Unicesumar**.  
O uso, cópia e distribuição devem respeitar os propósitos acadêmicos e de estudo.  
