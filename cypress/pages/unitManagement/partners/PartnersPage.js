const BaseTablePage = require("../../common/BaseTablePage");
const UnitFilter = require("../global/filters/unitFiltersPages.js");

class PartnersPage extends BaseTablePage {
  constructor() {
    super();
    this.filter = new UnitFilter();
  }
  get addPartnerBtn() {
    return cy.contains("button", "Add Partner");
  }

  visit() {
    const base = Cypress.env("BASE_URL");
    cy.visit(`${base}/units/partners`);
    this.waitForTable();
  }

  clickAddPartner() {
    this.addPartnerBtn.click();
  }

  editFirstPartner() {
    this.editFirstRow();
  }

  openDeleteForPartner() {
    this.deleteFirstRow();
  }

  toggleStatus(name) {
    this.getRowByText(name).find('button[role="switch"]').click();
  }
}

module.exports = PartnersPage;
