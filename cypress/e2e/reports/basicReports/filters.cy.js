const BasicReportsPage = require("../../../pages/reports/basicReports/BaiscReportsPage");

describe("Basic Reports Filters Test Suite", () => {
  const basicReportsPage = new BasicReportsPage();

  let filterData;

  beforeEach(() => {
    cy.loginWithSession();
    cy.fixture("/reports/basicReports/filters.json").then((data) => {
      filterData = data;
    });
    basicReportsPage.visit();
  });

  describe("Unit Commissions Filters", () => {
    beforeEach(() => {
      cy.fixture("reports/basicReports/unitCommissionsFilters.json").then(
        (data) => {
          filterData = data;
        },
      );
      cy.intercept("GET", "**/api/admin/reports/basic/**").as("getPageLoad");
      basicReportsPage.visit();
      cy.wait("@getPageLoad");
    });

    it("should apply filters correctly for Unit Commissions", () => {
      cy.intercept("GET", "**/api/admin/reports/basic/**").as(
        "getUnitCommissions",
      );

      basicReportsPage.captureCardValues().then((beforeValues) => {
        basicReportsPage.applyFilters(filterData);
        cy.wait("@getUnitCommissions");

        basicReportsPage.captureCardValues().then((afterValues) => {
          expect(JSON.stringify(afterValues)).not.to.eq(
            JSON.stringify(beforeValues),
          );
        });
      });
    });

    it("should reset filters and restore original values", () => {
      basicReportsPage.captureCardValues().then((baselineValues) => {
        cy.intercept("GET", "**/api/admin/reports/basic/**").as("afterFilter");
        basicReportsPage.applyFilters(filterData);
        cy.wait("@afterFilter");

        basicReportsPage.captureCardValues().then((filteredValues) => {
          basicReportsPage.reset();

          cy.contains(
            ".font-medium",
            baselineValues["HQ Commission"]["Total Commission Expected"],
          ).should("exist");

          basicReportsPage.captureCardValues().then((resetValues) => {
            expect(JSON.stringify(resetValues)).to.eq(
              JSON.stringify(baselineValues),
            );
          });
        });
      });
    });
  });

  describe("Unit Counsellor - Commissions Filters", () => {
    beforeEach(() => {
      cy.intercept("GET", "**/api/admin/reports/basic/**").as("getPageLoad");
      basicReportsPage.visit();
      basicReportsPage.navigateToUnitCounsellorCommissions();
      cy.wait("@getPageLoad");
    });

    it("should apply filters correctly for Unit Counsellor - Commissions", () => {
      cy.intercept("GET", "**/api/admin/reports/basic/**").as(
        "getUnitCommissions",
      );

      basicReportsPage.captureCardValues().then((beforeValues) => {
        const { country, school, ...unitCouncellorFilterData } = filterData;
        basicReportsPage.applyFilters(unitCouncellorFilterData);
        cy.wait("@getUnitCommissions");

        basicReportsPage.captureCardValues().then((afterValues) => {
          expect(JSON.stringify(afterValues)).not.to.eq(
            JSON.stringify(beforeValues),
          );
        });
      });
    });

    it("should reset filters and restore original values", () => {
      basicReportsPage.captureCardValues().then((baselineValues) => {
        cy.intercept("GET", "**/api/admin/reports/basic/**").as("afterFilter");

        const { country, school, ...unitCouncellorFilterData } = filterData;
        basicReportsPage.applyFilters(unitCouncellorFilterData);

        cy.wait("@afterFilter");

        basicReportsPage.captureCardValues().then((filteredValues) => {
          basicReportsPage.reset();

          cy.contains(
            ".font-medium",
            baselineValues["HQ Commission"]["Total Commission Expected"],
          ).should("exist");

          basicReportsPage.captureCardValues().then((resetValues) => {
            expect(JSON.stringify(resetValues)).to.eq(
              JSON.stringify(baselineValues),
            );
          });
        });
      });
    });
  });
});
