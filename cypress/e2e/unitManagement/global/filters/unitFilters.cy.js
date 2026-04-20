const BranchesPage = require("../../../../pages/unitManagement/branches/BranchesPage.js");
const UnitFiltersPage = require("../../../../pages/unitManagement/global/filters/unitFiltersPages.js");

describe("Unit Filters Test Suite", () => {
  const branchesPage = new BranchesPage();
  const unitFiltersPage = new UnitFiltersPage();
  let filterData;

  describe("Branch Filters", () => {
    beforeEach(() => {
      cy.loginWithSession();
      branchesPage.visit();
      cy.fixture("unitManagement/global/filters/unitFilters.json").then(
        (data) => {
          filterData = data;
        },
      );
    });

    it("should apply filters correctly for Branch", () => {
      cy.intercept("POST", "**api/admin/branches/**").as("getBranches");

      branchesPage.applyFilter(filterData);

      cy.wait("@getBranches");

      cy.get("tbody tr").should("have.length.at.least", 1);

      cy.get('[role="switch"][aria-checked="false"]').should("not.exist");
    });

    it("should reset filters for Branch", () => {
      cy.intercept("POST", "**/api/admin/branches/**").as("getBranches");

      branchesPage.applyFilter(filterData);

      cy.wait("@getBranches");

      branchesPage.openFilter();
      unitFiltersPage.reset(true);

      cy.get("tbody tr").should("have.length.at.least", 1);
    });
  });
});
