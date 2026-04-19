class EditFaqsModalPage {
  get modalTitle() {
    return cy.contains("div.bg-sidebar-primary", /Edit FAQ/);
  }

  get questionInput() {
    return cy.get(
      'input[placeholder*="Enter a clear and concise question"], input[name="question"]',
    );
  }

  get answerEditor() {
    return cy.get('div.tiptap.ProseMirror[contenteditable="true"]');
  }

  get updateBtn() {
    return cy.contains("button", "Update FAQ");
  }

  assertModalIsOpen() {
    this.modalTitle.should("be.visible");
  }

  updateField(input, newValue) {
    if (!newValue) return;

    input.then(($el) => {
      const currentValue = $el.val?.() ?? $el.text?.();
      if (currentValue !== newValue) {
        cy.wrap($el).clear().type(String(newValue));
      }
    });
  }

  updateAnswer(newValue) {
    if (!newValue) return;

    this.answerEditor.then(($el) => {
      const currentValue = $el.text().trim();
      if (currentValue !== newValue) {
        cy.wrap($el).click().type("{selectall}").type(newValue);
      }
    });
  }

  fillForm(faqData) {
    if (faqData.question)
      this.updateField(this.questionInput, faqData.question);

    if (faqData.answer) this.updateAnswer(faqData.answer);
  }

  submit() {
    this.updateBtn.click();
  }
}

module.exports = EditFaqsModalPage;
