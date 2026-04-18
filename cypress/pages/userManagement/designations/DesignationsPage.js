const BaseTablePage = require("../../common/BaseTablePage");

class DesignationsPage extends BaseTablePage {
  get addDesignationBtn() {
    return cy.contains("button", "Add Designation");
  }

  visit() {
    const base = Cypress.env("BASE_URL");
    cy.visit(`${base}/users/designation`);
    this.waitForTable();
  }

  clickAddDesignation() {
    this.addDesignationBtn.click();
  }

  editFirstDesignation() {
    this.editFirstRow();
  }

  openDeleteForDesignation() {
    this.deleteFirstRow();
  }

}

module.exports = DesignationsPage;
