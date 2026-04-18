class EditBranchModalPage {
  get modalTitle() {
    return cy.contains("h2, .modal-title", /Edit Branch|Update Branch/);
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
    return cy.contains("button", "Update Branch");
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

  fillForm(branchData) {
    if (branchData.displayName)
      this.updateField(this.displayNameInput, branchData.displayName);

    if (branchData.legalName)
      this.updateField(this.legalNameInput, branchData.legalName);

    if (branchData.email) this.updateField(this.emailInput, branchData.email);

    if (branchData.phone) this.updateField(this.phoneInput, branchData.phone);

    // Currency dropdown
    if (branchData.currency) {
      this.updateDropdown(this.currencySelect, branchData.currency, "currency");
    }

    if (branchData.commissionRate)
      this.updateField(this.commissionRateInput, branchData.commissionRate);

    if (branchData.country || branchData.city || branchData.state)
      this.locationInfoSection.click();

    if (branchData.city) this.updateField(this.cityInput, branchData.city);

    if (branchData.state) this.updateField(this.stateInput, branchData.state);

    // Country dropdown
    if (branchData.country) {
      this.updateDropdown(this.countrySelect, branchData.country, "country");
    }
  }

  submit() {
    this.updateBtn.click();
  }

  assertModalIsOpen() {
    this.modalTitle.should("be.visible");
  }
}

module.exports = EditBranchModalPage;
