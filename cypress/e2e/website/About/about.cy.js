const AboutPage = require('../../../pages/website/About/aboutPage');

describe('Website About Page', () => {
  const aboutPage = new AboutPage();

  beforeEach(() => {
    cy.visit('https://applynote.com');
  });

  it('should load about page and scroll to bottom', () => {
    aboutPage.visitAboutPage();
    aboutPage.verifyPageLoaded();
    aboutPage.verifyAllComponents();
    aboutPage.scrollToBottom();
  });
});