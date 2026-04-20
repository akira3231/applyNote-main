const BaseTablePage = require("../common/BaseTablePage");

class StudentPage extends BaseTablePage {
  get addStudentBtn() {
    return cy.contains("button", "Add Student");
  }

  visit() {
    const base = Cypress.env("BASE_URL");
    cy.visit(`${base}/students`);
    this.waitForTable();
  }

  clickAddStudent() {
    this.addStudentBtn.click();
  }

  editFirstStudent() {
    this.editFirstRow();
  }

  openDeleteForStudent() {
    this.deleteFirstRow();
  }
}

module.exports = StudentPage;