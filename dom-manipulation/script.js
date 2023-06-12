const container = document.querySelector('#container');

const redText = document.createElement('p');
redText.textContent = 'Hey I\'m red!';
redText.setAttribute('style', 'color: #f00');
container.appendChild(redText);

const blueHeading = document.createElement('h3');
blueHeading.textContent = 'I\'m a blue h3!';
blueHeading.setAttribute('style', 'color: #00f');
container.appendChild(blueHeading);

const parentDiv = document.createElement('div');
parentDiv.setAttribute('style', 'border: solid black; background-color: pink');

const primaryHeading = document.createElement('h1');
primaryHeading.textContent = 'I\'m in a div';
parentDiv.appendChild(primaryHeading);

const para = document.createElement('p');
para.textContent = 'Me too!';
parentDiv.appendChild(para);

container.appendChild(parentDiv);

const btn = document.querySelector('#btn');
btn.addEventListener('click', function (e) {
    e.target.style.background = 'blue';
  });