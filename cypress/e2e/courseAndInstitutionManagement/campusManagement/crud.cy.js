const CampusPage = require("../../../pages/courseAndInstitutionManagement/campusManagement/CampusPage.js");
const AddCampusModalPage = require("../../../pages/courseAndInstitutionManagement/campusManagement/AddCampusModalPage.js");
const EditCampusModalPage = require("../../../pages/courseAndInstitutionManagement/campusManagement/EditCampusModalPage.js");

describe("Campus - CRUD Operations", () => {
  let campusPage;
  let addCampusModal;
  let editCampusModal;

  beforeEach(() => {
    cy.loginWithSession();
    cy.fixture("courseAndInstitutionManagement/campusManagement/crud.json").as("campusData");
    campusPage = new CampusPage();
    addCampusModal = new AddCampusModalPage();
    editCampusModal = new EditCampusModalPage();
  });

  describe("Read Campus", () => {
    it("should fetch campuses from API and display them correctly", () => {
      campusPage.visit();
      cy.get("table").should("exist");
      cy.get("body").then(($body) => {
        const hasRows = $body.find("tbody tr").length > 0;
        if (hasRows) {
          cy.get("tbody tr").should("have.length.gt", 0);
        } else {
          cy.contains("No entries found").should("exist");
        }
      });
    });
  });

  describe("Create Campus", () => {
    it("should create a new campus successfully", function () {
      const newCampus = {
        ...this.campusData.newCampus,
        email: `qa.campus+${Date.now()}@applynote.com`,
      };

      campusPage.visit();
      campusPage.clickAddCampus();
      addCampusModal.assertModalIsOpen();
      addCampusModal.fillForm(newCampus);
      addCampusModal.submit();

      cy.get("body").should("contain.text", this.campusData.successMessage);
    });
  });

  describe("Update Campus", () => {
    it("should update first available campus", function () {
      const updatedCampus = { ...this.campusData.updatedCampus };

      campusPage.visit();
      campusPage.editFirstCampus(); 
      editCampusModal.assertModalIsOpen();
      editCampusModal.fillForm(updatedCampus);
      editCampusModal.submit();

      cy.get("body").should("contain.text", this.campusData.updateMessage);
    });
  });

  describe("Delete Campus", () => {
    it("should delete a campus successfully", function () {
      campusPage.visit();
      campusPage.openDeleteForCampus(); 
      campusPage.assertDeleteModalVisible("Campus");
      campusPage.confirmDelete();

      cy.get("body").should("contain.text", this.campusData.deleteMessage);
    });
  });
});