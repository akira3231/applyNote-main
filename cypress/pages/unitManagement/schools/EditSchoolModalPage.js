class EditSchoolModalPage {
  get modalTitle() {
    return cy.contains("h2, .modal-title", /Edit School/);
  }
  get displayNameInput() {
    return cy.get(
      'input[placeholder*="Display Name"], input[name="displayName"]',
    );
  }
  get legalNameInput() {
    return cy.get('input[placeholder*="Legal Name"], input[name="legalName"]');
  }
  get emailInput() {
    return cy.get('input[placeholder*="Email"], input[type="email"]');
  }
  get phoneInput() {
    return cy.get('input[placeholder*="Phone"], input[name="phone"]');
  }
  get commissionPointInput() {
    return cy.get('input[name="commissionPoint"]');
  }
  get locationInfoSection() {
    return cy.contains("button, div, h3", "Location Info");
  }
  get stateInput() {
    return cy.get(
      'input[placeholder*="Enter State/Province"], input[name="state"]',
    );
  }
  get cityInput() {
    return cy.get('input[placeholder*="City"], input[name="city"]');
  }
  get countrySelect() {
    return cy
      .contains("label", /country/i)
      .parent()
      .find('button[role="combobox"]');
  }
  get updateBtn() {
    return cy.contains("button", "Update School");
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

  updateDropdownWithSearch(triggerEl, value) {
    if (!value) return;

    triggerEl.then(($btn) => {
      const current = $btn.text().replace(/\s+/g, " ").trim();
      if (current === value) return;

      cy.wrap($btn).click({ force: true });

      cy.get('[cmdk-root] input[placeholder="Search..."]', { timeout: 10000 })
        .filter(":visible")
        .first()
        .clear({ force: true })
        .type(value, { force: true });

      cy.get("[cmdk-item]", { timeout: 10000 })
        .filter(":visible")
        .contains(value)
        .click({ force: true });
    });
  }

  fillForm(schoolData) {
    if (schoolData.displayName)
      this.updateField(this.displayNameInput, schoolData.displayName);
    if (schoolData.legalName)
      this.updateField(this.legalNameInput, schoolData.legalName);
    if (schoolData.email) this.updateField(this.emailInput, schoolData.email);
    if (schoolData.phone) this.updateField(this.phoneInput, schoolData.phone);
    if (schoolData.commissionPoint)
      this.updateField(this.commissionPointInput, schoolData.commissionPoint);

    if (schoolData.country || schoolData.city || schoolData.state)
      this.locationInfoSection.click();

    if (schoolData.city) this.updateField(this.cityInput, schoolData.city);
    if (schoolData.state) this.updateField(this.stateInput, schoolData.state);
    if (schoolData.country)
      this.updateDropdownWithSearch(this.countrySelect, schoolData.country);
  }

  submit() {
    this.updateBtn.click();
  }

  cancel() {
    cy.contains("button", "Cancel").click();
  }

  assertModalIsOpen() {
    this.modalTitle.should("be.visible");
  }
}

module.exports = EditSchoolModalPage;
