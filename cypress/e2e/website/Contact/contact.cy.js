const ContactPage = require('../../../pages/website/Contact/ContactPage');

describe('Website Contact Form', () => {
  const contactPage = new ContactPage();

  beforeEach(() => {
    cy.visit('https://applynote.com');
  });

  it('should fill contact form and send message', () => {
    cy.fixture('website/Contact/contact.fixture.json').then((contactData) => {
      contactPage.visitContactPage();
      contactPage.fillContactForm(contactData);
      contactPage.clickSendMessage();
      contactPage.verifySuccessMessage();
    });
  });
});