const BaseTablePage = require("../common/BaseTablePage");

class DocumentsPage extends BaseTablePage {
  get addDocumentBtn() {
    return cy.contains("button", "Add Document");
  }

  visit() {
    const base = Cypress.env("BASE_URL");
    cy.visit(`${base}/documents`);
    this.waitForTable();
  }

  clickAddDocument() {
    this.addDocumentBtn.click();
  }

  editFirstDocument() {
    this.editFirstRow();
  }

  openDeleteForDocument() {
    this.deleteFirstRow();
  }
}

module.exports = DocumentsPage;
