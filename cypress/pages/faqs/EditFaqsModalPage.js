const BaseTablePage = require("../common/BaseTablePage");

class EditFaqsModalPage extends BaseTablePage {
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

  cancel() {
    this.cancelBtn.click();
  }

  assertModalIsOpen() {
    this.modalTitle.should("be.visible");
  }
}

module.exports = EditFaqsModalPage;
