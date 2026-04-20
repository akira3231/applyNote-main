class AddCourseLevelModalPage {
  get modalTitle() {
    return cy.get('[role="dialog"]', { timeout: 10000 }).first();
  }

  get courseLevelNameInput() {
    return cy.get('[name="name"]');
  }

  get institutionDropdown() {
    return cy.get('.grid > :nth-child(2) > .inline-flex');
  }

  get searchInput() {
    return cy.get('.py-1 > .w-full').filter(':visible');
  }

  get courseSelect() {
    return cy.get('#program_type').filter(':visible');
  }

  get addNewBtn() {
    return cy.contains('button', 'Add New');
  }

  selectInstitution(name) {
    this.institutionDropdown.click({ force: true });
    this.searchInput.clear().type(name);
    cy.get('[role="option"]')
      .contains(name)
      .click({ force: true });
  }

  selectCourse(course) {
    this.courseSelect.click({ force: true });
    cy.get('[role="option"]')
      .contains(course)
      .click({ force: true });
  }

  fillForm(data) {
    if (data.courseLevelName) {
      this.courseLevelNameInput.clear().type(data.courseLevelName);
    }
    if (data.institution) {
      this.selectInstitution(data.institution);
    }
    if (data.course) {
      this.selectCourse(data.course);
    }
  }

  submit() {
    this.addNewBtn.should('not.be.disabled').click();
  }

  assertModalIsOpen() {
    cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible');
  }
}

module.exports = AddCourseLevelModalPage;