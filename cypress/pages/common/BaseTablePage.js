class BaseTablePage {
  get table() {
    return cy.get("table");
  }

  get tableRows() {
    return this.table.find("tbody tr");
  }

  get mainSearchInput() {
    return cy.get('input[placeholder="Search..."]').first();
  }

  get tableSearchInput() {
    return cy.get('input[placeholder="Search..."]').last();
  }

  waitForTable() {
    cy.get("table").should("exist");

    cy.get("body").then(($body) => {
      if ($body.find("tbody tr").length > 0) {
        this.tableRows.should("have.length.gte", 1);
      } else {
        cy.contains("No entries found").should("be.visible");
      }
    });
  }

  searchTable(text) {
    this.tableSearchInput.clear().type(text);
  }

  searchMain(text) {
    this.mainSearchInput.clear().type(text);
  }

  getRowByText(text) {
    return cy.contains("td", text).closest("tr");
  }

  getFirstRow() {
    return this.tableRows.first();
  }

  getFirstRowText() {
    return this.getFirstRow()
      .find("td")
      .first()
      .invoke("text")
      .then((t) => t.trim());
  }

  clickFirstRowAction(actionRegex) {
    cy.get("tbody tr")
      .first()
      .find('button[aria-haspopup="menu"]')
      .click({ force: true });

    cy.get('[role="menuitem"]')
      .contains(actionRegex)
      .should("be.visible")
      .click({ force: true });
  }
  editFirstRow() {
    this.clickFirstRowAction(/edit/i);
  }
  deleteFirstRow() {
    this.clickFirstRowAction(/delete/i);
  }

  confirmDelete() {
    cy.contains("button", /^delete$/i)
      .should("be.visible")
      .click({ force: true });
  }

  cancelDelete() {
    cy.contains("button", /^cancel$/i)
      .should("be.visible")
      .click({ force: true });
  }

  assertDeleteModalVisible(entityName = "item") {
    cy.contains("h2", new RegExp(`delete ${entityName}`, "i")).should(
      "be.visible",
    );
  }

  assertExists(text) {
    cy.contains("td", text).should("be.visible");
  }

  assertNotExists(text) {
    cy.contains("td", text).should("not.exist");
  }

  assertRecordState(count) {
    cy.wait(1000);
    if (count === 0) {
      cy.contains("No entries found").should("exist");
    } else {
      cy.get("tbody tr").should("have.length.gt", 0);
    }
  }
}

module.exports = BaseTablePage;
