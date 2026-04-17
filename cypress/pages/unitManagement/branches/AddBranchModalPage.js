class AddBranchModalPage {
  get modalTitle() {
    return cy.contains("h2, .modal-title", "Add Branch");
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

  fillForm(branchData) {
    if (branchData.displayName)
      this.displayNameInput.clear().type(branchData.displayName);
    if (branchData.legalName)
      this.legalNameInput.clear().type(branchData.legalName);
    if (branchData.email) this.emailInput.clear().type(branchData.email);
    if (branchData.phone) this.phoneInput.clear().type(branchData.phone);
    if (branchData.currency) {
      this.currencySelect.click();
      this.selectFromDropdown(branchData.currency);
    }
    if (branchData.commissionRate)
      this.commissionRateInput.clear().type(branchData.commissionRate);
    if (branchData.country || branchData.city || branchData.state) {
      this.locationInfoSection.click();
    }
    if (branchData.city) this.cityInput.clear().type(branchData.city);
    if (branchData.state) this.stateInput.clear().type(branchData.state);
    if (branchData.country) {
      this.countrySelect.click();
      this.selectFromDropdown(branchData.country);
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

module.exports = AddBranchModalPage;
