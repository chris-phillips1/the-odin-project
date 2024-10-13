export default function createTab() {
    const MENU_ITEMS = {
        'Espresso': 1,
        'Cortado': 2,
        'Cappuccino': 3,
        'Flat White': 4,
        'Latte': 5,
        'Scone': 6,
        'Muffin': 7
    }

    const menuDiv = document.createElement('div');
    menuDiv.id = 'menuTab';

    const menuTable = document.createElement('table');

    for (const bakeryItem in MENU_ITEMS) {
        const menuRow = document.createElement('tr');
        const menuItemName = document.createElement('td');
        const menuItemPrice = document.createElement('td');

        menuItemName.innerText = bakeryItem;
        menuItemPrice.innerText = '$' + MENU_ITEMS[bakeryItem];

        menuRow.appendChild(menuItemName);
        menuRow.appendChild(menuItemPrice);
        menuTable.appendChild(menuRow);
    }

    menuDiv.appendChild(menuTable);

    return menuDiv;
}