const BaseTablePage = require("../../common/BaseTablePage");

class SubUnitUsersPage extends BaseTablePage {
  get addSubUnitUserBtn() {
    return cy.contains("button", "Add User");
  }

  visit() {
    const base = Cypress.env("BASE_URL");
    cy.visit(`${base}/users/sub-unit-users`);
    this.waitForTable();
  }

  clickAddSubUnitUser() {
    this.addSubUnitUserBtn.click();
  }

  editFirstSubUnitUser() {
    this.editFirstRow();
  }

  openDeleteForSubUnitUser() {
    this.deleteFirstRow();
  }
}

module.exports = SubUnitUsersPage;
