const { getDetektReport, getKtlintReport } = require('./src/controller/linterManager')
const { spawn } = require('child_process')
const core = require('@actions/core')
const { writeOutput } = require('./src/controller/writeOutput')

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
      core.info('\u001b[38;5;6m[info] Iniciando análise do detekt')

      report = getDetektReport()
      core.setOutput('Detekt', report)
      core.notice(`\u001b[32;5;6m 🚀 Processo concluído verifique abaixo os erros reportados ${report}`)
      writeOutput(report)
      return report
    })
   
  } catch (error) {
    core.setOutput('Detekt', error)
    core.setFailed(`${error}`)
    return error
  }
}

function runKtlint() {
  const command = './gradlew ktlintCheck'
  const childProcess = spawn(command, { shell: true })

  try {
    childProcess.stderr.on('data', (data) => {
      core.setFailed(`\u001b[38;5;6m[erro]  EXEC -> Erro no comando bash: ${data}`)
    })

    childProcess.on('close', (code) => {
      core.info('\u001b[38;5;6m[info] Iniciando análise do ktlint')

      report = getKtlintReport()
      core.setOutput('result > ktlint', report)
      core.notice(`\u001b[32;5;6m 🚀 Processo concluído -> ${report}`)
      return report
    })

  } catch (error) {
    core.setOutput('result > ktlint', error)
    core.setFailed(`${error}`)
    return error
  }
}

const run = () => {
  runDetekt()
  runKtlint()
}

core.info('\u001b[38;5;6m[info] 🏃‍♂️ Rodando linter')

run()
