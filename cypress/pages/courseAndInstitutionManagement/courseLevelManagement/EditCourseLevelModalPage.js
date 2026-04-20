class EditCourseLevelModalPage {
  get modalTitle() {
    return cy.get('[role="dialog"]', { timeout: 10000 }).first();
  }

  get courseLevelNameInput() {
    return cy.get('input#name');
  }

  get courseSelect() {
    return cy.get('#program_type').filter(':visible');
  }

  get saveBtn() {
    return cy.contains('button', 'Update Course Level');
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
    if (data.course) {
      this.selectCourse(data.course);
    }
  }

  submit() {
    this.saveBtn.should('not.be.disabled').click();
  }

  assertModalIsOpen() {
    cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible');
  }
}

module.exports = EditCourseLevelModalPage;