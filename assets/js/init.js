// init
const APP_VERSION = '1.1.4'
function init(){
    const LOGO = `> Ramin Terminal - (c) 2021 [ raminrezaei.ir ]`
    let version = localStorage.getItem('terminal-version')
    insertCommand(LOGO, 'text-command command--pre')
    if(version !== APP_VERSION){
        input.innerHTML = 'help'
        COMMAND_HISTORY = []
        insertCommand('type your first command ...', 'warning')
        localStorage.setItem('terminal-version', APP_VERSION)
        localStorage.setItem('command-history', JSON.stringify([]))
    }
}
init()