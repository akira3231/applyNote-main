const BaseTablePage = require("../../common/BaseTablePage");

class SchoolsPage extends BaseTablePage {
  get addSchoolBtn() {
    return cy.contains("button", "Add School");
  }

  visit() {
    const base = Cypress.env("BASE_URL");
    cy.visit(`${base}/units/schools`);
    this.waitForTable();
  }

  clickAddSchool() {
    this.addSchoolBtn.click();
  }

  editFirstSchool() {
    this.editFirstRow();
  }

  openDeleteForSchool() {
    this.deleteFirstRow();
  }

  toggleStatus(name) {
    this.getRowByText(name).find('button[role="switch"]').click();
  }
}

module.exports = SchoolsPage;
