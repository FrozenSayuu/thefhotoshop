const contactForm = document.querySelector('#contact-form')
const KEYCODE = {
    ESC: 27
};
contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    contactForm.reset();
    const messageDiv = document.createElement('div')

    messageDiv.insertAdjacentHTML('afterbegin',
        `<h2>Tack för ditt meddelande. Vi återkopplar snarast</h2><button id='closeMsgDiv'>&times;</button>`
    );


    messageDiv.classList = 'messageDiv'
    document.querySelector('.overlay').classList.remove('hidden')

    document.querySelector('.contact-wrapper').appendChild(messageDiv)

    const overlay = document.querySelector('.overlay');
    document.querySelector('#closeMsgDiv').addEventListener('click', function () {
        if (!messageDiv.classList.contains('hidden')) {
            messageDiv.classList.add('hidden');
            overlay.classList.add('hidden');

        }
    });
    document.addEventListener("keydown", checkCloseDialog)

    function checkCloseDialog(press) {
        if (press.keyCode === KEYCODE.ESC) closeContactPopup();
    }

    function closeContactPopup() {
        if (!messageDiv.classList.contains('hidden')) {
            messageDiv.classList.add('hidden');
            overlay.classList.add('hidden');

        }
    }
})