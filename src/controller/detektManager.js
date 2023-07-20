const { searchFilesXml, loadFile, searchJSONfiles } = require('../controller/fileManager')
const { parserXmlToObject } = require('../controller/xmlParser')

/**
 * @example getDetektReport()
 * @return {string}
 */
function getDetektReport() {

  const detektReportPath = 'app/build/reports/detekt'
  const files = getCheckstylesFiles([detektReportPath])
 
  const detektReport = files.map((file) => {
    return buildCheckstyleObject(detektReportPath, file.files)
  }).reduce((acc, val) => acc.concat(val), [])
  return JSON.stringify(detektReport)
}

const KTLINT_REPORT_PATH = 'app/build/reports/ktlint'

/**
 * @typedef {Object} KtlintError
 * @property {string} column - Coluna onde o erro foi encontrado.
 * @property {string} line - Linha onde o erro foi encontrado.
 * @property {string} message - Descrição do erro.
 * @property {string} rule - Nome da regra violada.
 */

/**
 * @typedef {Object} KtlintReport
 * @property {string} file - Nome do arquivo.
 * @property {KtlintError[]} errors - Erros encontrados no arquivo.
 */

/**
 * Retorna um relatório com os erros encontrados após a execução do Ktlint no projeto.
 *
 * @returns {KtlintReport[]} Relatório com os erros encontrados
 */
function getKtlintReport() {
  const files = searchJSONfiles(KTLINT_REPORT_PATH)

  const ktlintReport = files
    .map(file => loadFile(file))
    .map(file => JSON.parse(file))
    .flat()

  return JSON.stringify(ktlintReport)
}

/**
 * @example getCheckstylesFiles('./src/test/res/')
 * @param {array} pathList - caminho da pasta para o xml's.
 * @return {string}
 */
function getCheckstylesFiles(pathList) {
  const pathFiles = pathList.map((path) => searchFilesXml(path))

  const noFile = !pathFiles.find((path) => {
    return path.files.length > 0
  })
  
  if(noFile) throw new Error(`📭 Nenhum arquivo detekt encontrado para ser analisado -> ${pathList}`)

  return pathFiles
}

/**
 * @example buildCheckstyleObject('./src/test/res/', ['file.xml'])
 * @param {string} path - caminho da pasta para o xml's.
 * @param {array} files - arquivos em formato xmls.
 * @return {array}
 */
function buildCheckstyleObject(path, files) {
  return files.map((file) => {
    const loadedFile = loadFile(`${path}/${file}`)
    const objCheckStyles = parserXmlToObject(loadedFile)
    return objCheckStyles
  }).reduce((acc, val) => acc.concat(val), [])
}

module.exports = {
  getDetektReport,
  getKtlintReport,
  getCheckstylesFiles,
  buildCheckstyleObject
}