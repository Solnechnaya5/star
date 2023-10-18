const burgerOpener = document.querySelector('.burger-open');
const burgerForm = document.querySelector('.burger-form');

burgerOpener.addEventListener('click', () => {
    burgerForm.classList.toggle('show-burger');
    burgerOpener.classList.toggle('show-burger');
})