const BaseTablePage = require("../../../common/BaseTablePage");
const UnitFilter = require("../../global/filters/unitFiltersPages.js");

class PartnerAgentsPage extends BaseTablePage {
  constructor() {
    super();
    this.filter = new UnitFilter();
  }
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
}

module.exports = PartnerAgentsPage;
