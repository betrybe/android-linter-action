
/**
 * Formata saída de report via detekt
 * @param {string} repotr
 * @example writeOutput([{'version':'4.3','file':[{'name':'app/src/main/java/com/example/trybegenius/MainActivity.kt','error':[{'line':'89','column':'50','severity':'warning','message':'This expression contains a magic number. Consider defining it to a well named constant.','source':'detekt.MagicNumber'}]}])
 * @output 
    version: '4.3',
    Verifique os erros abaixo:
    `Formatado em tabela`
  }
 */

function writeReport(report) {
  console.log(`Version: ${report[0].version}`)
  if(report[0].file.length === 0) {
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
    throw new Error('Realize os ajustes necessário e tente novamente')

  }
}
  
module.exports = {
  writeReport
}
