const AgreementsPage = require("../../pages/agreement/AgreementsPage.js");
const AddAgreementModalPage = require("../../pages/agreement/AddAgreementsModalPage.js");
const EditAgreementModalPage = require("../../pages/agreement/EditAgreementsModalPage.js");

describe("Agreements - CRUD Operations", () => {
  let agreementsPage;
  let addAgreementModal;
  let editAgreementModal;

  beforeEach(() => {
    cy.loginWithSession();
    cy.fixture("/agreement/crud.json").as("agreementData");
  });

  agreementsPage = new AgreementsPage();
  addAgreementModal = new AddAgreementModalPage();
  editAgreementModal = new EditAgreementModalPage();

  // Test suite: Read
  describe("Read Agreements", () => {
    it("should fetch agreements from API and display them correctly", () => {
      cy.intercept("POST", "**/api/admin/agreements/**").as("getAgreements");

      agreementsPage.visit();

      cy.wait("@getAgreements").then((interception) => {
        const body = interception.response.body;

        const data = body.data || body.results || body.agreements || [];

        const apiCount = body.count || data.length;

        agreementsPage.assertRecordState(apiCount);
      });
    });
  });

  // Test suite: Create
  describe("Create Agreement", () => {
    it("should create a new agreement successfully", function () {
      const newAgreement = this.agreementData.newAgreement;
      cy.intercept("POST", "**/api/admin/agreements/**").as("createAgreement");

      agreementsPage.visit();
      agreementsPage.clickAddAgreement();

      addAgreementModal.fillForm(this.agreementData.newAgreement);
      addAgreementModal.submit();

      cy.wait("@createAgreement")
        .its("response.statusCode")
        .should("be.oneOf", [200, 201, 202, 204]);

      cy.get("body").should("contain.text", this.agreementData.successMessage);

      agreementsPage.searchTable(newAgreement.invoicingName);
      agreementsPage.assertExists(newAgreement.invoicingName);
    });
  });

  // Test suite: Update
  describe("Update Agreement", () => {
    it("should update first available agreement", function () {
      const updatedAgreement = this.agreementData.updatedAgreement;

      cy.intercept("POST", "**/api/admin/agreements/**").as("updateAgreement");

      agreementsPage.visit();

      agreementsPage.editFirstRow();

      editAgreementModal.assertModalIsOpen();
      editAgreementModal.fillForm(updatedAgreement);
      editAgreementModal.submit();

      cy.wait("@updateAgreement")
        .its("response.statusCode")
        .should("be.oneOf", [200, 201, 202, 204]);
      cy.get("body").should("contain.text", this.agreementData.updateMessage);

      agreementsPage.searchTable(updatedAgreement.invoicingName);
      agreementsPage.assertExists(updatedAgreement.invoicingName);
    });
  });

  // // Test suite: Delete
  describe("Delete Agreement", () => {
    it("should delete an agreement successfully", function () {
      cy.intercept("DELETE", "**/api/admin/agreements/**").as(
        "deleteAgreement",
      );

      agreementsPage.visit();
      agreementsPage.deleteFirstRow();
      agreementsPage.assertDeleteModalVisible("Agreement");

      agreementsPage.confirmDelete();

      cy.wait("@deleteAgreement")
        .its("response.statusCode")
        .should("be.oneOf", [200, 201, 202, 204]);

      cy.get("body").should("contain.text", this.agreementData.deleteMessage);

      // agreementsPage.assertAgreementNotExists(agreementToDelete);
    });
  });
});
