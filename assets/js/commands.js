COMMANDS = [
    {
        command: 'help',
        color: 'success',
        validator: null,
        help: 'Helps you how to use the Terminal',
        action: '\n ✔️ For more information on a specific command, type command-name --help' +
                '\n\n LS        =>  show directories [ none ]'   +
                '\n\n CD        =>  change directory [ string ]' +
                '\n\n PWD       =>  show repository address [ none ]' +
                '\n\n CLEAN     =>  clean terminal history [ none ]'  +
                '\n\n COLOR     =>  change text color  [ hex | color name ]' +
                '\n-- Example: color red OR color #ff0033' +
                '\n\n TITLE     =>  Sets the window title for the terminal [ string ]' +
                '\n\n OPACITY   =>  change terminal opacity  [ number ] (0 - 100)' +
                '\n-- Example: opacity 40' +
                '\n\n BGCOLOR   =>  change background color  [ hex | color name ]' +
                '\n-- Example: bgcolor red OR bgcolor #ff0033' +
                '\n\n MAXIMIZE  =>  maximize the terminal [ none ]' +
                '\n\n MINIMIZE  =>  minimize the terminal [ none ]' +
                '\n\n CLEAR | CLS | C  =>  clean terminal [ none ]' +
                '\n\n ------------ Ramin Rezaei ------------' +
                '\n\n RAMIN       =>  I ...' +
                '\n\n ABOUT       =>  read more about Ramin' +
                '\n\n SKILLS      =>  show Ramin`s skills' +
                '\n\n CONTACT     =>  show a way for connect Ramin' +
                '\n\n YOUTUBE     =>  open YouTube Channel [ none ]' +
                '\n\n DOWNLOAD    =>  download Ramin CV in the new tab - English [ none ]' +
                '\n\n EDUCATION   =>  show education info [ none ]' +
                '\n\n EXPERIENCE  =>  show work expreience info [ none ]' +
                '\n\n ------------ Shortcuts ------------' +
                '\n\n F1         =>  Help' +
                '\n\n ESC        =>  close the terminal' +
                '\n\n TAB        =>  maximize the terminal' +
                '\n\n Tilda OR ` =>  minimize the terminal' +
                '\n\n ------------ --------- ------------' +
                '\n\n ❤️ Made And Designed By Ramin Rezaei' +
                '\n 😋 try : ramin command :D' +
                '\n\n'
    },
    {
        command: 'title',
        color: 'success',
        validator: null,
        help: 'Sets the window title for the terminal [ string ] \n-- Example: title NAME',
        action: (value = '') => {
            const title = document.querySelector('.js-title')
            title.innerHTML = value.split(' ')[1] ?? 'Unknown 😶'
        }
    },
    {
        command: 'maximize',
        color: 'success',
        validator: null,
        help: 'maximize the terminal window [ none ] (TOGGLE Command)',
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
        help: 'change terminal opacity  [ number ] (0 - 100) \n-- Example: opacity 40',
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
        help: 'change terminal text color [ hex | color name ] \n-- Hex Example: #21252b \n-- Color Name Example: color red',
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
        help: 'change terminal backgound color [ hex | color name ] \n-- Hex Example: #21252b \n-- Color Name Example: color red',
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
        help: 'terminal GitHub Repository [ none ]',
        action: 'https://github.com/raminr77/raminr77.github.io'
    },
    {
        command: 'ls',
        color: 'success',
        validator: null,
        help: 'show directories [ none ]',
        action: () => {
            insertCommand('Resume', 'text-command')
        }
    },
    {
        command: 'cd',
        color: 'success',
        validator: null,
        help: 'change directory [ none ]',
        action: (value = '') => {
            let dir = value.split(' ')[1]
            if(!dir || dir !== 'Resume' || dir !== 'resume'){
                insertCommand(`😑 Not Found.`, 'danger')
                return
            }
            window.open('https://raminrezaei.ir/resume/')
        }
    },
    {
        command: 'clean',
        color: 'success',
        validator: null,
        help: 'clean terminal history [ none ]',
        action: (value = '') => {
            COMMAND_HISTORY = []
            localStorage.setItem('command-history', JSON.stringify([]))
        }
    },
    // Ramin Commands
    {
        command: 'youtube',
        color: 'success',
        validator: null,
        help: 'open Ramin`s YouTube channel [ none ]',
        action: (value = '') => {
            window.open('https://www.youtube.com/channel/UCeS1ksj-Nb5qml9-VNcd2oA')
        }
    },
    {
        command: 'download',
        color: 'success',
        validator: null,
        help: 'Download Ramin`s CV in the new tab - English [ none ]',
        action: (value = '') => {
            window.open('https://raminrezaei.ir/assets/files/ramin-rezaei-en.pdf')
        }
    },
    {
        command: 'ramin',
        color: 'success',
        validator: null,
        help: 'I`m Ramin [ 😎 ]',
        action: (value = '') => {
            insertCommand(`
                <div class="terminal-gallery">
                    <img class="js-zoom-image" src="./assets/images/gallery/1.jpg" alt="Ramin Rezaei" />
                    <img class="js-zoom-image" src="./assets/images/gallery/2.jpg" alt="Ramin Rezaei" />
                    <img class="js-zoom-image" src="./assets/images/gallery/3.JPG" alt="Ramin Rezaei" />
                </div>
            `)
        }
    },
    {
        command: 'about',
        color: 'success',
        validator: null,
        help: 'read more about Ramin [ none ]',
        action: (value = '') => {
            insertCommand('I used to be a graphic designer but then I fell in love with programming.\nI am currently a front-end programmer, and a little bit of back-end as well.\nI love solving bugs and problems and I like creating websites.\nI really believe that nothing is more important and exciting than learning and teaching web-based technologies and there is still so much for me to learn.\nBasically, if you have some coffee or Nescafe, I can work with you!', 'info')
        }
    },
    {
        command: 'skills',
        color: 'success',
        validator: null,
        help: 'show Ramin`s skills [ none ] ( Graphic And Code Skills )',
        action: (value = '') => {
            insertCommand(`🔥 Graphic Skills:
                -- Adobe Photoshop [90%]
                -- Adobe After Effects [90%]
                -- Adobe Premiere Pro [80%]
                -- Familiar with Adobe XD ( UI / UX )
                -- Familiar with AutoDesk 3Ds Max And Cinema 4D

                🔥 Programming Skills:
                ## Main
                -- CSS [90%]
                -- HTML [90%]
                -- PHP [70%]
                -- Python [50%]
                -- JavaScript [90%]

                ## Tools
                -- Git [80%]
                -- SASS [90%]
                -- TypeScript [70%]
                -- PWA (Progressive Web Apps) [90%]

                ## Frameworks And Library
                -- Vue [60%]
                -- Nest [60%]
                -- React [90%]
                -- Express [80%]
                -- Laravel [70%]
                -- Django [70%]

                ## I Familiar
                -- Web pack and Gulp Task Manager
                -- Working experience of database programming (MySQL)
            `,'warning')
        }
    },
    {
        command: 'contact',
        color: 'success',
        validator: null,
        help: 'show a way for connect to Ramin [ none ]',
        action: (value = '') => {
            insertCommand('<img class="terminal-pro-image" alt="Ramin Rezaei" src="./assets/images/Ramin.jpg" />')
            insertCommand(`📞 Ramin Rezaei
                -- Telegram: RaminR77
                -- Instagram: RaminR77
                -- Whatsapp: +989930600012
                -- PhoneNumber: +989136266179
                -- Email: Ramin.Rezaei77 [At] Gmail.com
                -- Address: Isfahan Or Tehran ( IRAN )
            `, 'info')
        }
    },
    {
        command: 'education',
        color: 'success',
        validator: null,
        help: 'show Ramin`s education info [ none ]',
        action: (value = '') => {
            insertCommand('Bachelor of software programming in Islamic Azad University of Najafabad', 'info')
        }
    },
    {
        command: 'experience',
        color: 'success',
        validator: null,
        help: 'show Ramin`s work expreience info [ none ]',
        action: (value = '') => {
            insertCommand(`🔥 Front-End Developer - Digikala (NOW)
            🔥 Head Of Front-End Team - Motosel ( Snapp Car Fix )
            `, 'info')
        }
    },
]