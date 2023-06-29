const { loadFile } = require('../controller/fileManager');
const { parserXmlToObject } = require('../controller/xmlParser');

describe('XMl parser', () => { 
  describe('validate by parsing from xml to object', () => {
    test('parse with a valid xml successfully', () => {
      let file = loadFile(`${__dirname}/fixtures/exampleDetekt.xml`)
      let output = parserXmlToObject(file)
      expect(JSON.stringify(output)).toBe(
        "{\"version\":\"4.3\",\"file\":[{\"name\":\"app/src/main/java/com/betrybe/todo/domain/Collections.kt\",\"error\":{\"line\":\"3\",\"column\":\"74\",\"severity\":\"warning\",\"message\":\"In most cases using a spread operator causes a full copy of the array to be created before calling a method. This may result in a performance penalty.\",\"source\":\"detekt.SpreadOperator\"}},{\"name\":\"app/src/main/java/com/betrybe/todo/domain/Collections.kt\",\"error\":{\"line\":\"3\",\"column\":\"74\",\"severity\":\"warning\",\"message\":\"In most cases using a spread operator causes a full copy of the array to be created before calling a method. This may result in a performance penalty.\",\"source\":\"detekt.SpreadOperator\"}}]}"
      )
    })
  })
})