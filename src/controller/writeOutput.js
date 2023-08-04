const core = require('@actions/core')

/**
 * Formata saída de report via detekt
 * @param {string} report
 * @example writeReportDetekt([{'version':'4.3','file':[{'name':'app/src/main/java/com/example/trybegenius/MainActivity.kt','error':[{'line':'89','column':'50','severity':'warning','message':'This expression contains a magic number. Consider defining it to a well named constant.','source':'detekt.MagicNumber'}]}])
 * @output 
    version: '4.3',
    Verifique os erros abaixo:
    `Formatado em tabela`
  }
 */

function writeReportDetekt(report) {
  console.log(`Version: ${report[0].version}`)
  if(!report[0]?.file) {
    console.log('✅ APROVADO')
  }
  else {
    console.log('Verifique os erros abaixo:')
    
    if(report.length > 0 && report[0].file.length > 0) {
      report[0].file.forEach((element) => { 
        console.log(`❌ [erro] Arquivo: ${element.name}`)
        console.table(element.error)
      })
    }
    // Trecho força quebra da action quando há erros reportados.
    core.setFailed('❌ Erros encontrados')

  }
}


/**
 * Formata saída de report via detekt
 * @param {string} report
 * @example writeReportKtlint([{"file":"/home/runner/work/sd-000-projeto-android-trybe-genius-2023-07-31-09-23-00/sd-000-projeto-android-trybe-genius-2023-07-31-09-23-00/app/src/main/java/com/example/trybegenius/MainActivity.kt","errors":[{"line":3,"column":1,"message":"Imports must be ordered in lexicographic order without any empty lines in-between with \"java\", \"javax\", \"kotlin\" and aliases in the end","rule":"import-ordering"}]},{"file":"/home/runner/work/sd-000-projeto-android-trybe-genius-2023-07-31-09-23-00/sd-000-projeto-android-trybe-genius-2023-07-31-09-23-00/app/src/androidTest/java/com/example/trybegenius/ExampleInstrumentedTest.kt","errors":[{"line":1,"column":1,"message":"File must end with a newline (\\n)","rule":"final-newline"},{"line":3,"column":1,"message":"Imports must be ordered in lexicographic order without any empty lines in-between with \"java\", \"javax\", \"kotlin\" and aliases in the end","rule":"import-ordering"},{"line":9,"column":1,"message":"Wildcard import","rule":"no-wildcard-imports"}]}])
 * @output 
    Verifique os erros abaixo:
    `Formatado em tabela`
  }
 */


function writeReportKtlint(report) {
  if(report.length === 0) {
    console.log('✅ APROVADO')
  }
  else {
    console.log('Verifique os erros abaixo:')
    var output = JSON.parse(report)

    output.forEach((element) => { 
      console.log(`❌ [erro] Arquivo: ${element.file}`)
      console.table(element.errors)
    })
    
    // Trecho força quebra da action quando há erros reportados.
    core.setFailed('❌ Erros encontrados')
  }
}
  
module.exports = {
  writeReportDetekt,
  writeReportKtlint
}
