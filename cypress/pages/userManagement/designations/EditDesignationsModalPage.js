class EditDesignationsModalPage {
  get modalTitle() {
    return cy.contains(
      "div.bg-sidebar-primary",
      /Edit Designation|Update Designation/,
    );
  }

  get nameInput() {
    return cy.get('input[placeholder*="Enter Name"], input[name="name"]');
  }

  get eligibleForCommissionToggle() {
    return cy.get('button[role="switch"]');
  }

  get updateBtn() {
    return cy.get("button.bg-success");
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

  get eligibleForCommissionRadio() {
    return {
      yes: cy.get('input[id="eligible-true"]'),
      no: cy.get('input[id="eligible-false"]'),
    };
  }

  fillForm(designationData) {
    if (designationData.name)
      this.updateField(this.nameInput, designationData.name);

    if (designationData.eligibleForCommission !== undefined) {
      if (designationData.eligibleForCommission) {
        cy.get("#eligible-true").click();
      } else {
        cy.get("#eligible-false").click();
      }
    }
  }

  submit() {
    this.updateBtn.click();
  }

  assertModalIsOpen() {
    this.modalTitle.should("be.visible");
  }
}

module.exports = EditDesignationsModalPage;
