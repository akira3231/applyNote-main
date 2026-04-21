const BaseTablePage = require('../../common/BaseTablePage');

class LegalPage extends BaseTablePage {
  get legalLink() {
    return cy.get(':nth-child(3) > .px-2');
  }

  get privacyPolicyLink() {
    return cy.get('[href="/privacy-policy"]');
  }

  visitLegalPage() {
    this.legalLink.click();
  }

  scrollToBottom() {
    cy.scrollTo('bottom', { duration: 1000 });
  }

  verifyPageLoaded() {
    cy.document().should('have.property', 'readyState', 'complete');
    cy.get('body').should('be.visible');
  }

  verifyAllComponents() {
    cy.get('main').should('exist');
    cy.get('header').should('exist');
    cy.get('footer').should('exist');
    cy.get('body').should('be.visible');
  }

  clickPrivacyPolicyLink() {
    this.privacyPolicyLink.should('be.visible').click();
  }

  verifyPrivacyPolicyText() {
    cy.contains('Privacy Policy').should('be.visible');
  }
}

module.exports = LegalPage;