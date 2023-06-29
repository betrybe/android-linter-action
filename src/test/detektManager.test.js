const { buildCheckstyleObject, getCheckstylesFiles } = require('../controller/detektManager');
const { loadFile, searchFilesXml } = require('../controller/fileManager');

jest.mock('../controller/fileManager');

describe('Detekt manager', () => {
  describe('buildCheckstyleObject', () => {
    loadFile.mockReturnValue(`<?xml version="1.0" encoding="UTF-8"?>
      <checkstyle version="4.3">
        <file
          name="app/src/main/java/com/betrybe/todo/domain/Collections.kt">
          <error line="3" column="74" severity="warning"
            message="In most cases using a spread operator causes a full copy of the array to be created before calling a method. This may result in a performance penalty."
            source="detekt.SpreadOperator" />
        </file>
      </checkstyle>`);
    const path = './src/test/res/';
    const files = ['file1.xml', 'file2.xml'];
    test('should returns array with object', () => {
      const mockFile = jest.fn(() => {
        return  {
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
      });

      const result = buildCheckstyleObject(path, files);

      expect(result).toEqual([mockFile(), mockFile()]);

    })
  })

  describe('getCheckstylesFiles', () => {
    test('should returns pathFiles with success', () => {
      searchFilesXml.mockReturnValue({files: ['file1.xml', 'file2.xml'], path: './src/test/res/'});
      const pathList = ['./src/test/res/'];

      expect(getCheckstylesFiles(pathList)).toEqual([{files: ['file1.xml', 'file2.xml'], path: './src/test/res/'}]);
    })
    test('should returns error', () => {
      searchFilesXml.mockReturnValue({files: [], path: './src/test/res/'});
      const pathList = ['./src/test/res/'];
      const error = new Error(`📭 Nenhum arquivo detekt encontrado para ser analisado -> ${pathList}`);

      expect(() => getCheckstylesFiles(pathList)).toThrowError(error)
    })
  })

});