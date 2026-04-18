const BaseTablePage = require("../../common/BaseTablePage");

class SupervisorUsersPage extends BaseTablePage {
  get addSupervisorUserBtn() {
    return cy.contains("button", "Add User");
  }

  visit() {
    const base = Cypress.env("BASE_URL");
    cy.visit(`${base}/users/supervisor-users`);
    this.waitForTable();
  }

  clickAddSupervisorUser() {
    this.addSupervisorUserBtn.click();
  }

  editFirstSupervisorUser() {
    this.editFirstRow();
  }

  openDeleteForSupervisorUser() {
    this.deleteFirstRow();
  }
}

module.exports = SupervisorUsersPage;
