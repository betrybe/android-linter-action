const xml2js = require('xml2js')

/**
 * Transforma xml em objeto
 * @param {string} xml_string
 * @example loadFileUsingUrl("<?xml version="1.0" encoding="UTF-8"?>
<checkstyle version="4.3">
  <file
    name="app/src/main/java/com/betrybe/todo/domain/Collections.kt">
    <error line="3" column="74" severity="warning"
      message="In most cases using a spread operator causes a full copy of the array to be created before calling a method. This may result in a performance penalty."
      source="detekt.SpreadOperator" />
  </file>
</checkstyle>")
 * @output {
    version: '4.3',
    file: {
      name: 'app/src/main/java/com/betrybe/todo/domain/Collections.kt',
      error: {
        line: '3',
        column: '74',
        severity: 'warning',
        message: 'In most cases using a spread operator causes a full copy of the array to be created before calling a method. This may result in a performance penalty.',
        source: 'detekt.SpreadOperator'
      }
    }
  }
 */
function parserXmlToObject(xml_string) {
  let output = {}
  const parser = new xml2js.Parser({explicitRoot: false, trim: true, mergeAttrs: true, explicitArray: false})
  if(xml_string === null || xml_string  === undefined || xml_string === '' ) return new Error('Invalid xml for parsing.')
  parser.parseString(xml_string, function(error, result) {
    if(error === null) {
      output = result
    }
    else {
      throw error
    }
  })
  return output
}

module.exports = { parserXmlToObject }