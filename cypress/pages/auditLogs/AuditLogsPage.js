const BaseTablePage = require("../common/BaseTablePage");
const AuditLogsFilter = require("../auditLogs/AuditLogsFiltersPages");

class AuditLogsPage extends BaseTablePage {
  constructor() {
    super();
    this.filter = new AuditLogsFilter();
  }

  visit() {
    const base = Cypress.env("BASE_URL");
    cy.visit(`${base}/audit`);
  }
}

module.exports = AuditLogsPage;
