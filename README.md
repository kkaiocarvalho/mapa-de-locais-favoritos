# Mapa de Locais Favoritos

Aplicacao web para buscar lugares no mapa, selecionar coordenadas e salvar favoritos com persistencia no navegador.

## Visao Geral

O projeto permite:

- Buscar locais por nome (Nominatim / OpenStreetMap)
- Selecionar ponto no mapa por clique
- Salvar local favorito com nome personalizado
- Evitar nomes duplicados na lista de favoritos
- Remover favoritos salvos
- Persistir dados no `localStorage`

## Tecnologias

- React 19
- TypeScript
- Vite
- React Query (`@tanstack/react-query`)
- React Leaflet + Leaflet
- Tailwind CSS
- shadcn/ui
- Lucide React

## Estrutura Principal

```txt
src/
  app/
    components/
      SearchPlaces.tsx
      SaveFavoritePlace.tsx
      FavoritesList.tsx
      MapView.tsx
    pages/
      MapPage.tsx
    services/
      nominatim.ts
      favoritesStorages.ts
    types.ts
```

## Como Rodar Localmente

### 1. Instalar dependencias

```bash
npm install
```

### 2. Subir ambiente de desenvolvimento

```bash
npm run dev
```

### 3. Gerar build

```bash
npm run build
```

### 4. Rodar lint

```bash
npm run lint
```

## Como Usar

1. Abra a aba **Buscar**.
2. Pesquise um local.
3. Clique em um resultado ou diretamente no mapa.
4. Defina um nome no campo e clique em **Salvar favorito**.
5. Veja e gerencie os itens na aba **Favoritos**.

## Regras de Favoritos

- Nao permite salvar dois favoritos com o mesmo nome (comparacao por texto normalizado).
- Se o nome estiver vazio, o app usa:
  - nome sugerido da busca, ou
  - `Local favorito` como fallback.

## Persistencia

- Chave utilizada no navegador: `favorite_places`
- Dados salvos localmente no `localStorage`

## Scripts

- `npm run dev`: inicia o servidor de desenvolvimento
- `npm run build`: compila TypeScript e gera build de producao
- `npm run preview`: visualiza build localmente
- `npm run lint`: executa ESLint

## Melhorias Futuras

- Edicao de favorito (renomear)
- Confirmacao antes de remover item
- Filtros e ordenacao por data
- Testes automatizados para services e componentes

