const closeModal = document.querySelector('.js-modal')
const closeModalContainer = document.querySelector('.js-terminal')
const closeModalBtns = document.querySelectorAll('.js-close-modal')
const closeTerminalBtn = document.querySelector('.js-close-terminal')
const closeModalHandler = document.querySelector('.js-close-modal-handler')
// modal events
closeTerminalBtn.addEventListener('click', () => window.close())
closeModalBtns.forEach(btn => btn.addEventListener('click', () => {
    closeModal.classList.add('hidden')
    closeModalContainer.classList.remove('disabled')
}))
closeModalHandler.addEventListener('click', () => {
    closeModal.classList.remove('hidden')
    closeModalContainer.classList.add('disabled')
})


window.addEventListener('keydown', event => {
    if(event.keyCode === 27 || event.key === 'Escape'){
        closeModal.classList.toggle('hidden')
        closeModalContainer.classList.toggle('disabled')    
    }
}, true)