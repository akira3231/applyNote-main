const BaseTablePage = require("../../common/BaseTablePage");

class HqUsersPage extends BaseTablePage {
  get addHqUserBtn() {
    return cy.contains("button", "Add User");
  }

  visit() {
    const base = Cypress.env("BASE_URL");
    cy.visit(`${base}/users/hq-users`);
    this.waitForTable();
  }

  clickAddHqUser() {
    this.addHqUserBtn.click();
  }

  editFirstHqUser() {
    this.editFirstRow();
  }

  openDeleteForHqUser() {
    this.deleteFirstRow();
  }
}

module.exports = HqUsersPage;
