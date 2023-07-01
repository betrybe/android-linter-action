# Detekt Linter Action

A Github action that evaluates projects with [detekt](https://detekt.dev/)  and comments the evaluation

## Development

### Build

Para não ter que rodar o `npm install` na execução da action, usamos o [ `vercel/ncc` ](https://github.com/vercel/ncc) para compilar o projeto em um único arquivo na pasta `dist` .

```bash
ncc build index.js --license licenses.txt
```

ou 

```bash
ncc build index.js --out dist/index.js
```

## Usage

No projeto android adicionar arquivo .github/workflows/main.yml

```yml
on:
  pull_request:

    types: [opened, synchronize]

jobs:
  Tests:

    runs-on: macos-latest
    steps:

      - name: checkout
        uses: actions/checkout@v3

      - name: Fetch Detekt Linter
        uses: actions/checkout@v3

        with:
          repository: betrybe/detekt-linter-action
          ref: v1
          token: ${{ secrets.GIT_HUB_PAT }}
          path: .github/actions/detekt-linter-action

      - name: Run Detekt Linter
        uses: ./.github/actions/detekt-linter-action
```
