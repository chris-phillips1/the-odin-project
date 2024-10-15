import './styles.css';
import createHomeTab from './homeTab.js';
import createMenuTab from './menuTab.js';
import createContactTab from './contactTab.js';

const contentDiv = document.querySelector('#content');
const homeButton = document.querySelector('#homeButton');
const menuButton = document.querySelector('#menuButton');
const contactButton = document.querySelector('#contactButton');

clearContentDiv();
const homeTab = createHomeTab();
contentDiv.appendChild(homeTab);

homeButton.addEventListener('click', () => {
    clearContentDiv();
    const homeTab = createHomeTab();
    contentDiv.appendChild(homeTab);
});

menuButton.addEventListener('click', () => {
    clearContentDiv();
    const menuTab = createMenuTab();
    contentDiv.appendChild(menuTab);
});

contactButton.addEventListener('click', () => {
    clearContentDiv();
    const contactTab = createContactTab();
    contentDiv.appendChild(contactTab);
});


function clearContentDiv() {
    contentDiv.removeChild(contentDiv.firstChild);
}