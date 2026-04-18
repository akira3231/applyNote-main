const BaseTablePage = require("../../common/BaseTablePage");

class BranchesPage extends BaseTablePage {
  get addBranchBtn() {
    return cy.contains("button", "Add Branch");
  }

  visit() {
    const base = Cypress.env("BASE_URL");
    cy.visit(`${base}/units/branches`);
    this.waitForTable();
  }

  clickAddBranch() {
    this.addBranchBtn.click();
  }

  editFirstBranch() {
    this.editFirstRow();
  }

  openDeleteForBranch() {
    this.deleteFirstRow();
  }

  toggleStatus(name) {
    this.getRowByText(name).find('button[role="switch"]').click();
  }
}

module.exports = BranchesPage;
