class AddFaqsModalPage {
  get modalTitle() {
    return cy.contains("div.bg-sidebar-primary", "Add FAQ");
  }

  get questionInput() {
    return cy.get(
      'input[placeholder*="Enter a clear and concise question"], input[name="question"]',
    );
  }

  get answerEditor() {
    return cy.get('div.tiptap.ProseMirror[contenteditable="true"]');
  }

  get addNewBtn() {
    return cy.contains("button", "Add New FAQ");
  }
  get cancelBtn() {
    return cy.contains("button", "Cancel");
  }

  assertModalIsOpen() {
    this.modalTitle.should("be.visible");
  }

  fillForm(faqData) {
    if (faqData.question) this.questionInput.clear().type(faqData.question);
    if (faqData.answer) this.answerEditor.click().type(faqData.answer);
  }

  submit() {
    this.addNewBtn.click();
  }

  cancel() {
    this.cancelBtn.click();
  }
}

module.exports = AddFaqsModalPage;
