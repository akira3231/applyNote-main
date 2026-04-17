import BranchesPage from "../../../pages/unitManagement/branches/BranchesPage.js";
import AddBranchModalPage from "../../../pages/unitManagement/branches/AddBranchModalPage.js";
import EditBranchModalPage from "../../../pages/unitManagement/branches/EditBranchModalPage.js";

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

        branchesPage.assertRecordCount(apiCount);
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

      branchesPage.search(newBranch.displayName);
      branchesPage.assertBranchExists(newBranch.displayName);
    });
  });

  // Test suite: Update
  describe("Update Branch", () => {
    it("should update first available branch", function () {
      const updatedBranch = this.branchData.updatedBranch;

      cy.intercept("POST", "**/api/admin/branches/**").as("updateBranch");

      branchesPage.visit();

      branchesPage.editFirstBranch();

      editBranchModal.assertModalIsOpen();
      editBranchModal.fillForm(updatedBranch);
      editBranchModal.submit();

      cy.wait("@updateBranch").its("response.statusCode").should("eq", 200);
      cy.get("body").should("contain.text", this.branchData.updateMessage);

      // Verify updated values in the list (basic check using display name)
      branchesPage.search(updatedBranch.displayName);
      branchesPage.assertBranchExists(updatedBranch.displayName);
    });
  });
  // // Test suite: Delete
  // describe("Delete Branch", () => {
  //   it("should delete a branch successfully", () => {
  //     // Visit branches page
  //     branchesPage.visit();

  //     // Select the branch to delete
  //     const branchToDelete = cy
  //       .wrap("@branchData")
  //       .invoke("get", "newBranch").displayName;
  //     branchesPage.getRowByDisplayName(branchToDelete).then(($row) => {
  //       if ($row.length) {
  //         branchesPage.openActionMenu(branchToDelete);

  //         // Verify success message
  //         cy.contains(
  //           "div.toast-container",
  //           branchesPage.assertions.deleteMessage,
  //         ).should("be.visible");

  //         // Verify branch no longer exists
  //         branchesPage.assertBranchNotExists(branchToDelete);
  //       }
  //     });
  //   });
  // });
});
