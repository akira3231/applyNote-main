const SchoolsPage = require("../../../pages/unitManagement/schools/SchoolsPage.js");
const AddSchoolModalPage = require("../../../pages/unitManagement/schools/AddSchoolModalPage.js");
const EditSchoolModalPage = require("../../../pages/unitManagement/schools/EditSchoolModalPage.js");

describe("Schools - CRUD Operations", () => {
  let schoolsPage;
  let addSchoolModal;
  let editSchoolModal;

  beforeEach(() => {
    cy.loginWithSession();
    cy.fixture("/unitManagement/schools/crud.json").as("schoolData");
  });

  schoolsPage = new SchoolsPage();
  addSchoolModal = new AddSchoolModalPage();
  editSchoolModal = new EditSchoolModalPage();

  // Test suite: Read
  describe("Read Schools", () => {
    it("should fetch schools from API and display them correctly", () => {
      cy.intercept("POST", "**/api/admin/schools/**").as("getSchools");

      schoolsPage.visit();

      cy.wait("@getSchools").then((interception) => {
        const body = interception.response.body;

        const data = body.data || body.results || body.schools || [];

        const apiCount = body.count || data.length;

        schoolsPage.assertRecordState(apiCount);
      });
    });
  });

  // Test suite: Create
  describe("Create School", () => {
    it("should create a new school successfully", function () {
      const newSchool = this.schoolData.newSchool;
      cy.intercept("POST", "**/api/admin/schools/**").as("createSchool");

      schoolsPage.visit();
      schoolsPage.clickAddSchool();

      addSchoolModal.fillForm(this.schoolData.newSchool);
      addSchoolModal.submit();

      cy.wait("@createSchool")
        .its("response.statusCode")
        .should("be.oneOf", [200, 201, 202, 204]);

      cy.get("body").should("contain.text", this.schoolData.successMessage);

      schoolsPage.searchTable(newSchool.displayName);
      schoolsPage.assertExists(newSchool.displayName);
    });
  });

  // Test suite: Update
  describe("Update School", () => {
    it("should update first available school", function () {
      const updatedSchool = this.schoolData.updatedSchool;

      cy.intercept("PUT", "**/api/admin/schools/update/**").as("updateSchool");

      schoolsPage.visit();

      schoolsPage.editFirstRow();

      editSchoolModal.assertModalIsOpen();
      editSchoolModal.fillForm(updatedSchool);
      editSchoolModal.submit();

      cy.wait("@updateSchool")
        .its("response.statusCode")
        .should("be.oneOf", [200, 201, 202, 204]);
      cy.get("body").should("contain.text", this.schoolData.updateMessage);

      // Verify updated values in the list (basic check using display name)
      schoolsPage.searchTable(updatedSchool.displayName);
      schoolsPage.assertExists(updatedSchool.displayName);
    });
  });

  // Test suite: Delete
  describe("Delete School", () => {
    it("should delete a school successfully", function () {
      cy.intercept("DELETE", "**/api/admin/schools/**").as("deleteSchool");

      schoolsPage.visit();
      schoolsPage.deleteFirstRow();
      schoolsPage.assertDeleteModalVisible("School");

      schoolsPage.confirmDelete();

      cy.wait("@deleteSchool")
        .its("response.statusCode")
        .should("be.oneOf", [200, 201, 202, 204]);

      cy.get("body").should("contain.text", this.schoolData.deleteMessage);

      // schoolsPage.assertSchoolNotExists(schoolToDelete);
    });
  });
});
