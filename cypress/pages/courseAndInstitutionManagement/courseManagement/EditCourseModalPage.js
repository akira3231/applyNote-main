const AddCourseModalPage = require("./AddCourseModalPage");

class EditCourseModalPage extends AddCourseModalPage {
  get modalTitle() {
    return cy.contains("h2, .modal-title", /edit course/i);
  }

  get submitBtn() {
    return cy.contains("button", /save|update/i).filter(":visible").first();
  }

  assertModalIsOpen() {
    this.modalTitle.should("be.visible");
  }

  submit() {
    this.submitBtn.click();
  }
}

module.exports = EditCourseModalPage;