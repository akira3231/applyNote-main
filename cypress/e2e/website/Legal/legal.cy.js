const LegalPage = require('../../../pages/website/Legal/legalPage');

describe('Website Legal Page', () => {
  const legalPage = new LegalPage();

  beforeEach(() => {
    cy.visit('https://applynote.com');
  });

  it('should load legal page scroll and find privacy policy', () => {
    legalPage.visitLegalPage();
    legalPage.verifyPageLoaded();
    legalPage.verifyAllComponents();
    legalPage.scrollToBottom();
    legalPage.clickPrivacyPolicyLink();
    legalPage.verifyPrivacyPolicyText();
  });
});