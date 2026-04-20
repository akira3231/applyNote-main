const BaseTablePage = require("../../common/BaseTablePage");

class CoursePage extends BaseTablePage {
  get addCourseBtn() {
    return cy.contains("button", "Add Course");
  }

  visit() {
    const base = Cypress.env("BASE_URL");
    cy.visit(`${base}/courses/courses-institution/institution`);
    this.waitForTable();
  }

  clickAddCourse() {
    this.addCourseBtn.click();
  }


  _openRowMenu($row) {
    cy.wrap($row)
      .scrollIntoView()
      .find('button[aria-haspopup="menu"]')
      .first()
      .should("exist")
      .click({ force: true });
  }

  _clickMenuItem(labelRegex) {
    cy.get('body', { timeout: 10000 })
      .find('[role="menu"][data-state="open"]')
      .last()
      .should("be.visible")
      .within(() => {
        cy.contains('[role="menuitem"]', labelRegex)
          .should("be.visible")
          .click({ force: true });
      });
  }


  _firstRowWithCourses() {
    return cy.get("tbody tr").filter((_, row) => {
      const cells = Array.from(row.querySelectorAll("td"));
      return cells.some((td) => {
        const val = parseInt(td.innerText.trim(), 10);
        return !isNaN(val) && val > 0;
      });
    });
  }

  viewInstitutionWithData() {
    this._firstRowWithCourses()
      .first()
      .then(($row) => this._openRowMenu($row));

    this._clickMenuItem(/view all courses/i);
    this.waitForTable();
  }

  deleteAllCoursesForFirst() {
    this._firstRowWithCourses()
      .first()
      .then(($row) => this._openRowMenu($row));

    this._clickMenuItem(/delete all courses/i);
  }

  _openFirstCourseRowMenu() {
    this.waitForTable();

    cy.get("tbody tr")
      .first()
      .scrollIntoView()
      .should("be.visible")
      .then(($row) => {
        cy.get("body").click(0, 0, { force: true });
        cy.wait(200);

        cy.get("tbody tr")
          .first()
          .find('button[aria-haspopup="menu"][data-state="closed"]')
          .first()
          .should("exist")
          .click({ force: true });
      });

    cy.get('[role="menu"][data-state="open"]', { timeout: 8000 })
      .should("exist");
  }

  editFirstCourse() {
    this._openFirstCourseRowMenu();
    this._clickMenuItem(/edit course/i);
  }

  openDeleteForCourse() {
    this._openFirstCourseRowMenu();
    this._clickMenuItem(/delete course/i);
  }
}

module.exports = CoursePage;