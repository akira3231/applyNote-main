class EditSchoolModalPage {
  get modalTitle() {
    return cy.contains("h2, .modal-title", /Edit School|Update School/);
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
  get countrySelect() {
    return cy.get('button[role="combobox"]').filter(":visible");
  }
  get commissionPointInput() {
    return cy.get(
      'input[placeholder*="Commission Point"], input[name="commissionPoint"]',
    );
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
  get updateBtn() {
    return cy.contains("button", "Update School");
  }

  isDifferent(currentValue, newValue) {
    return newValue && newValue !== currentValue;
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

  updateDropdown(trigger, value, label = "dropdown") {
    if (!value) return;

    trigger
      .should("be.visible")
      .invoke("text")
      .then((text) => {
        const current = text.replace(/\s+/g, " ").trim();

        if (current === value) {
          return;
        }

        cy.contains(
          'button[role="combobox"]',
          current || { timeout: 10000 },
        ).click({ force: true });

        cy.get('[role="option"]', { timeout: 10000 })
          .contains(value)
          .scrollIntoView()
          .should("be.visible")
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

    // Country dropdown
    if (schoolData.country) {
      this.updateDropdown(this.countrySelect, schoolData.country, "country");
    }
  }

  submit() {
    this.updateBtn.click();
  }

  assertModalIsOpen() {
    this.modalTitle.should("be.visible");
  }
}

module.exports = EditSchoolModalPage;
