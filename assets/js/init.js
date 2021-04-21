// init
function init(){
    const LOGO = `> Ramin Terminal - (c) 2021 [ raminrezaei.ir ]`
    let seen = localStorage.getItem('terminal-version')
    insertCommand(LOGO, 'text-command command--pre')
    if(!seen){
        insertCommand('type your first command ...', 'warning')
        localStorage.setItem('terminal-version', '1.1.0')
        input.innerHTML = 'help'
    }
}
init()