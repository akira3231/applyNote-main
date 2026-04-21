const UnitFiltersPage = require("../../../../pages/unitManagement/global/filters/unitFiltersPages.js");
const BranchesPage = require("../../../../pages/unitManagement/branches/BranchesPage.js");
const PartnerAgentsPage = require("../../../../pages/unitManagement/branches/partnerAgents/PartnerAgentsPage.js");

describe("Unit Filters Test Suite", () => {
  const unitFiltersPage = new UnitFiltersPage();
  const branchesPage = new BranchesPage();
  const partnerAgentsPage = new PartnerAgentsPage();

  let filterData;

  beforeEach(() => {
    cy.loginWithSession();
    cy.fixture("unitManagement/global/filters/unitFilters.json").then(
      (data) => {
        filterData = data;
      },
    );
  });

  describe("Branch Filters", () => {
    beforeEach(() => {
      branchesPage.visit();
    });

    it("should apply filters correctly for Branch", () => {
      cy.intercept("POST", "**api/admin/branches/**").as("getBranches");

      const { country, ...branchFilterData } = filterData;

      branchesPage.applyFilter(branchFilterData);
      cy.wait("@getBranches");

      cy.get("tbody tr").should("have.length.at.least", 1);

      cy.get('[role="switch"][aria-checked="false"]').should("not.exist");
      cy.get("thead th").then(($headers) => {
        const countryIndex = [...$headers].findIndex(($th) =>
          $th.innerText.trim().toLowerCase().includes("country"),
        );

        cy.get("tbody tr").each(($row) => {
          cy.wrap($row).find("td").eq(countryIndex).invoke("text");
        });
      });
    });

    it("should reset filters for Branch", () => {
      cy.intercept("POST", "**/api/admin/branches/**").as("getBranches");

      const { country, ...branchFilterData } = filterData;

      branchesPage.applyFilter(branchFilterData);

      cy.wait("@getBranches");

      branchesPage.openFilter();
      unitFiltersPage.reset(true);

      cy.get("tbody tr").should("have.length.at.least", 1);
    });
  });

  describe("Partner Agents Filters", () => {
    beforeEach(() => {
      branchesPage.visit();
      branchesPage.openFirstBranchPartnerAgents();
    });

    it("should apply filters correctly for Partner Agents", () => {
      cy.intercept("POST", "**api/admin/branches/sub/**").as(
        "getPartnerAgents",
      );

      partnerAgentsPage.applyFilter(filterData);
      cy.wait("@getPartnerAgents");

      cy.get("tbody tr").should("have.length.at.least", 1);

      cy.get('[role="switch"][aria-checked="false"]').should("not.exist");
      cy.get("thead th").then(($headers) => {
        const countryIndex = [...$headers].findIndex(($th) =>
          $th.innerText.trim().toLowerCase().includes("country"),
        );

        cy.get("tbody tr").each(($row) => {
          cy.wrap($row).find("td").eq(countryIndex).invoke("text");
        });
      });
    });

    it("should reset filters for Partner Agents", () => {
      cy.intercept("POST", "**api/admin/branches/sub/**").as(
        "getPartnerAgents",
      );

      partnerAgentsPage.applyFilter(filterData);
      cy.wait("@getPartnerAgents");

      partnerAgentsPage.openFilter();
      unitFiltersPage.reset(true);

      cy.get("tbody tr").should("have.length.at.least", 1);
    });
  });
});
