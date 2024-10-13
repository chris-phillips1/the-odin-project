import './styles.css';
import createHomeTab from './homeTab.js'

const contentDiv = document.querySelector('#content');
const homeDiv = createHomeTab();

contentDiv.appendChild(homeDiv);