class EditPartnerModalPage {
  get modalTitle() {
    return cy.contains("h2, .modal-title", /Edit Partner|Update Partner/);
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
      .contains("label, div", /currency/i)
      .parent()
      .find('button[role="combobox"]');
  }
  get countrySelect() {
    return cy.get('button[role="combobox"]').filter(":visible");
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
  get updateBtn() {
    return cy.contains("button", "Update Partner");
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

  fillForm(partnerData) {
    if (partnerData.displayName)
      this.updateField(this.displayNameInput, partnerData.displayName);

    if (partnerData.legalName)
      this.updateField(this.legalNameInput, partnerData.legalName);

    if (partnerData.email) this.updateField(this.emailInput, partnerData.email);

    if (partnerData.phone) this.updateField(this.phoneInput, partnerData.phone);

    // Currency dropdown
    if (partnerData.currency) {
      this.updateDropdown(
        this.currencySelect,
        partnerData.currency,
        "currency",
      );
    }

    if (partnerData.commissionRate)
      this.updateField(this.commissionRateInput, partnerData.commissionRate);

    if (partnerData.country || partnerData.city || partnerData.state)
      this.locationInfoSection.click();

    if (partnerData.city) this.updateField(this.cityInput, partnerData.city);

    if (partnerData.state) this.updateField(this.stateInput, partnerData.state);

    // Country dropdown
    if (partnerData.country) {
      this.updateDropdown(this.countrySelect, partnerData.country, "country");
    }
  }

  submit() {
    this.updateBtn.click();
  }

  assertModalIsOpen() {
    this.modalTitle.should("be.visible");
  }
}

module.exports = EditPartnerModalPage;
