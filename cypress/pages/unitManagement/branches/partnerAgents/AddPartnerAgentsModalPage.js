class AddPartnerAgentsModalPage {
  get modalTitle() {
    return cy.contains("h2, .modal-title", "Add Partner Agent");
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
    return cy.contains('button[role="combobox"]', "Select Currency");
  }
  get countrySelect() {
    return cy.contains('button[role="combobox"]', "Select Country");
  }
  get commissionRateInput() {
    return cy.get(
      'input[placeholder*="Commission Rate"], input[name="commissionRate"]',
    );
  }
  get stateInput() {
    return cy.get(
      'input[placeholder*="Enter State/Province"], input[name="state"]',
    );
  }
  get cityInput() {
    return cy.get('input[placeholder*="City"], input[name="city"]');
  }
  get addNewBtn() {
    return cy.contains("button", "Add New");
  }
  get cancelBtn() {
    return cy.contains("button", "Cancel");
  }

  get locationInfoSection() {
    return cy.contains("button, div, h3", "Location Info");
  }

  selectFromDropdown(value) {
    cy.get("body")
      .find('[role="option"]')
      .should("be.visible")
      .contains(value)
      .click({ force: true });
  }

  fillForm(partnerAgentData) {
    if (!partnerAgentData) {
      throw new Error("Partner agent test data is undefined");
    }
    if (partnerAgentData.displayName)
      this.displayNameInput.clear().type(partnerAgentData.displayName);
    if (partnerAgentData.legalName)
      this.legalNameInput.clear().type(partnerAgentData.legalName);
    if (partnerAgentData.email)
      this.emailInput.clear().type(partnerAgentData.email);
    if (partnerAgentData.phone)
      this.phoneInput.clear().type(partnerAgentData.phone);
    if (partnerAgentData.currency) {
      this.currencySelect.click();
      this.selectFromDropdown(partnerAgentData.currency);
    }
    if (partnerAgentData.commissionRate)
      this.commissionRateInput.clear().type(partnerAgentData.commissionRate);
    if (
      partnerAgentData.country ||
      partnerAgentData.city ||
      partnerAgentData.state
    ) {
      this.locationInfoSection.click();
    }
    if (partnerAgentData.city)
      this.cityInput.clear().type(partnerAgentData.city);
    if (partnerAgentData.state)
      this.stateInput.clear().type(partnerAgentData.state);
    if (partnerAgentData.country) {
      this.countrySelect.click();
      this.selectFromDropdown(partnerAgentData.country);
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

module.exports = AddPartnerAgentsModalPage;
