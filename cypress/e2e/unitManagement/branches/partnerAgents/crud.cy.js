const PartnerAgentsPage = require("../../../../pages/unitManagement/branches/partnerAgents/partnerAgentsPage.js");
const AddPartnerAgentsModalPage = require("../../../../pages/unitManagement/branches/partnerAgents/AddPartnerAgentModalPage.js");
const EditPartnerAgentsModalPage = require("../../../../pages/unitManagement/branches/partnerAgents/EditPartnerAgentModalPage.js");
const BranchesPage = require("../../../../pages/unitManagement/branches/BranchesPage.js");

describe("Partner Agents - CRUD Operations", () => {
  let partnerAgentsPage;
  let addPartnerAgentsModal;
  let editPartnerAgentsModal;
  let branchesPage;
  beforeEach(() => {
    cy.loginWithSession();
    cy.fixture("/unitManagement/branches/partnerAgents/crud.json").as(
      "partnerAgentData",
    );
  });

  partnerAgentsPage = new PartnerAgentsPage();
  addPartnerAgentsModal = new AddPartnerAgentsModalPage();
  editPartnerAgentsModal = new EditPartnerAgentsModalPage();
  branchesPage = new BranchesPage();

  // Test suite: Read
  describe("Read Partner Agents", () => {
    it("should fetch partner agents from API and display them correctly", () => {
      cy.intercept("POST", "**/api/admin/branches/sub/**").as(
        "getPartnerAgents",
      );

      branchesPage.visit();
      branchesPage.openFirstBranchPartnerAgents();

      cy.wait("@getPartnerAgents").then((interception) => {
        const body = interception.response.body;

        const data = body.data || body.results || body.branches || [];

        const apiCount = body.count || data.length;

        partnerAgentsPage.assertRecordState(apiCount);
      });
    });
  });

  // Test suite: Create
  describe("Create Partner Agent", () => {
    it("should create a new partner agent successfully", function () {
      const newPartnerAgent = this.partnerAgentData.newPartnerAgent;
      cy.intercept("POST", "**/api/admin/branches/sub/store/**").as(
        "createPartnerAgent",
      );
      branchesPage.visit();
      branchesPage.openFirstBranchPartnerAgents();

      partnerAgentsPage.waitForTable();

      partnerAgentsPage.clickAddPartnerAgent();
      addPartnerAgentsModal.fillForm(this.partnerAgentData.newPartnerAgent);
      addPartnerAgentsModal.submit();

      cy.wait("@createPartnerAgent")
        .its("response.statusCode")
        .should("eq", 201);

      cy.get("body").should(
        "contain.text",
        this.partnerAgentData.successMessage,
      );

      partnerAgentsPage.searchTable(newPartnerAgent.displayName);
      partnerAgentsPage.assertExists(newPartnerAgent.displayName);
    });
  });

  // Test suite: Update
  describe("Update Partner Agent", () => {
    it("should update first available partner agent", function () {
      const updatedPartnerAgent = this.partnerAgentData.updatedPartnerAgent;

      cy.intercept("PUT", "**/api/admin/branches/sub/update/**").as(
        "updatePartnerAgent",
      );

      branchesPage.visit();
      branchesPage.openFirstBranchPartnerAgents();

      partnerAgentsPage.waitForTable();
      partnerAgentsPage.editFirstPartnerAgent();
      editPartnerAgentsModal.assertModalIsOpen();
      editPartnerAgentsModal.fillForm(updatedPartnerAgent);
      editPartnerAgentsModal.submit();

      cy.wait("@updatePartnerAgent")
        .its("response.statusCode")
        .should("eq", 200);
      cy.get("body").should(
        "contain.text",
        this.partnerAgentData.updateMessage,
      );

      // Verify updated values in the list (basic check using display name)
      partnerAgentsPage.searchTable(updatedPartnerAgent.displayName);
      partnerAgentsPage.assertExists(updatedPartnerAgent.displayName);
    });
  });

  // Test suite: Delete
  describe("Delete Partner Agent", () => {
    it("should delete a partner agent successfully", function () {
      cy.intercept("DELETE", "**/api/admin/branches/sub/delete/**").as(
        "deletePartnerAgent",
      );

      branchesPage.visit();
      branchesPage.openFirstBranchPartnerAgents();

      partnerAgentsPage.waitForTable();
      partnerAgentsPage.deleteFirstRow();
      partnerAgentsPage.assertDeleteModalVisible("Partner Agent");

      partnerAgentsPage.confirmDelete();

      cy.wait("@deletePartnerAgent")
        .its("response.statusCode")
        .should("eq", 200);

      cy.get("body").should(
        "contain.text",
        this.partnerAgentData.deleteMessage,
      );

      // partnerAgentsPage.assertPartnerAgentNotExists(partnerAgentToDelete);
    });
  });
});
