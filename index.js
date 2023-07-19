const { getDetektReport } = require('./src/controller/detektManager')
const { spawn } = require('child_process')
const core = require('@actions/core')

function runDetekt() {
  const command = './gradlew detekt'
  const childProcess = spawn(command, { shell: true })

  try {
    childProcess.stdout.on('data', (data) => {
      core.info(`\u001b[38;5;6m[info] Saída do comando: ${data}`)
    })

    childProcess.stderr.on('data', (data) => {
      core.setFailed(`\u001b[38;5;6m[erro]  EXEC -> Erro no comando bash: ${data}`)
    })

    childProcess.on('close', (code) => {
      core.info('\u001b[38;5;6m[info] Iniciando analise do detekt')

      report = getDetektReport()
      core.setOutput('result > detekt', report)
      core.notice(`\u001b[32;5;6m 🚀 Processo concluído -> ${report}`)
      return report
    })
   
  } catch (error) {
    core.setOutput('result > detect', error)
    core.setFailed(`${error}`)
    return error
  }
}

const run = () => {
  runDetekt()
}

core.info('\u001b[38;5;6m[info] 🏃‍♂️ Rodando linter')

run()
