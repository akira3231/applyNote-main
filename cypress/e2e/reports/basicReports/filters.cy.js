const BasicReportsPage = require("../../../pages/reports/basicReports/BasicReportsPage");

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

  describe("Unit - Students Filters", () => {
    beforeEach(() => {
      cy.intercept("GET", "**/api/admin/reports/basic-student/**").as(
        "getPageLoad",
      );
      basicReportsPage.visit();
      basicReportsPage.navigateToUnitStudents();
      cy.wait("@getPageLoad");
    });

    it("should apply filters correctly for Unit - Students", () => {
      cy.intercept("GET", "**/api/admin/reports/basic-student/**").as(
        "afterFilter",
      );

      basicReportsPage.captureStudentCardValues().then((beforeCards) => {
        basicReportsPage.captureChartLegendValues().then((beforeCharts) => {
          const { country, school, counsellor, ...unitStudentsFilterData } =
            filterData;
          basicReportsPage.applyFilters(unitStudentsFilterData);
          cy.wait("@afterFilter");

          basicReportsPage.captureStudentCardValues().then((afterCards) => {
            expect(JSON.stringify(afterCards)).not.to.eq(
              JSON.stringify(beforeCards),
            );
          });
        });
      });
    });

    it("should reset filters and restore original values", () => {
      basicReportsPage.captureStudentCardValues().then((baselineCards) => {
        cy.intercept("GET", "**/api/admin/reports/basic-student/**").as(
          "afterFilter",
        );

        const { country, school, counsellor, ...unitStudentsFilterData } =
          filterData;
        basicReportsPage.applyFilters(unitStudentsFilterData);
        cy.wait("@afterFilter");

        basicReportsPage.reset();

        // Wait until a known baseline value reappears
        cy.contains(
          '[id$="-content-unit-students"] .text-h1',
          baselineCards["All Students"],
        ).should("exist");

        basicReportsPage.captureStudentCardValues().then((resetCards) => {
          expect(JSON.stringify(resetCards)).to.eq(
            JSON.stringify(baselineCards),
          );
        });
      });
    });
  });
});
