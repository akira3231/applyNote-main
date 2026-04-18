const BranchesPage = require("../../../pages/unitManagement/branches/BranchesPage.js");
const AddBranchModalPage = require("../../../pages/unitManagement/branches/AddBranchModalPage.js");
const EditBranchModalPage = require("../../../pages/unitManagement/branches/EditBranchModalPage.js");

describe("Branches - CRUD Operations", () => {
  beforeEach(() => {
    cy.fixture("/unitManagement/branches/crud.json").as("branchData");
  });

  const branchesPage = new BranchesPage();
  const addBranchModal = new AddBranchModalPage();
  const editBranchModal = new EditBranchModalPage();

  // Test suite: Read
  describe("Read Branches", () => {
    it("should fetch branches from API and display them correctly", () => {
      cy.intercept("POST", "**/api/admin/branches/**").as("getBranches");

      branchesPage.visit();

      cy.wait("@getBranches").then((interception) => {
        const body = interception.response.body;

        const data = body.data || body.results || body.branches || [];

        const apiCount = body.count || data.length;

        branchesPage.assertRecordState(apiCount);
      });
    });
  });

  // Test suite: Create
  describe("Create Branch", () => {
    it("should create a new branch successfully", function () {
      const newBranch = this.branchData.newBranch;
      cy.intercept("POST", "**/api/admin/branches/**").as("createBranch");

      branchesPage.visit();
      branchesPage.clickAddBranch();

      addBranchModal.fillForm(this.branchData.newBranch);
      addBranchModal.submit();

      cy.wait("@createBranch").its("response.statusCode").should("eq", 200);

      cy.get("body").should("contain.text", this.branchData.successMessage);

      branchesPage.searchTable(newBranch.displayName);
      branchesPage.assertExists(newBranch.displayName);
    });
  });

  // Test suite: Update
  describe("Update Branch", () => {
    it("should update first available branch", function () {
      const updatedBranch = this.branchData.updatedBranch;

      cy.intercept("POST", "**/api/admin/branches/**").as("updateBranch");

      branchesPage.visit();

      branchesPage.editFirstRow();

      editBranchModal.assertModalIsOpen();
      editBranchModal.fillForm(updatedBranch);
      editBranchModal.submit();

      cy.wait("@updateBranch").its("response.statusCode").should("eq", 200);
      cy.get("body").should("contain.text", this.branchData.updateMessage);

      // Verify updated values in the list (basic check using display name)
      branchesPage.searchTable(updatedBranch.displayName);
      branchesPage.assertExists(updatedBranch.displayName);
    });
  });

  // // Test suite: Delete
  describe("Delete Branch", () => {
    it("should delete a branch successfully", function () {
      cy.intercept("DELETE", "**/api/admin/branches/**").as("deleteBranch");

      branchesPage.visit();
      branchesPage.deleteFirstRow();
      branchesPage.assertDeleteModalVisible("Branch");

      branchesPage.confirmDelete();

      cy.wait("@deleteBranch").its("response.statusCode").should("eq", 200);

      cy.get("body").should("contain.text", this.branchData.deleteMessage);

      // branchesPage.assertBranchNotExists(branchToDelete);
    });
  });
});
