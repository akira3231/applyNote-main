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
        const { country, school, ...unitCouncellorCommissionsFilterData } =
          filterData;
        basicReportsPage.applyFilters(unitCouncellorCommissionsFilterData);
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

        const { country, school, ...unitCouncellorCommissionsFilterData } =
          filterData;
        basicReportsPage.applyFilters(unitCouncellorCommissionsFilterData);

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

      basicReportsPage
        .captureStudentCardValues("unit-students")
        .then((beforeCards) => {
          basicReportsPage
            .captureChartLegendValues("unit-students")
            .then((beforeCharts) => {
              const { country, school, counsellor, ...unitStudentsFilterData } =
                filterData;
              basicReportsPage.applyFilters(unitStudentsFilterData);
              cy.wait("@afterFilter");

              basicReportsPage
                .captureStudentCardValues("unit-students")
                .then((afterCards) => {
                  expect(JSON.stringify(afterCards)).not.to.eq(
                    JSON.stringify(beforeCards),
                  );
                });
            });
        });
    });

    it("should reset filters and restore original values", () => {
      basicReportsPage
        .captureStudentCardValues("unit-students")
        .then((baselineCards) => {
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

          basicReportsPage
            .captureStudentCardValues("unit-students")
            .then((resetCards) => {
              expect(JSON.stringify(resetCards)).to.eq(
                JSON.stringify(baselineCards),
              );
            });
        });
    });
  });

  describe("Unit Counsellor - Students Filters", () => {
    beforeEach(() => {
      cy.intercept("GET", "**/api/admin/reports/basic-student/**").as(
        "getPageLoad",
      );
      basicReportsPage.visit();
      basicReportsPage.navigateToUnitCounsellorStudents();
      cy.wait("@getPageLoad");
    });

    it("should apply filters correctly for Unit Counsellor - Students", () => {
      cy.intercept("GET", "**/api/admin/reports/basic-student/**").as(
        "afterFilter",
      );

      basicReportsPage
        .captureStudentCardValues("unit-counsellor-students")
        .then((beforeCards) => {
          basicReportsPage
            .captureChartLegendValues("unit-counsellor-students")
            .then((beforeCharts) => {
              const { country, school, ...unitCounsellorStudentsFilterData } =
                filterData;
              basicReportsPage.applyFilters(unitCounsellorStudentsFilterData);
              cy.wait("@afterFilter");

              basicReportsPage
                .captureStudentCardValues("unit-counsellor-students")
                .then((afterCards) => {
                  expect(JSON.stringify(afterCards)).not.to.eq(
                    JSON.stringify(beforeCards),
                  );
                });
            });
        });
    });

    it("should reset filters and restore original values", () => {
      basicReportsPage
        .captureStudentCardValues("unit-counsellor-students")
        .then((baselineCards) => {
          cy.intercept("GET", "**/api/admin/reports/basic-student/**").as(
            "afterFilter",
          );

          const { country, school, ...unitCounsellorStudentsFilterData } =
            filterData;
          basicReportsPage.applyFilters(unitCounsellorStudentsFilterData);
          cy.wait("@afterFilter");

          basicReportsPage.reset();

          // Wait until a known baseline value reappears
          cy.contains(
            '[id$="-content-unit-counsellor-students"] .text-h1',
            baselineCards["All Students"],
          ).should("exist");

          basicReportsPage
            .captureStudentCardValues("unit-counsellor-students")
            .then((resetCards) => {
              expect(JSON.stringify(resetCards)).to.eq(
                JSON.stringify(baselineCards),
              );
            });
        });
    });
  });

  describe("Report based on Schools Filters", () => {
    beforeEach(() => {
      cy.intercept("GET", "**/api/admin/reports/basic-student/**").as(
        "getPageLoad",
      );
      basicReportsPage.visit();
      basicReportsPage.navigateToReportBasedOnSchools();
      cy.wait("@getPageLoad");
    });

    it("should apply filters correctly for Report based on Schools", () => {
      basicReportsPage
        .captureStudentCardValues("report-based-on-schools")
        .then((beforeCards) => {
          cy.intercept("GET", "**/api/admin/reports/basic-student/**").as(
            "afterFilter",
          );
          const { counsellor, ...reportSchoolsFilterData } = filterData;
          basicReportsPage.applyFilters(reportSchoolsFilterData);
          cy.wait("@afterFilter");

          basicReportsPage
            .captureStudentCardValues("report-based-on-schools")
            .then((afterCards) => {
              expect(JSON.stringify(afterCards)).not.to.eq(
                JSON.stringify(beforeCards),
              );
            });
        });
    });

    it("should reset filters and restore original values", () => {
      basicReportsPage
        .captureStudentCardValues("report-based-on-schools")
        .then((baselineCards) => {
          cy.intercept("GET", "**/api/admin/reports/basic-student/**").as(
            "afterFilter",
          );
          const { counsellor, ...reportSchoolsFilterData } = filterData;
          basicReportsPage.applyFilters(reportSchoolsFilterData);
          cy.wait("@afterFilter");

          basicReportsPage.reset();

          cy.contains(
            '[id$="-content-report-based-on-schools"] .text-h1',
            baselineCards["Visa Grant Commencement"],
          ).should("exist");

          basicReportsPage
            .captureStudentCardValues("report-based-on-schools")
            .then((resetCards) => {
              expect(JSON.stringify(resetCards)).to.eq(
                JSON.stringify(baselineCards),
              );
            });
        });
    });
  });
});
