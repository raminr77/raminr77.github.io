COMMANDS = [
    {
        command: 'help',
        color: 'success',
        validator: null,
        help: 'Helps you how to use the Terminal',
        action: '\n ✔️ For more information on a specific command, type command-name --help' +
                '\n\n TITLE     =>  Sets the window title for the terminal [ string ]' +
                '\n\n MAXIMIZE  =>  maximize the terminal [ none ]' +
                '\n\n MINIMIZE  =>  minimize the terminal [ none ]' +
                '\n\n YOUTUBE   =>  open YouTube Channel [ none ]' +
                '\n\n PWD       =>  show repository address [ none ]' +
                '\n\n LS        =>  show directories [ none ]' +
                '\n\n CD        =>  change directory [ string ]' +
                '\n\n CLEAR | CLS | C  =>  clean terminal [ none ]' +
                '\n\n CLEAN  =>  clean terminal history [ none ]' +
                '\n\n OPACITY   =>  change terminal opacity  [ number ] (0 - 100) \n- Example: opacity 40' +
                '\n\n COLOR     =>  change text color  [ hex | color name ] \n- Example: color red OR color #ff0033' +
                '\n\n BGCOLOR   =>  change background color  [ hex | color name ] \n- Example: bgcolor red OR bgcolor #ff0033' +
                '\n\n ---- Shortcuts ----------------------------------------------------------' +
                '\n\n Tilda OR ` =>  minimize the terminal' +
                '\n\n TAB        =>  maximize the terminal' +
                '\n\n ESC        =>  close the terminal' +
                '\n\n F1         =>  Help' +
                '\n\n ❤️ Made And Designed By Ramin Rezaei' +
                '\n Email: Ramin.Rezaei77 [At] gmail.com' +
                '\n PhoneNumber: +989136266179' +
                '\n Whatsapp: +989930600012' +
                '\n\n'
    },
    {
        command: 'title',
        color: 'success',
        validator: null,
        help: 'Sets the window title for the terminal [ string ] \n example: title NAME',
        action: (value = '') => {
            const title = document.querySelector('.js-title')
            title.innerHTML = value.split(' ')[1]
        }
    },
    {
        command: 'maximize',
        color: 'success',
        validator: null,
        help: 'maximize the terminal window [ none ] (TOGGLE)',
        action: (value = '') => {
            stickyBtns.classList.remove('mt-30')
            terminal.classList.toggle('maximize')
            terminal.classList.remove('minimize')
        }
    },
    {
        command: 'minimize',
        color: 'success',
        validator: null,
        help: 'minimize the terminal window [ none ]',
        action: (value = '') => {
            stickyBtns.classList.toggle('mt-30')
            terminal.classList.toggle('minimize')
            terminal.classList.remove('maximize')
        }
    },
    {
        command: 'youtube',
        color: 'success',
        validator: null,
        help: 'open YouTube channel [ none ]',
        action: (value = '') => {
            window.open('https://www.youtube.com/channel/UCeS1ksj-Nb5qml9-VNcd2oA')
        }
    },
    {
        command: 'clear',
        color: 'success',
        validator: null,
        help: 'clean terminal [ none ] ( clear , cls , c )',
        action: (value = '') => {
            commandsList.innerHTML = ''
        }
    },
    {
        command: 'cls',
        color: 'success',
        validator: null,
        help: 'clean terminal [ none ] ( clear , cls , c )',
        action: (value = '') => {
            commandsList.innerHTML = ''
        }
    },
    {
        command: 'c',
        color: 'success',
        validator: null,
        help: 'clean terminal [ none ] ( clear , cls , c )',
        action: (value = '') => {
            commandsList.innerHTML = ''
        }
    },
    {
        command: 'opacity',
        color: 'success',
        validator: null,
        help: 'change terminal opacity  [ number ] (0 - 100) - Example: opacity 40',
        action: (value = '') => {
            let number = parseFloat(value.split(' ')[1])
            if(!number){
                insertCommand(`😑 Syntax Error: opacity should be a number between 0 and 100`, 'danger')
                return
            }
            terminal.alpha(number)
        }
    },
    {
        command: 'color',
        color: 'success',
        validator: function (color){
            var s = new Option().style
            s.color = color
            var test1 = s.color == color
            var test2 = /^#[0-9A-F]{6}$/i.test(color)
            if(test1 == true || test2 == true){
              return true
            }
            return false
        },
        help: 'change terminal text color [ hex | color name ] - Example: color red OR color #ff0033',
        action: function(value = ''){
            let color = value.split(' ')[1]
            if(!this.validator(color)){
                insertCommand(`😑 Syntax Error: color should be a hex code or valid color name`, 'danger')
                return
            }
            input.style.color = color
        }
    },
    {
        command: 'bgcolor',
        color: 'success',
        validator: function (color){
            var s = new Option().style
            s.color = color
            var test1 = s.color == color
            var test2 = /^#[0-9A-F]{6}$/i.test(color)
            if(test1 == true || test2 == true){
              return true
            }
            return false
        },
        help: 'change terminal backgound color [ hex | color name ] - Example: bgcolor red OR bgcolor #ff0033',
        action: function(value = '') {
            let color = value.split(' ')[1]
            if(!this.validator(color)){
                insertCommand(`😑 Syntax Error: color should be a hex code or valid color name`, 'danger')
                return
            }
            terminal.style.backgroundColor = color
        }
    },
    {
        command: 'pwd',
        color: 'success',
        validator: null,
        help: 'terminal GitHub Repository',
        action: 'https://github.com/raminr77/raminr77.github.io'
    },
    {
        command: 'ls',
        color: 'success',
        validator: null,
        help: 'show directories',
        action: () => {
            insertCommand('Resume', 'text-command')
        }
    },
    {
        command: 'cd',
        color: 'success',
        validator: null,
        help: 'change directory',
        action: (value = '') => {
            let dir = value.split(' ')[1]
            if(!dir || dir !== 'Resume'){
                insertCommand(`😑 Not Found.`, 'danger')
                return
            }
            window.open('../../resume/index.html')
        }
    },
    {
        command: 'clean',
        color: 'success',
        validator: null,
        help: 'clean terminal history',
        action: (value = '') => {
            COMMAND_HISTORY = []
            localStorage.setItem('command-history', JSON.stringify([]))
        }
    },
]