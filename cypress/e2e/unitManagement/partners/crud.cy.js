const PartnersPage = require("../../../pages/unitManagement/partners/PartnersPage.js");
const AddPartnerModalPage = require("../../../pages/unitManagement/partners/AddPartnerModalPage.js");
const EditPartnerModalPage = require("../../../pages/unitManagement/partners/EditPartnerModalPage.js");

describe("Partners - CRUD Operations", () => {
  let partnersPage;
  let addPartnerModal;
  let editPartnerModal;

  beforeEach(() => {
    cy.loginWithSession();
    cy.fixture("/unitManagement/partners/crud.json").as("partnerData");
  });

  partnersPage = new PartnersPage();
  addPartnerModal = new AddPartnerModalPage();
  editPartnerModal = new EditPartnerModalPage();

  // Test suite: Read
  describe("Read Partners", () => {
    it("should fetch partners from API and display them correctly", () => {
      cy.intercept("POST", "**/api/admin/partners/**").as("getPartners");

      partnersPage.visit();

      cy.wait("@getPartners").then((interception) => {
        const body = interception.response.body;

        const data = body.data || body.results || body.partners || [];

        const apiCount = body.count || data.length;

        partnersPage.assertRecordState(apiCount);
      });
    });
  });

  // Test suite: Create
  describe("Create Partner", () => {
    it("should create a new partner successfully", function () {
      const newPartner = this.partnerData.newPartner;
      cy.intercept("POST", "**/api/admin/partners/**").as("createPartner");

      partnersPage.visit();
      partnersPage.clickAddPartner();

      addPartnerModal.fillForm(this.partnerData.newPartner);
      addPartnerModal.submit();

      cy.wait("@createPartner")
        .its("response.statusCode")
        .should("be.oneOf", [200, 201, 202, 204]);

      cy.get("body").should("contain.text", this.partnerData.successMessage);

      partnersPage.searchTable(newPartner.displayName);
      partnersPage.assertExists(newPartner.displayName);
    });
  });

  // Test suite: Update
  describe("Update Partner", () => {
    it("should update first available partner", function () {
      const updatedPartner = this.partnerData.updatedPartner;

      cy.intercept("POST", "**/api/admin/partners/**").as("updatePartner");

      partnersPage.visit();

      partnersPage.editFirstRow();

      editPartnerModal.assertModalIsOpen();
      editPartnerModal.fillForm(updatedPartner);
      editPartnerModal.submit();

      cy.wait("@updatePartner")
        .its("response.statusCode")
        .should("be.oneOf", [200, 201, 202, 204]);
      cy.get("body").should("contain.text", this.partnerData.updateMessage);

      // Verify updated values in the list (basic check using display name)
      partnersPage.searchTable(updatedPartner.displayName);
      partnersPage.assertExists(updatedPartner.displayName);
    });
  });

  // // Test suite: Delete
  describe("Delete Partner", () => {
    it("should delete a partner successfully", function () {
      cy.intercept("DELETE", "**/api/admin/partners/**").as("deletePartner");

      partnersPage.visit();
      partnersPage.deleteFirstRow();
      partnersPage.assertDeleteModalVisible("Partner");

      partnersPage.confirmDelete();

      cy.wait("@deletePartner")
        .its("response.statusCode")
        .should("be.oneOf", [200, 201, 202, 204]);

      cy.get("body").should("contain.text", this.partnerData.deleteMessage);

      // partnersPage.assertPartnerNotExists(partnerToDelete);
    });
  });
});
