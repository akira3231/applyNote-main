const BaseTablePage = require("../../common/BaseTablePage");

class ApplicationPage extends BaseTablePage {
  visit() {
    const base = Cypress.env("BASE_URL");
    cy.visit(`${base}/students/applications`);
    this.waitForTable();
  }


  get createApplicationBtn() {
    return cy.contains("button", "Create Application");
  }

  clickCreateApplication() {
    this.createApplicationBtn.click();
  }


  _openRowMenuByIndex(index = 0) {
    cy.get("tbody tr")
      .eq(index)
      .find('button[aria-haspopup="menu"]')
      .click({ force: true });
  }

  _clickMenuItem(text) {
    cy.get('[data-state="open"] [role="menuitem"]', { timeout: 10000 })
      .filter(":visible")
      .contains(text)
      .click({ force: true });
  }


  viewDetailFirst() {
    this._openRowMenuByIndex(0);
    this._clickMenuItem("View Detail");
  }

  editFirstApplication() {
    this.waitForTable();
    this._openRowMenuByIndex(0);
    this._clickMenuItem("Edit Application");
  }

  openDeleteForApplication() {
    this.waitForTable();
    this._openRowMenuByIndex(0);
    this._clickMenuItem("Delete Application");
  }

  generateReportForFirst() {
    this.waitForTable();
    this._openRowMenuByIndex(0);
    this._clickMenuItem("Generate Report");
  }

  assertDeleteModalVisible(entityName = "Application") {
    cy.get('[role="dialog"], [role="alertdialog"]', { timeout: 10000 })
      .filter(":visible")
      .first()
      .should("be.visible")
      .and("contain.text", entityName);
  }

  confirmDelete() {
    cy.get('.bg-destructive').filter(":visible").click({ force: true });
  }


  assertGenerateReportModalVisible() {
    cy.get('[role="dialog"]', { timeout: 10000 }).should("be.visible");
  }

  clickDownloadPdf() {
    cy.contains("button", "Download PDF").click({ force: true });
  }
}

module.exports = ApplicationPage;