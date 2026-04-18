const BaseTablePage = require("../../../common/BaseTablePage");

class PartnerAgentsPage extends BaseTablePage {
  get addPartnerAgentBtn() {
    return cy.contains("button", "Add Partner Agent");
  }

  visit(branchesPage) {
    branchesPage.visit();
    branchesPage.openFirstBranchPartnerAgents();
    this.waitForTable();
  }

  clickAddPartnerAgent() {
    this.addPartnerAgentBtn.click();
  }

  editFirstPartnerAgent() {
    this.editFirstRow();
  }

  deleteFirstPartnerAgent() {
    this.deleteFirstRow();
  }

  toggleStatus(name) {
    this.getRowByText(name)
      .find('button[role="switch"]')
      .click({ force: true });
  }
}

module.exports = PartnerAgentsPage;
