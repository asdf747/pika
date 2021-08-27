const db = require('../funcs')

module.exports = {
    commands: 'script',
    callback: async (message, arguments, text, client) => {
        let func = console.log('e')

        let ass = func.toString()
        let non = new Function(ass)
        non()
}
}