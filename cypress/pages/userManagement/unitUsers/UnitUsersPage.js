const BaseTablePage = require("../../common/BaseTablePage");

class UnitUsersPage extends BaseTablePage {
  get addUnitUserBtn() {
    return cy.contains("button", "Add User");
  }

  visit() {
    const base = Cypress.env("BASE_URL");
    cy.visit(`${base}/users/unit-users`);
    this.waitForTable();
  }

  clickAddUnitUser() {
    this.addUnitUserBtn.click();
  }

  editFirstUnitUser() {
    this.editFirstRow();
  }

  openDeleteForUnitUser() {
    this.deleteFirstRow();
  }
}

module.exports = UnitUsersPage;
