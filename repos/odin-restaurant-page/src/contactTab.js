export default function createTab() {
    const contactDiv = document.createElement('div');
    contactDiv.id = 'contactTab';

    const heading = document.createElement('h2');
    heading.innerText = 'Contact Us';

    const subHeading = document.createElement('h3');
    subHeading.innerText = 'Give us a call, send us an email, or shoot us a text!';

    const phoneNumber = document.createElement('p');
    phoneNumber.innerText = '(123) 456-7890';

    const emailAddress = document.createElement('p');
    emailAddress.innerText = 'test@example.com';

    contactDiv.appendChild(heading);
    contactDiv.appendChild(subHeading);
    contactDiv.appendChild(phoneNumber);
    contactDiv.appendChild(emailAddress);

    return contactDiv;
}