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

  openFirstBranchPartnerAgents() {
    this.waitForTable();

    cy.get("tbody tr")
      .first()
      .within(() => {
        cy.get('button[aria-haspopup="menu"]').click({ force: true });
      });

    cy.contains('[role="menuitem"]', /partner agents/i)
      .should("be.visible")
      .click({ force: true });

    cy.url().should("include", "/partner-agents");
  }
}

module.exports = BranchesPage;
