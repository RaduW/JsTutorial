describe 'First Test', ->
    scriptParser = null
    
    beforeEach(module('jsConsole'))
    
    beforeEach inject (_scriptParser_) ->
        scriptParser = _scriptParser_
    
    it 'should expose the service', ->
        expect(scriptParser).toBeDefined()
        expect(scriptParser).toBeTruthy()
        
        
        
