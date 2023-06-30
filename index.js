const { getDetektReport } = require('./src/controller/detektManager')
const { spawn } = require('child_process')
const core = require('@actions/core')


const run = () => {
  const command = './gradlew detekt'
  const childProcess = spawn(command, { shell: true })

  try {
    childProcess.stdout.on('data', (data) => {
      core.info(`\u001b[38;5;6m[info] Saída do comando: ${data}`)
    })

    childProcess.stderr.on('data', (data) => {
      core.setFailed(`\u001b[38;5;6m[erro]  EXEC -> Erro no comando bash: ${data}`)
      console.error(`Erro no comando bash: ${data}`)
    })

    childProcess.on('close', (code) => {
      core.info(`\u001b[38;5;6m[erro] O comando encerrado com o código de saída: ${code}`)
      console.log(`O comando bash foi encerrado com o código de saída: ${code}`)

      report = getDetektReport()
      core.setOutput('result > detekt', report)
      core.notice(`\u001b[32;5;6m 🚀 Processo concluído -> ${report}`)
      return report
    })
    
    // exec(command, (error, stdout, stderr) => {
    //   if (error) {
    //     core.setFailed(`\u001b[38;5;6m[erro]  EXEC -> Erro ao executar o comando: ${error.message}`)
    //     console.error(`EXEC -> Erro ao executar o comando: ${error.message}`)
    //     return
    //   }
    //   if (stderr) {
    //     core.setFailed(`\u001b[38;5;6m[erro]  EXEC -> Erro no comando bash: ${stderr}`)
    //     console.error(`EXEC -> Erro no comando bash: ${stderr}`)
    //     return
    //   }
    //   core.setFailed(`\u001b[38;5;6m[erro]EXEC -> Saída do comando: ${stdout}`)
    //   // Saída do comando bash
    //   console.log(`EXEC -> Saída do comando: ${JSON.stringify(stdout)}`)
    // })
   
  } catch (error) {
    core.setOutput('result > detekt', error)
    core.setFailed(`${error}`)
    return error
  }
}

core.info('\u001b[38;5;6m[info] 🏃‍♂️ Rodando linter')

run()
