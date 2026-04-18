const DesignationsPage = require("../../../pages/userManagement/designations/DesignationsPage.js");
const AddDesignationsModalPage = require("../../../pages/userManagement/designations/AddDesignationsModalPage.js");
const EditDesignationsModalPage = require("../../../pages/userManagement/designations/EditDesignationsModalPage.js");

describe("Designations - CRUD Operations", () => {
  let designationsPage;
  let addDesignationModal;
  let editDesignationModal;

  beforeEach(() => {
    cy.fixture("/userManagement/designations/crud.json").as("designationData");
    designationsPage = new DesignationsPage();
    addDesignationModal = new AddDesignationsModalPage();
    editDesignationModal = new EditDesignationsModalPage();
  });

  // Test suite: Read
  describe("Read Designations", () => {
    it("should fetch designations from API and display them correctly", () => {
      cy.intercept("POST", "**/api/admin/designations/**").as(
        "getDesignations",
      );

      designationsPage.visit();

      cy.wait("@getDesignations").then((interception) => {
        const body = interception.response.body;
        const data = body.data || body.results || body.designations || [];
        const apiCount = body.count || data.length;

        designationsPage.assertRecordState(apiCount);
      });
    });
  });

  // Test suite: Create
  describe("Create Designation", () => {
    it("should create a new designation successfully", function () {
      const newDesignation = {
        ...this.designationData.newDesignation,
        name: `${this.designationData.newDesignation.name} ${Date.now()}`,
      };

      cy.intercept("POST", "**/api/admin/designations/**").as(
        "createDesignation",
      );

      designationsPage.visit();
      designationsPage.clickAddDesignation();

      addDesignationModal.assertModalIsOpen();
      addDesignationModal.fillForm(newDesignation);

      addDesignationModal.submit();

      cy.wait("@createDesignation")
        .its("response.statusCode")
        .should("eq", 200);
      cy.get("body").should(
        "contain.text",
        this.designationData.successMessage,
      );

      designationsPage.searchTable(newDesignation.name);
      designationsPage.assertExists(newDesignation.name);
    });
  });

  // Test suite: Update
  describe("Update Designation", () => {
    it("should update first available designation", function () {
      const updatedDesignation = {
        ...this.designationData.updatedDesignation,
        name: `${this.designationData.updatedDesignation.name} ${Date.now()}`,
      };

      cy.intercept("PUT", "**/api/admin/designations/update/**").as(
        "updateDesignation",
      );

      designationsPage.visit();
      designationsPage.editFirstRow();

      editDesignationModal.assertModalIsOpen();
      editDesignationModal.fillForm(updatedDesignation);
      editDesignationModal.submit();

      cy.wait("@updateDesignation")
        .its("response.statusCode")
        .should("eq", 200);
      cy.get("body").should("contain.text", this.designationData.updateMessage);

      designationsPage.searchTable(updatedDesignation.name);
      designationsPage.assertExists(updatedDesignation.name);
    });
  });

  // Test suite: Delete
  describe("Delete Designation", () => {
    it("should delete a designation successfully", function () {
      cy.intercept("DELETE", "**/api/admin/designations/**").as(
        "deleteDesignation",
      );

      designationsPage.visit();
      designationsPage.deleteFirstRow();
      designationsPage.assertDeleteModalVisible("Designation");

      designationsPage.confirmDelete();

      cy.wait("@deleteDesignation")
        .its("response.statusCode")
        .should("eq", 200);
      cy.get("body").should("contain.text", this.designationData.deleteMessage);
    });
  });
});
