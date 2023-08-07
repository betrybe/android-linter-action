# Android Linter Action  [![CI](https://github.com/betrybe/junit-android-evaluator-action/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/betrybe/android-linter-action/actions/workflows/main.yml)

Projeto em javascript responsável por processar os relatórios(xml) de [detekt](https://detekt.dev/) e [ktlint](https://pinterest.github.io/ktlint/0.50.0/). 

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

## Configurando seu projeto para utilizar o avaliador 

[Atencao] O projeto deve estar devidamente com configurações do detekt e ktlint.
Para esta versão utilizamos as versões

build.grade(app)

```
    id 'org.jlleitschuh.gradle.ktlint' version '11.5.0'
    id 'io.gitlab.arturbosch.detekt' version '1.23.0'
```

No projeto android adicionar arquivo .github/workflows/main.yml

```yml
on:
  pull_request:
    types: [opened, synchronize]

jobs:
  Tests:

    runs-on: ubuntu-latest
    steps:

      - name: checkout
        uses: actions/checkout@v3

      - name: Fetch Detekt/Ktlint Linter
        uses: actions/checkout@v3

        with:
          repository: betrybe/android-linter-action
          ref: v1
          token: ${{ secrets.GIT_HUB_PAT }}
          path: .github/actions/android-linter-action

      - name: Run Detekt/Ktlint Linter
        uses: ./.github/actions/android-linter-action
```
