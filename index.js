const { getDetektReport } = require('./src/controller/detektManager')
const core = require('@actions/core')

const run = () => {
  try {

    core.info('\u001b[38;5;6m[info] 🏃‍♂️ Rodando linter')
    report = getDetektReport()
    core.setOutput('result > detekt', report)
    core.notice(`\u001b[32;5;6m 🚀 Processo concluído -> ${report}`)
    return outputBase64
  } catch (error) {
    core.setFailed(`${error}`)
    return error
  }
}

core.info('\u001b[38;5;6m[info] 🏃‍♂️ Rodando linter')

run()
