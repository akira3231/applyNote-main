class AddDesignationsModalPage {
  get modalTitle() {
    return cy.contains("div.bg-sidebar-primary", "Add Designation");
  }
  get nameInput() {
    return cy.get('input[placeholder*="Enter Name"], input[name="name"]');
  }
  get eligibleForCommissionRadio() {
    return {
      yes: cy.get('input[id="eligible-true"]'),
      no: cy.get('input[id="eligible-false"]'),
    };
  }
  get addNewBtn() {
    return cy.get("button.bg-success");
  }
  get cancelBtn() {
    return cy.get("button.bg-transparent");
  }

  fillForm(designationData) {
    if (designationData.name) this.nameInput.clear().type(designationData.name);
    if (designationData.eligibleForCommission !== undefined) {
      if (designationData.eligibleForCommission) {
        cy.get("#eligible-true").click();
      } else {
        cy.get("#eligible-false").click();
      }
    }
  }

  submit() {
    this.addNewBtn.click();
  }

  cancel() {
    this.cancelBtn.click();
  }

  assertModalIsOpen() {
    this.modalTitle.should("be.visible");
  }
}

module.exports = AddDesignationsModalPage;
