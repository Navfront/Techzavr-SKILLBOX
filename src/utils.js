/* eslint-disable */
export function showAlert(message) {
  alert(message);
}

export function showTrueLogo() {
  window.addEventListener('DOMContentLoaded', () => {
    const logoLink = document.querySelector('.header__logo');
    const label = document.createElement('span')
    label.style = `position: absolute;
    left: 24.2%;
    top: 20%;
    font-size: 18px;
    color: #A8FF00;
    background-color: grey;
    transform: rotate(5deg);
    `
    label.textContent = 'ЛАПШЕ'
    logoLink.style = "position: relative;"
    logoLink.children[0].before(label)
 })

}
