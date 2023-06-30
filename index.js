const { getDetektReport } = require('./src/controller/detektManager')
const { exec } = require('child_process')
const core = require('@actions/core')

const command = './gradlew detekt'

const run = () => {
  try {
    core.info('\u001b[38;5;6m[info] 🏃‍♂️ Rodando linter')

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`EXEC -> Erro ao executar o comando: ${error.message}`)
        return
      }
      if (stderr) {
        console.error(`EXEC -> Erro no comando bash: ${stderr}`)
        return
      }
      // Saída do comando bash
      console.log(`EXEC -> Saída do comando: ${stdout}`)
    })

    report = getDetektReport()
    core.setOutput('result > detekt', report)
    core.notice(`\u001b[32;5;6m 🚀 Processo concluído -> ${report}`)
    return outputBase64
  } catch (error) {
    core.setOutput('result > detekt', error)
    core.setFailed(`${error}`)
    return error
  }
}

core.info('\u001b[38;5;6m[info] 🏃‍♂️ Rodando linter')

run()
