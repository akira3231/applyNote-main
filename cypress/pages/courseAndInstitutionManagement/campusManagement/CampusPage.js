const BaseTablePage = require("../../common/BaseTablePage");

class CampusPage extends BaseTablePage {
  get addCampusBtn() {
    return cy.contains("button", "Add Campus");
  }

  visit() {
    const base = Cypress.env("BASE_URL");
    cy.visit(`${base}/courses/campuses/institution`);
    this.waitForTable();
  }

  clickAddCampus() {
    this.addCampusBtn.click();
  }

  viewFirstInstitutionCampuses() {
    cy.get("tbody tr")
      .first()
      .find('button[aria-haspopup="menu"]')
      .click({ force: true });

    cy.get('[role="menuitem"]')
      .filter(":visible")
      .should("have.length.gt", 0);

    cy.get('[role="menuitem"]')
      .filter(":visible")
      .first()
      .click({ force: true });

    cy.url().should("include", "/campus/");
    this.waitForTable();
  }

  openFirstCampusRowMenu(action) {
    cy.get("tbody tr")
      .first()
      .find('button[aria-haspopup="menu"]')
      .should("exist")
      .click({ force: true });

    cy.get('[role="menuitem"]').should("be.visible");

    cy.get('[role="menuitem"]')
      .contains(new RegExp(action, "i"))
      .should("be.visible")
      .click();
  }

  editFirstCampus() {
    this.viewFirstInstitutionCampuses();
    this.openFirstCampusRowMenu("edit");
  }

  openDeleteForCampus() {
    this.viewFirstInstitutionCampuses();
    this.openFirstCampusRowMenu("delete");
  }
}

module.exports = CampusPage;