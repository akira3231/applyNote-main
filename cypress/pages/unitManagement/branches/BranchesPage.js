class BranchesPage {
  get addBranchBtn() {
    return cy.contains("button", "Add Branch");
  }
  get mainSearchInput() {
    return cy.get('input[placeholder="Search..."]').first();
  }
  get tableSearchInput() {
    return cy.get('input[placeholder="Search..."]').last();
  }
  get table() {
    return cy.get("table");
  }
  get tableRows() {
    return this.table.find("tbody tr");
  }
  get exportBtn() {
    return cy.contains("button", "Export");
  }

  visit() {
    const base = Cypress.env("BASE_URL");
    cy.visit(`${base}/units/branches`);
    this.waitForTable();
  }

  waitForTable() {
    this.tableRows.should("have.length.gte", 1);
  }

  clickAddBranch() {
    this.addBranchBtn.click();
  }

  search(text) {
    this.mainSearchInput.clear().type(text);
  }

  editFirstBranch() {
    cy.get("tbody tr")
      .first()
      .find('button[aria-haspopup="menu"]')
      .click({ force: true });

    cy.get('[role="menuitem"]')
      .contains("Edit Branch")
      .should("be.visible")
      .click({ force: true });
  }

  openDeleteForBranch(displayName) {
    cy.contains("tbody tr", displayName)
      .should("be.visible")
      .within(() => {
        cy.get('button[aria-haspopup="menu"]').click({ force: true });
      });

    cy.contains('[role="menuitem"], div', /delete branch/i)
      .should("be.visible")
      .click({ force: true });
  }

  confirmDelete() {
    cy.contains("button", "Delete").should("be.visible").click({ force: true });
  }

  cancelDelete() {
    cy.contains("button", "Cancel").should("be.visible").click({ force: true });
  }

  assertDeleteModalVisible() {
    cy.contains("h2", /delete branch/i).should("be.visible");
  }

  assertBranchNotExists(displayName) {
    cy.contains("tbody tr", displayName).should("not.exist");
  }

  toggleStatus(displayName) {
    this.getRowByDisplayName(displayName).find('button[role="switch"]').click();
  }

  getRowByDisplayName(displayName) {
    return cy.contains("td", displayName).closest("tr");
  }
  getFirstRowDisplayName() {
    return cy
      .get("tbody tr")
      .first()
      .find("td")
      .first()
      .invoke("text")
      .then((text) => text.trim());
  }

  assertRecordCount(count) {
    cy.contains("span", `${count} entries`).should("exist");
  }

  assertRowsCount(count) {
    this.tableRows.should("have.length", count);
  }

  assertBranchExists(displayName) {
    cy.contains("td", displayName).should("be.visible");
  }

  assertBranchNotExists(displayName) {
    cy.contains("td", displayName).should("not.exist");
  }

  getTotalRowsAcrossPages() {
    let total = 0;

    function countPage() {
      return cy.get("table tbody tr").then(($rowsBefore) => {
        const currentCount = $rowsBefore.length;
        total += currentCount;

        return cy.contains("button", "Next").then(($btn) => {
          if ($btn.is(":disabled")) {
            return total;
          }

          cy.wrap($btn).click();

          cy.get("table tbody tr").should(($rowsAfter) => {
            expect($rowsAfter.length).to.not.eq(currentCount);
          });

          return countPage();
        });
      });
    }

    return countPage();
  }
}

module.exports = BranchesPage;
