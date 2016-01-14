describe 'First Test', ->
    scriptParser = null
    
    beforeEach(module('jsConsole'))
    
    beforeEach inject (_scriptParser_) ->
        scriptParser = _scriptParser_
    
    it 'should expose the service', ->
        expect(scriptParser).toBeDefined()
        expect(scriptParser).toBeTruthy()
        
    it 'should recognize comments and blocks', ->
        test= "/*--\ncomment\n*/\nsome code here"
        result = scriptParser.loadScript(test)
        expect(result).not.toBeNull()
        expect(result.length).toBe(1)
        expect(result[0].doc).toBe("""comment""")
        expect(result[0].script).toBe("some code here")
        
    it 'should recognize multiple comments', ->
        test= "/*--\nabc\n*/\n123/*--\ndef\n*/\n456"
        result = scriptParser.loadScript(test)
        expect(result).not.toBeNull()
        expect(result.length).toBe(2)
        expect(result[0].doc).toBe("""abc""")
        expect(result[0].script).toBe("123")                
        expect(result[1].doc).toBe("""def""")
        expect(result[1].script).toBe("456")
                    
    it 'should recognize multiple comments without code', ->
        test= "/*--\nabc\n*/\n/*--\ndef\n*/"
        result = scriptParser.loadScript(test)
        expect(result).not.toBeNull()
        expect(result.length).toBe(2)
        expect(result[0].doc).toBe("""abc""")
        expect(result[0].script).toBe("")                
        expect(result[1].doc).toBe("""def""")
        expect(result[1].script).toBe("")
    
    it 'should recognize additive comments', ->
        test= "/*--\nabc\n*/\n/*--+\ndef\n*/"
        result = scriptParser.loadScript(test)
        expect(result).not.toBeNull()
        expect(result.length).toBe(2)
        expect(result[0].doc).toBe("abc")
        expect(result[0].script).toBe("")                
        expect(result[1].doc).toBe("abc\n\n\ndef")
        expect(result[1].script).toBe("")
                              