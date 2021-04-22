// topbar buttons
const maximizeBtn = document.querySelector('.js-maximize')
const minimizeBtn = document.querySelector('.js-minimize')
const stickyBtns = document.querySelector('.js-sticky-btns')

// terminal
const input = document.querySelector('.js-input')
const terminal = document.querySelector('.js-terminal')
const commandsList = document.querySelector('.js-commands')
const terminalContent = document.querySelector('.js-terminal-content')

// global varibale
let index = loadCommandHistoryLen()
let COMMAND_HISTORY = loadCommandHistory()

// key down event
window.addEventListener('keydown', event => {

    if (event.keyCode === 13 || event.key === 'Enter') {
        event.preventDefault()
        submitCommand(input.innerHTML.trim())
    }

    if (event.keyCode === 38 || event.key === 'ArrowUp') {
        event.preventDefault()
        if (COMMAND_HISTORY.length < 1 || index < 1) return
        input.innerHTML = COMMAND_HISTORY[index - 1 < 0 ? 0 : index - 1]
        index--
    }

    if (event.keyCode === 40 || event.key === 'ArrowDown') {
        event.preventDefault()
        let len = COMMAND_HISTORY.length
        if (len <= index + 1) return
        input.innerHTML = COMMAND_HISTORY[index > len ? len : index + 1]
        index++
    }

    if (event.keyCode === 192 || event.key === '`') {
        event.preventDefault()
        minimize()
    }

    if (event.keyCode === 9 || event.key === 'Tab') {
        event.preventDefault()
        maximize()
    }

    if (event.keyCode === 112 || event.key === 'F1') {
        event.preventDefault()
        submitCommand('help')
    }

}, true)

// topbar button events
maximizeBtn.addEventListener('click', () => maximize())
minimizeBtn.addEventListener('click', () => minimize())

// functions
function maximize() {
    stickyBtns.classList.remove('mt-30')
    terminal.classList.toggle('maximize')
    terminal.classList.remove('minimize')
}

function minimize() {
    stickyBtns.classList.toggle('mt-30')
    terminal.classList.toggle('minimize')
    terminal.classList.remove('maximize')
}

function insertCommand(value = '~ ', className = '') {
    const command = document.createElement('div')
    command.classList = `command ${className}`
    command.innerHTML = value
    commandsList.append(command)
    scrollToEnd()
}

function convertHTMLToText(value = ''){
    let html = value
    html = html.replace(/<style([\s\S]*?)<\/style>/gi, '')
    html = html.replace(/<script([\s\S]*?)<\/script>/gi, '')
    html = html.replace(/<\/div>/ig, '\n')
    html = html.replace(/<\/li>/ig, '\n')
    html = html.replace(/<li>/ig, '  *  ')
    html = html.replace(/<\/ul>/ig, '\n')
    html = html.replace(/<\/p>/ig, '\n')
    html = html.replace(/<br\s*[\/]?>/gi, "\n")
    html = html.replace(/<[^>]+>/ig, '')
    html = html.replace(/\&nbsp;/g, '')
    return html
}

function submitCommand(text = '') {
    let value = convertHTMLToText(text)
    if (!value) {
        index = COMMAND_HISTORY.length
        insertCommand()
    } else {
        SetCommandHistory(value)
        index = COMMAND_HISTORY.length
        insertCommand(`~ ${value}`)
        result(value)
    }
    input.innerHTML = ''
}

function scrollToEnd(){
    terminalContent.scrollTop = commandsList.offsetHeight - input.offsetHeight
}

function SetCommandHistory(command = ''){
    COMMAND_HISTORY.push(command)
    localStorage.setItem('command-history', JSON.stringify(COMMAND_HISTORY))
}

function loadCommandHistoryLen(){
    let ls = JSON.parse(localStorage.getItem('command-history'))
    if(ls){
        return ls.length
    }
    return 0
}

function loadCommandHistory(){
    let ls = JSON.parse(localStorage.getItem('command-history'))
    if(ls){
        return ls
    }
    return []
}

// result functions
function result(value = '') {
    let userCommand = value.split(' ')
    let userSubCommand = value.split('--')[1]
    let [systemCommand] = COMMANDS.filter(item => item.command.toLowerCase() === userCommand[0].toLowerCase())
    if (!systemCommand) {
        insertCommand(`😑 command not found: ${value}`, 'danger')
        return
    }
    if (userSubCommand === 'help') {
        insertCommand(systemCommand.help, 'info')
        return
    }
    // result
    if (typeof (systemCommand.action) === 'function') {
        systemCommand.action(value)
    } else {
        insertCommand(systemCommand.action, systemCommand.color)
    }
}