
const fs = require('fs')
const path = require('path')
const core = require('@actions/core')
const { globSync } = require("glob")

/**
 * Retorna todos os arquivos xml's
 * @param {string} dirPath Caminho dos arquivos xml
 * @example searchFilesXml()
 * @output {files: [ 'exemplo.xml' ], path: dirPath} 
 * 
 */
function searchFilesXml(dirPath) {
  try {
    core.info(`\u001b[38;5;6m[info] 🔍 Buscando arquivos xml -> ${dirPath}`)
    
    let files = fs.readdirSync(dirPath)
    files = files.filter((file) => path.extname(file) === '.xml')
    core.info(`\u001b[38;5;6m[info] 📑 Arquivos encontrados para análise-> ${files.length}`)
    
    return {files, path: dirPath}  
  } catch (error) {
    core.info('\u001b[38;5;6m[info] 📑 Arquivos encontrados -> 0')
    return {files: [], path: dirPath}
  }
}

function searchJSONfiles(dirPath) {
  const pattern = path.join(dirPath, '**/*.json')
  return globSync(pattern)
}

/** 
 * Retorna a string gerada pela leitura do arquivo xml.
 * @param {string} pathFile 
 * @example loadFile("file.xml")
 * @output 
 */
function loadFile(pathFile) {
  let xml_string
  try {
    xml_string = fs.readFileSync(pathFile, 'utf8')
    return xml_string
  } catch (error) {
    throw new Error('Erro ao ler arquivo.')
  }

}

module.exports = {
  loadFile,
  searchFilesXml,
  searchJSONfiles
}
