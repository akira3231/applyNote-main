const BaseTablePage = require("../../common/BaseTablePage");
const UnitFilter = require("../global/filters/unitFiltersPages.js");

class BranchesPage extends BaseTablePage {
  constructor() {
    super();
    this.filter = new UnitFilter();
  }
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

  openFilter() {
    cy.contains("button", "Filter").click();
  }

  applyFilter(filterData) {
    this.openFilter();
    this.filter.applyFilters(filterData);
    this.waitForTable();
  }

  resetFilters() {
    this.openFilter();
    this.filter.reset();
    this.filter.applyBtn.click();
    this.waitForTable();
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
