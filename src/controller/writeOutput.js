

/**
 * Formata saída de report
 * @param {string} repotr
 * @example writeOutput([{'version':'4.3','file':[{'name':'app/src/main/java/com/example/trybegenius/MainActivity.kt','error':[{'line':'89','column':'50','severity':'warning','message':'This expression contains a magic number. Consider defining it to a well named constant.','source':'detekt.MagicNumber'}]}])
 * @output 
    version: '4.3',
    Verifique os erros abaixo:
    `Formatado em tabela`
  }
 */

function writeOutput(report) {
  // escrever string como tabela no console
  const files = report[0].file
  console.log(`Version: ${report[0].version}`)
  console.log('Verifique os erros abaixo:')

  console.table(files)
}

module.exports = {
  writeOutput
}
