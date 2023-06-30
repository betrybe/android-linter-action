# Detekt Linter Action

A Github action that evaluates projects with [detekt](https://detekt.dev/)  and comments the evaluation
🚧  👷‍♀️ Em construção  🚧  

## Development

### Tools

### Build

Para não ter que rodar o `npm install` na execução da action, usamos o [[ `vercel/ncc` ](https://github.com/vercel/ncc) para compilar o projeto em um único arquivo na pasta `dist` .

```bash
ncc build index.js --license licenses.txt
```

ou 

```bash
ncc build index.js --out dist/index.js
```

## Inputs 

🚧  👷‍♀️ Em construção  🚧  

## Usage

No projeto android adicionar ao build.grade o seguinte trecho

```kotlin
task detekt(type: Exec) {
    commandLine "bash", "-c", "./gradlew detekt -i > detekt-report.txt"
}

sudo ./gradlew detekt --continue

sudo ./gradlew detekt --continue -r 'xml:reports/detekt.xml'
```

 sudo ./gradlew --i --report xml:reports/detekt.xml 

🚧  👷‍♀️ Em construção  🚧  
