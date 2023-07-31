const writeOutput = require('../controller/writeOutput');



describe('writeOutput', () => {
  const input = [{'version':'4.3','file':[{'name':'app/src/main/java/com/example/trybegenius/MainActivity.kt','error':[{'line':'89','column':'50','severity':'warning','message':'This expression contains a magic number. Consider defining it to a well named constant.','source':'detekt.MagicNumber'},{'line':'89','column':'56','severity':'warning','message':'This expression contains a magic number. Consider defining it to a well named constant.','source':'detekt.MagicNumber'},{'line':'91','column':'62','severity':'warning','message':'This expression contains a magic number. Consider defining it to a well named constant.','source':'detekt.MagicNumber'},{'line':'153','column':'49','severity':'warning','message':'This expression contains a magic number. Consider defining it to a well named constant.','source':'detekt.MagicNumber'},{'line':'173','column':'15','severity':'warning','message':'This expression contains a magic number. Consider defining it to a well named constant.','source':'detekt.MagicNumber'},{'line':'175','column':'15','severity':'warning','message':'This expression contains a magic number. Consider defining it to a well named constant.','source':'detekt.MagicNumber'},{'line':'228','column':'23','severity':'warning','message':'This expression contains a magic number. Consider defining it to a well named constant.','source':'detekt.MagicNumber'}]},{'name':'app/src/test/java/com/example/trybegenius/ExampleUnitTest.kt','error':{'line':'5','column':'1','severity':'warning','message':'org.junit.Assert.* is a wildcard import. Replace it with fully qualified imports.','source':'detekt.WildcardImport'}}]}]
  test('should return console.log ', () => {
    const writeOutputSpy = jest.spyOn(writeOutput, 'writeOutput');
    expect(writeOutputSpy).toHaveBeenCalledWith('Version: 4.3');
    expect(writeOutputSpy).toHaveBeenCalledWith('Verifique os erros abaixo:');
    expect(writeOutputSpy).toHaveBeenCalledWith(input[0].file);
  })
})