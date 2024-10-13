import './styles.css';
import createHomeTab from './homeTab.js';
import createMenuTab from './menuTab.js';

const contentDiv = document.querySelector('#content');
const menuDiv = createMenuTab();

contentDiv.appendChild(menuDiv);