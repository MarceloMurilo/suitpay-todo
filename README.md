# 📓 Caderno de Tarefas

Aplicativo de lista de tarefas com visual inspirado em cadernos manuscritos, desenvolvido em React Native para o teste técnico da SuitPay.

> **Status**: ✅ Projeto Completo - Todas as funcionalidades obrigatórias e diferenciais implementados
> 
> **Repositório**: https://github.com/MarceloMurilo/suitpay-todo

## ✨ Funcionalidades Implementadas

### 📋 Funcionalidades Obrigatórias
- ✅ **Listar tarefas** com visual estilo caderno
- ✅ **Adicionar novas tarefas** (modo rápido: digite + Enter)
- ✅ **Marcar como concluída** com checkbox animado
- ✅ **Excluir tarefas** com confirmação
- ✅ **Contador de tarefas** (Total, Concluídas, Pendentes) - clicáveis para filtrar
- ✅ **Persistência de dados** com AsyncStorage

### 🎨 Diferenciais Implementados (100%)
- ✅ **Filtros Completos**: 
  - Todas/Ativas/Concluídas (post-its clicáveis)
  - Por Categoria (incluindo personalizadas)
  - Por Prioridade
  - Modal unificado de busca e filtros
- ✅ **Edição de Tarefas**: 
  - Clique no título para ver detalhes completos
  - Modal de edição com título, descrição, categoria e prioridade
- ✅ **Categorias Personalizáveis**: 
  - Crie categorias com emoji e nome
  - Gerenciador completo no menu lateral
  - Categorias opcionais (tarefas podem não ter categoria)
- ✅ **Sistema de Prioridades**: 
  - Alta (vermelho), Média (laranja), Baixa (verde)
  - Opcional - tarefas podem não ter prioridade
- ✅ **Busca Inteligente**: 
  - Busca por título com filtros integrados
  - Modal deslizante de baixo para cima
- ✅ **Animações Suaves**: 
  - Checkboxes com spring animation
  - Fade out ao deletar
  - Transições entre modais
- ✅ **Dark Mode**: 
  - Modo claro (papel off-white)
  - Modo escuro estilo Moleskine
  - Toggle minimalista sol/lua
  - Contraste otimizado

### 🚀 Recursos Extras
- 📝 **Descrição opcional** nas tarefas
- ➕ **Adição rápida**: Digite e pressione Enter
- ⚙️ **Adição avançada**: Clique no + sem texto para abrir opções completas
- 🍔 **Menu lateral** deslizante da direita
- 🎯 **Interface minimalista** e intuitiva
- 📱 **100% Responsivo** e otimizado

### 🎯 Design Único - Estilo Caderno Manuscrito
- 📝 Fundo de papel pautado com linhas horizontais
- ✏️ Checkboxes desenhados à mão com animações
- 📌 Post-its coloridos para filtros e contadores
- 🌓 Alternador de tema minimalista (sol/lua)
- 🎨 Paleta de cores inspirada em materiais de papelaria
- 📦 Cards com separação visual clara entre tarefas
- 🖊️ Tipografia e elementos visuais estilo manuscrito

## 🚀 Como Executar

### Pré-requisitos
- Node.js (v16 ou superior)
- React Native CLI
- Android Studio (para Android) ou Xcode (para iOS)
- JDK 11 ou superior

### Instalação

```bash
# Clonar o repositório
git clone https://github.com/MarceloMurilo/suitpay-todo.git
cd suitpay-todo

# Instalar dependências
npm install

# Instalar pods (apenas iOS)
cd ios && pod install && cd ..

# Executar no Android
npx react-native run-android

# Executar no iOS
npx react-native run-ios
```

## 🛠️ Tecnologias Utilizadas

- **React Native** (CLI)
- **TypeScript** para tipagem estática
- **AsyncStorage** para persistência local
- **Context API** para gerenciamento de estado global
- **React Hooks** (useState, useEffect, useContext, useRef)
- **React Native SVG** para checkboxes desenhados à mão
- **Animated API** para animações suaves

## 📁 Estrutura do Projeto

```
src/
├── components/                      # Componentes reutilizáveis
│   ├── add-task-modal.tsx          # Modal de adição avançada
│   ├── category-filter.tsx         # Filtro de categorias
│   ├── category-manager-modal.tsx  # Gerenciador de categorias
│   ├── hand-drawn-checkbox.tsx     # Checkbox animado
│   ├── handwritten-text.tsx        # Texto estilo manuscrito
│   ├── notebook-background.tsx     # Papel pautado com linhas
│   ├── notebook-task-item.tsx      # Card de tarefa
│   ├── post-it-button.tsx          # Botões estilo post-it
│   ├── priority-filter.tsx         # Filtro de prioridades
│   ├── quick-add-task.tsx          # Input de adição rápida
│   ├── search-modal.tsx            # Modal de busca e filtros
│   ├── sidebar-menu.tsx            # Menu lateral (hamburger)
│   ├── task-details-modal.tsx      # Modal de detalhes/edição
│   ├── task-list.tsx               # Lista de tarefas
│   └── theme-toggle.tsx            # Toggle sol/lua
├── context/                        # Gerenciamento de estado
│   ├── tasks-context.tsx           # Estado global de tarefas
│   └── theme-context.tsx           # Estado do tema
├── screens/                        # Telas
│   └── home-screen.tsx             # Tela principal
├── services/                       # Serviços externos
│   └── storage-service.ts          # AsyncStorage wrapper
├── styles/                         # Estilos globais
│   └── notebook-colors.ts          # Paleta de cores caderno
├── types/                          # Tipos TypeScript
│   └── task.ts                     # Interfaces e tipos
└── utils/                          # Utilitários
    └── date-utils.ts               # Formatação de datas
```

## 🎨 Funcionalidades de Design

### Gerenciamento de Categorias
- Adicione categorias personalizadas com emojis
- Escolha entre 14 emojis diferentes
- Edite e remova categorias conforme necessário
- Categorias padrão: Trabalho, Pessoal, Compras, Saúde, Outros

### Modo Escuro Premium
- Fundo estilo Moleskine (preto suave)
- Post-its em cores pastel para melhor legibilidade
- Contraste otimizado para leitura noturna
- Alternância suave entre temas

### Animações
- Checkboxes com animação spring ao marcar/desmarcar
- Fade out suave ao deletar tarefas
- Transições fluidas entre estados

## 🎯 Destaques de UX/UI

### Interface Intuitiva
- **Adição Rápida**: Digite e pressione Enter - pronto!
- **Adição Avançada**: Clique no + vazio para abrir opções completas
- **Filtros Clicáveis**: Post-its de contadores funcionam como filtros
- **Detalhes ao Toque**: Clique no título da tarefa para ver/editar tudo
- **Menu Lateral**: Hamburger no canto direito com todas as configurações

### Visual Caderno Autêntico
- **Modo Claro**: Papel off-white, linhas pautadas, post-its vibrantes
- **Modo Escuro**: Papel preto Moleskine, post-its pastel, margem couro
- **Checkboxes Desenhados**: Animação spring ao marcar/desmarcar
- **Tipografia**: Fonte serif elegante para títulos

### Flexibilidade
- Categorias e prioridades são **opcionais**
- Tarefas podem ser simples (só título) ou completas (com descrição, categoria, prioridade)
- Filtros combinam busca + categoria + prioridade em um só lugar

## 🔧 Solução de Problemas

### O app não inicia
```bash
# Limpar cache
cd android && ./gradlew clean && cd ..
npx react-native start --reset-cache

# Em outro terminal
npx react-native run-android
```

### Erros de build no Android
```bash
cd android
./gradlew clean
cd ..
npx react-native run-android
```

### Problemas com SVG
```bash
npm install react-native-svg
cd android && ./gradlew clean && cd ..
```

## 💪 Desafios e Soluções

### Desafio 1: Categorias Personalizadas com Persistência
**Problema**: Gerenciar categorias dinâmicas junto com as tarefas
**Solução**: Implementei um sistema separado de categorias no Context API com AsyncStorage próprio, permitindo CRUD completo

### Desafio 2: Categorias e Prioridades Opcionais
**Problema**: TypeScript exigia category e priority obrigatórios
**Solução**: Mudei para `category?` e `priority?` opcionais, adaptando todos os componentes para renderizar condicionalmente

### Desafio 3: UI/UX Intuitiva
**Problema**: Muitos botões e opções deixavam a interface confusa
**Solução**: 
- Integrei contadores com filtros (post-its clicáveis)
- Uni busca + filtros em um modal
- Botão + com dupla função (rápido/avançado)
- Menu lateral para configurações

### Desafio 4: Dark Mode com Contraste
**Problema**: Textos ficavam ilegíveis no modo escuro
**Solução**: Implementei paleta Tailwind com cores específicas para cada modo, garantindo contraste WCAG

## ⏱️ Tempo de Desenvolvimento

**Tempo Total**: ~6-8 horas

- Configuração inicial e estrutura: 1h
- Funcionalidades obrigatórias: 2h
- Diferenciais (filtros, categorias, prioridades): 2h
- UI/UX estilo caderno: 2h
- Refinamentos e otimizações: 1-2h

## 👨‍💻 Desenvolvedor

**Marcelo Murilo Dantas**

Desenvolvido com ❤️ como parte do teste técnico para SuitPay.

## 📄 Licença

Este projeto foi desenvolvido para fins de avaliação técnica.
