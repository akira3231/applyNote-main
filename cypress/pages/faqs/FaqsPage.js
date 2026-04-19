const BaseTablePage = require("../common/BaseTablePage");

class FaqsPage extends BaseTablePage {
  get addFaqBtn() {
    return cy.contains("button", "Add FAQ");
  }

  visit() {
    const base = Cypress.env("BASE_URL");
    cy.visit(`${base}/faqs`);
    this.waitForTable();
  }

  clickAddFaq() {
    this.addFaqBtn.click();
  }

  editFirstFaq() {
    this.editFirstRow();
  }

  openDeleteForFaq() {
    this.deleteFirstRow();
  }
}

module.exports = FaqsPage;
