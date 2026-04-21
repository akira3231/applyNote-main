const AboutPage = require('../../../pages/website/About/aboutPage');

describe('Website About Page', () => {
  const aboutPage = new AboutPage();

  beforeEach(() => {
    cy.visit('https://applynote.com');
  });

  it('should_load_about_page_and_scroll_to_bottom', () => {
    aboutPage.visitAboutPage();
    aboutPage.verifyPageLoaded();
    aboutPage.verifyAllComponents();
    aboutPage.scrollToBottom();
  });
});