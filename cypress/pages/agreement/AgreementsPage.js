const BaseTablePage = require("../common/BaseTablePage");

class AgreementsPage extends BaseTablePage {
  get addAgreementBtn() {
    return cy.contains("button", "Add Agreement");
  }

  visit() {
    const base = Cypress.env("BASE_URL");
    cy.visit(`${base}/agreements`);
    this.waitForTable();
  }

  clickAddAgreement() {
    this.addAgreementBtn.click();
  }

  editFirstAgreement() {
    this.editFirstRow();
  }

  openDeleteForAgreement() {
    this.deleteFirstRow();
  }
}

module.exports = AgreementsPage;
