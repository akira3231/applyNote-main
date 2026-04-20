class AddInstitutionModalPage {
  get modalTitle() {
    return cy.contains("h2, .modal-title", "Add Institution");
  }

  get institutionCodeInput() {
    return cy.get(
      'input[placeholder*="Enter Institution Code"], input[name="institutionCode"]',
    );
  }

  get institutionNameInput() {
    return cy.get(
      'input[placeholder*="Enter Institution Name"], input[name="institutionName"]',
    );
  }

  get legalNameInput() {
    return cy.get(
      'input[placeholder*="Enter Legal Name"], input[name="legalName"]',
    );
  }

  get institutionTypeSelect() {
    return cy
      .get('button[role="combobox"], select[name="institutionType"]')
      .filter(":visible")
      .first();
  }

  get institutionCapacityInput() {
    return cy.get(
      'input[placeholder*="Enter Institution Capacity"], input[name="institution_capacity"], input[name="institutionCapacity"], input[name="capacity"]',
    );
  }

  get websiteInput() {
    return cy.get(
      'input[placeholder*="www.examplesite.com"], input[name="website"]',
    );
  }

  get descriptionInput() {
    return cy.get(
      'textarea[placeholder*="Enter description"], textarea[name="description"], textarea[name="shortDescription"]',
    );
  }

  get locationInfoSection() {
    return cy.contains("button, div, h3", "Location Info");
  }

  get countrySelect() {
    return cy.get('button[role="combobox"]').filter(":visible").eq(0);
  }

  get stateInput() {
    return cy.get(
      'input[placeholder*="Enter State/Province"], input[name="state"]',
    );
  }

  get cityInput() {
    return cy.get('input[placeholder*="City"], input[name="city"]');
  }

  get postalCodeInput() {
    return cy.get(
      'input[placeholder*="Postal Code"], input[placeholder*="postal"], input[name="postalCode"], input[name="postal_code"]',
    );
  }

  get addNewBtn() {
    return cy.contains("button", "Add New");
  }

  get cancelBtn() {
    return cy.contains("button", "Cancel");
  }

  selectFromDropdown(value) {
    cy.get('[role="option"]')
      .should("be.visible")
      .each(($el) => {
        if ($el.text().trim() === value) {
          cy.wrap($el).click({ force: true });
          return false;
        }
      });
  }

  fillForm(data) {
    if (data.institutionCode)
      this.institutionCodeInput
        .clear({ force: true })
        .type(data.institutionCode, { force: true });
    if (data.institutionName)
      this.institutionNameInput
        .clear({ force: true })
        .type(data.institutionName, { force: true });
    if (data.legalName)
      this.legalNameInput
        .clear({ force: true })
        .type(data.legalName, { force: true });
    if (data.institutionType) {
      this.institutionTypeSelect.click({ force: true });
      this.selectFromDropdown(data.institutionType);
    }
    if (data.institutionCapacity)
      this.institutionCapacityInput
        .clear({ force: true })
        .type(data.institutionCapacity, { force: true });
    if (data.website)
      this.websiteInput
        .clear({ force: true })
        .type(data.website, { force: true });
    if (data.description)
      this.descriptionInput
        .clear({ force: true })
        .type(data.description, { force: true });
    if (data.country || data.city || data.state || data.postalCode)
      this.locationInfoSection.click({ force: true });
    if (data.city)
      this.cityInput.clear({ force: true }).type(data.city, { force: true });
    if (data.state)
      this.stateInput.clear({ force: true }).type(data.state, { force: true });
    if (data.postalCode)
      this.postalCodeInput
        .clear({ force: true })
        .type(data.postalCode, { force: true });
    if (data.country) {
      this.countrySelect.click({ force: true });
      this.selectFromDropdown(data.country);
    }
  }

  submit() {
    cy.wait(500);
    this.addNewBtn.click({ force: true });
  }

  cancel() {
    this.cancelBtn.click();
  }

  assertModalIsOpen() {
    this.modalTitle.should("be.visible");
  }
}

module.exports = AddInstitutionModalPage;