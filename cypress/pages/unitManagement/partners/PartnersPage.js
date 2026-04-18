const BaseTablePage = require("../../common/BaseTablePage");

class PartnersPage extends BaseTablePage {
  get addPartnerBtn() {
    return cy.contains("button", "Add Partner");
  }

  visit() {
    const base = Cypress.env("BASE_URL");
    cy.visit(`${base}/units/partners`);
    this.waitForTable();
  }

  clickAddPartner() {
    this.addPartnerBtn.click();
  }

  editFirstPartner() {
    this.editFirstRow();
  }

  openDeleteForPartner() {
    this.deleteFirstRow();
  }

  toggleStatus(name) {
    this.getRowByText(name).find('button[role="switch"]').click();
  }
}

module.exports = PartnersPage;
