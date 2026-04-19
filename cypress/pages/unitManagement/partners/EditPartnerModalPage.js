class EditPartnerModalPage {
  get modalTitle() {
    return cy.contains("h2, .modal-title", /Edit Partner/);
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
  get currencySelect() {
    return cy
      .contains("label", /currency/i)
      .closest("div")
      .find('button[role="combobox"]');
  }
  get commissionRateInput() {
    return cy.get(
      'input[placeholder*="Commission Rate"], input[name="commissionRate"]',
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
  get countrySelect() {
    return cy
      .contains("label", /country/i)
      .closest("div")
      .find('button[role="combobox"]');
  }
  get updateBtn() {
    return cy.contains("button", "Update Partner");
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

  fillForm(partnerData) {
    if (partnerData.displayName)
      this.updateField(this.displayNameInput, partnerData.displayName);
    if (partnerData.legalName)
      this.updateField(this.legalNameInput, partnerData.legalName);
    if (partnerData.email) this.updateField(this.emailInput, partnerData.email);
    if (partnerData.phone) this.updateField(this.phoneInput, partnerData.phone);
    if (partnerData.currency)
      this.updateDropdownWithSearch(this.currencySelect, partnerData.currency);
    if (partnerData.commissionRate)
      this.updateField(this.commissionRateInput, partnerData.commissionRate);

    if (partnerData.country || partnerData.city || partnerData.state)
      this.locationInfoSection.click();

    if (partnerData.city) this.updateField(this.cityInput, partnerData.city);
    if (partnerData.state) this.updateField(this.stateInput, partnerData.state);
    if (partnerData.country)
      this.updateDropdownWithSearch(this.countrySelect, partnerData.country);
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

module.exports = EditPartnerModalPage;
