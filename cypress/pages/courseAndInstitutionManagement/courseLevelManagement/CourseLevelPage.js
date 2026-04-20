const BaseTablePage = require("../../common/BaseTablePage");

class CourseLevelPage extends BaseTablePage {
  visit() {
    const base = Cypress.env("BASE_URL");
    cy.visit(`${base}/courses/program-level/institution`);
    this.waitForTable();
  }

  get addCourseLevelBtn() {
    return cy.contains("button", "Add Course Level");
  }

  clickAddCourseLevel() {
    this.addCourseLevelBtn.click();
  }

  clickAddCourse() {
    this.clickAddCourseLevel();
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

  _firstRowWithCourseLevels() {
    return cy.get("tbody tr").filter((_, row) => {
      return [...row.querySelectorAll("td")].some((td) => {
        const val = parseInt(td.innerText.trim(), 10);
        return val > 0;
      });
    });
  }

  viewInstitutionWithData() {
    this._firstRowWithCourseLevels()
      .first()
      .then(($row) => {
        cy.wrap($row)
          .find('button[aria-haspopup="menu"]')
          .click({ force: true });
      });
    this._clickMenuItem("View All Course Levels");
    this.waitForTable();
  }

  deleteAllCourseLevelsForFirst() {
    this._firstRowWithCourseLevels()
      .first()
      .then(($row) => {
        cy.wrap($row)
          .find('button[aria-haspopup="menu"]')
          .click({ force: true });
      });
    this._clickMenuItem("Delete all Course Levels");
  }

  deleteAllCoursesForFirst() {
    this.deleteAllCourseLevelsForFirst();
  }

  editFirstCourseLevel() {
    this.waitForTable();
    this._openRowMenuByIndex(0);
    this._clickMenuItem("Edit Program");
  }

  editFirstCourse() {
    this.editFirstCourseLevel();
  }

  openDeleteForCourseLevel() {
    this.waitForTable();
    this._openRowMenuByIndex(0);
    this._clickMenuItem("Delete Program");
  }

  openDeleteForCourse() {
    this.openDeleteForCourseLevel();
  }
}

module.exports = CourseLevelPage;