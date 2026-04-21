const AuditLogsFiltersPage = require("../../pages/auditLogs/AuditLogsFiltersPages.js");
const AuditLogsPage = require("../../pages/auditLogs/AuditLogsPage.js");

describe("Audit Logs Test Suite", () => {
  const auditLogsFiltersPage = new AuditLogsFiltersPage();
  const auditLogsPage = new AuditLogsPage();

  let filterData;

  beforeEach(() => {
    cy.loginWithSession();
    cy.fixture("auditLogs/filters.json").then((data) => {
      filterData = data;
    });
    auditLogsPage.visit();
  });

  it("should apply filters correctly for Audit Logs", () => {
    cy.intercept("POST", "**api/admin/audit-logs/fetch-log/**").as(
      "getAuditLogs",
    );

    auditLogsPage.applyFilter(filterData);
    cy.wait("@getAuditLogs");

    cy.contains("button", "Filter").find("span.bg-blue-500").should("exist");

    cy.get(".flex.items-start.gap-4.py-4").should("have.length.at.least", 1);

    cy.get(".text-primary.font-medium")
      .filter(":visible")
      .then(($els) => {
        const names = [...$els].map((el) => el.innerText.trim());
        expect(names).to.include(filterData.user);
      });

    cy.get(".bg-tertiary\\/10 .text-h5")
      .filter(":visible")
      .then(($chips) => {
        const from = new Date(filterData.activityDate[0]);
        const to = new Date(filterData.activityDate[1]);
        [...$chips].forEach((chip) => {
          const date = new Date(chip.innerText.trim());
          expect(date).to.be.gte(from);
          expect(date).to.be.lte(to);
        });
      });
  });

  it("should reset filters for Audit Logs", () => {
    cy.intercept("POST", "**api/admin/audit-logs/fetch-log/**").as(
      "getAuditLogs",
    );

    auditLogsPage.applyFilter(filterData);
    cy.wait("@getAuditLogs");

    auditLogsPage.openFilter();
    auditLogsFiltersPage.reset(true);

    cy.get(".flex.items-start.gap-4.py-4").should("have.length.at.least", 1);
  });
});
