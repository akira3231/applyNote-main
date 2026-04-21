const BaseTablePage = require('../../common/BaseTablePage');

class AboutPage extends BaseTablePage {
  get aboutLink() {
    return cy.get(':nth-child(3) > .px-2');
  }

  visitAboutPage() {
    this.aboutLink.click();
  }

  scrollToBottom() {
    cy.scrollTo('bottom', { duration: 1000 });
  }

  verifyPageLoaded() {
    cy.document().should('have.property', 'readyState', 'complete');
    cy.get('body').should('be.visible');
  }

  verifyAllComponents() {
    // Verify main sections exist
    cy.get('main').should('exist');
    cy.get('header').should('exist');
    cy.get('footer').should('exist');
    
    // Verify content is visible
    cy.get('body').should('be.visible');
    cy.contains('About').should('exist');
  }
}

module.exports = AboutPage;