const InstitutionPage = require("../../../pages/courseAndInstitutionManagement/instituteManagement/InstitutionPage.js");
const AddInstitutionModalPage = require("../../../pages/courseAndInstitutionManagement/instituteManagement/AddInstitutionModalPage.js");
const EditInstitutionModalPage = require("../../../pages/courseAndInstitutionManagement/instituteManagement/EditInstitutionModalPage.js");

describe("Institution - CRUD Operations", () => {
  let institutionPage;
  let addInstitutionModal;
  let editInstitutionModal;

  beforeEach(() => {
    cy.loginWithSession();
    cy.fixture("courseAndInstitutionManagement/instituteManagement/crud.json").as("institutionData");
    institutionPage = new InstitutionPage();
    addInstitutionModal = new AddInstitutionModalPage();
    editInstitutionModal = new EditInstitutionModalPage();
  });

  describe("Read Institutions", () => {
    it("should fetch institutions from API and display them correctly", () => {
      cy.intercept("POST", "**/api/admin/institutions/**").as(
        "getInstitutions",
      );

      institutionPage.visit();

      cy.wait("@getInstitutions").then((interception) => {
        const body = interception.response.body;
        const data = body.data || body.results || body.institutions || [];
        const apiCount = body.count || data.length;
        institutionPage.assertRecordState(apiCount);
      });
    });
  });

  describe("Create Institution", () => {
    it("should create a new institution successfully", function () {
      const newInstitution = {
        ...this.institutionData.newInstitution,
        institutionCode: `INST-QA-${Date.now()}`,
        institutionName: `QA Test University ${Date.now()}`,
      };

      cy.intercept("POST", "**/api/admin/institutions/**").as(
        "createInstitution",
      );

      institutionPage.visit();
      institutionPage.clickAddInstitution();
      addInstitutionModal.assertModalIsOpen();
      addInstitutionModal.fillForm(newInstitution);
      addInstitutionModal.submit();

      cy.wait("@createInstitution")
        .its("response.statusCode")
        .should("eq", 200);
      cy.get("body").should(
        "contain.text",
        this.institutionData.successMessage,
      );

      institutionPage.searchTable(newInstitution.institutionName);
      institutionPage.assertExists(newInstitution.institutionName);
    });
  });

  describe("Update Institution", () => {
    it("should update first available institution", function () {
      const updatedInstitution = {
        ...this.institutionData.updatedInstitution,
      };

      cy.intercept("PUT", "**/api/admin/institutions/update/**").as(
        "updateInstitution",
      );

      institutionPage.visit();
      institutionPage.editFirstInstitution();
      editInstitutionModal.assertModalIsOpen();
      editInstitutionModal.fillForm(updatedInstitution);
      editInstitutionModal.submit();

      cy.wait("@updateInstitution")
        .its("response.statusCode")
        .should("eq", 200);
      cy.get("body").should(
        "contain.text",
        this.institutionData.updateMessage,
      );

      institutionPage.searchTable(updatedInstitution.institutionName);
      institutionPage.assertExists(updatedInstitution.institutionName);
    });
  });

  describe("Delete Institution", () => {
    it("should delete an institution successfully", function () {
      cy.intercept("DELETE", "**/api/admin/institutions/**").as(
        "deleteInstitution",
      );

      institutionPage.visit();
      institutionPage.openDeleteForInstitution();
      institutionPage.assertDeleteModalVisible("Institution");
      institutionPage.confirmDelete();

      cy.wait("@deleteInstitution")
        .its("response.statusCode")
        .should("eq", 200);
      cy.get("body").should(
        "contain.text",
        this.institutionData.deleteMessage,
      );
    });
  });
});