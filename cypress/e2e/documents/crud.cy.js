const DocumentsPage = require("../../pages/documents/DocumentsPage.js");
const AddDocumentsModalPage = require("../../pages/documents/AddDocumentsModalPage.js");
const EditDocumentsModalPage = require("../../pages/documents/EditDocumentsModalPage.js");

describe("Documents - CRUD Operations", () => {
  let documentsPage;
  let addDocumentModal;
  let editDocumentModal;

  beforeEach(() => {
    cy.loginWithSession();
    cy.fixture("/documents/crud.json").as("documentData");
  });

  documentsPage = new DocumentsPage();
  addDocumentModal = new AddDocumentsModalPage();
  editDocumentModal = new EditDocumentsModalPage();

  // Test suite: Read
  describe("Read Documents", () => {
    it("should fetch documents from API and display them correctly", () => {
      cy.intercept("POST", "**/api/admin/documents/**").as("getDocuments");

      documentsPage.visit();

      cy.wait("@getDocuments").then((interception) => {
        const body = interception.response.body;

        const data = body.data || body.results || body.agreements || [];

        const apiCount = body.count || data.length;

        documentsPage.assertRecordState(apiCount);
      });
    });
  });

  // Test suite: Create
  describe("Create Document", () => {
    it("should create a new document successfully", function () {
      const newDocument = this.documentData.newDocument;
      cy.intercept("POST", "**/api/admin/documents/**").as("createDocument");

      documentsPage.visit();
      documentsPage.clickAddDocument();

      addDocumentModal.fillForm(this.documentData.newDocument);
      addDocumentModal.submit();

      cy.wait("@createDocument")
        .its("response.statusCode")
        .should("be.oneOf", [200, 201, 202, 204]);

      cy.get("body").should("contain.text", this.documentData.successMessage);

      documentsPage.searchTable(newDocument.name);
      documentsPage.assertExists(newDocument.name);
    });
  });

  // Test suite: Update
  describe("Update Document", () => {
    it("should update first available document", function () {
      const updatedDocument = this.documentData.updatedDocument;

      cy.intercept("POST", "**/api/admin/documents/**").as("updateDocument");

      documentsPage.visit();

      documentsPage.editFirstRow();

      editDocumentModal.assertModalIsOpen();
      editDocumentModal.fillForm(updatedDocument);
      editDocumentModal.submit();

      cy.wait("@updateDocument")
        .its("response.statusCode")
        .should("be.oneOf", [200, 201, 202, 204]);
      cy.get("body").should("contain.text", this.documentData.updateMessage);

      documentsPage.searchTable(updatedDocument.name);
      documentsPage.assertExists(updatedDocument.name);
    });
  });

  // Test suite: Delete
  describe("Delete Document", () => {
    it("should delete a document successfully", function () {
      cy.intercept("DELETE", "**/api/admin/documents/**").as("deleteDocument");

      documentsPage.visit();
      documentsPage.deleteFirstRow();
      documentsPage.assertDeleteModalVisible("Document");

      documentsPage.confirmDelete();

      cy.wait("@deleteDocument")
        .its("response.statusCode")
        .should("be.oneOf", [200, 201, 202, 204]);

      cy.get("body").should("contain.text", this.documentData.deleteMessage);
    });
  });
});
