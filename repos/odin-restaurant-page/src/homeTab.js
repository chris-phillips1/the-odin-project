import coffeeImage from './assets/coffee.jpeg';

export default function createTab() {
    const homeDiv = document.createElement('div');
    homeDiv.id = 'homeTab';

    const mainImg = document.createElement('img');
    mainImg.src = coffeeImage;
    mainImg.alt = 'A bed of coffee beans with a fresh cup of coffee on top.';

    const header = document.createElement('h2');
    header.innerText = 'A PLACE WHERE COFFEE NERDS FEEL AT HOME';

    const description = document.createElement('p');
    description.innerText =
        'Join us to discover the wonders of the modern day coffee bean.' +
        'Through a meticulus process of curation, roasting, and production,' +
        'we\'re confident you\'ll find the best espresso in town at Chris\' Coffee Cove!';

    homeDiv.appendChild(mainImg);
    homeDiv.appendChild(header);
    homeDiv.appendChild(description);

    return homeDiv;
}