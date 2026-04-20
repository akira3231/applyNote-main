const BaseTablePage = require("../../common/BaseTablePage");

class InstitutionPage extends BaseTablePage {
  get addInstitutionBtn() {
    return cy.contains("button", "Add Institution");
  }

  visit() {
    const base = Cypress.env("BASE_URL");
    cy.visit(`${base}/courses/institutions`);
    this.waitForTable();
  }

  clickAddInstitution() {
    this.addInstitutionBtn.click();
  }

  editFirstInstitution() {
    this.editFirstRow();
  }

  openDeleteForInstitution() {
    this.deleteFirstRow();
  }
}

module.exports = InstitutionPage;