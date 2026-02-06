# Coop Calendar

![Build & Deploy](https://github.com/maycrodrigues/coop-calendar/actions/workflows/deploy.yml/badge.svg)
![GitHub Pages](https://img.shields.io/github/deployments/maycrodrigues/coop-calendar/github-pages?label=GitHub%20Pages&logo=github)
![Version](https://img.shields.io/github/v/release/maycrodrigues/coop-calendar?label=version&color=blue)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF?logo=vite&logoColor=white)

Sistema de calendário cooperativo.

🔗 **Acesse o sistema online:** [https://maycrodrigues.github.io/coop-calendar/](https://maycrodrigues.github.io/coop-calendar/)

## 🚀 Deploy

Este projeto está configurado para deploy automático no GitHub Pages usando GitHub Actions.

### Configuração Inicial (Necessária apenas uma vez)

Para que o deploy funcione, você precisa habilitar o GitHub Pages no repositório:

1. Acesse as **Settings** (Configurações) do repositório no GitHub.
2. No menu lateral esquerdo, clique em **Pages**.
3. Na seção **Build and deployment**:
   - Em **Source**, selecione **GitHub Actions** (provavelmente está como "Deploy from a branch").
4. Não é necessário configurar mais nada, o GitHub detectará automaticamente o workflow.

### Como atualizar

Basta fazer um push para a branch `main`:

```bash
git push origin main
```

O workflow iniciará automaticamente e o site será atualizado em alguns minutos.

## 🛠️ Desenvolvimento Local

1. Instale as dependências:
```bash
npm install
```

2. Rode o servidor de desenvolvimento:
```bash
npm run dev
```

3. Para testar o build localmente:
```bash
npm run build
npm run preview
```
