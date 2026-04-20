class EditCampusModalPage {
  get modalTitle() {
    return cy.contains("h2, .modal-title", "Edit Campus");
  }

  get campusNameInput() {
    return cy.get(
      'input[placeholder*="Enter Campus Name"], input[name="campusName"], input[name="campus_name"]',
    ).filter(":visible");
  }

  get emailInput() {
    return cy.get(
      'input[placeholder*="example@gmail.com"], input[type="email"], input[name="email"]',
    ).filter(":visible");
  }

  get phoneInput() {
    return cy.get(
      'input[placeholder*="Enter Phone number"], input[placeholder*="Enter Phone"], input[name="phone"]',
    ).filter(":visible");
  }

  get descriptionInput() {
    return cy.get(
      'textarea[placeholder*="Enter description"], textarea[name="description"]',
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

  get saveBtn() {
    return cy.contains("button", /save|update/i).filter(":visible");
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
    this.modalTitle.should("be.visible");
    cy.wait(400);

    if (data.campusName)
      this.campusNameInput
        .scrollIntoView()
        .clear({ force: true })
        .type(data.campusName, { force: true });
    if (data.email)
      this.emailInput
        .scrollIntoView()
        .clear({ force: true })
        .type(data.email, { force: true });
    if (data.phone)
      this.phoneInput
        .scrollIntoView()
        .clear({ force: true })
        .type(data.phone, { force: true });
    if (data.description)
      this.descriptionInput
        .scrollIntoView()
        .clear({ force: true })
        .type(data.description, { force: true });
    if (data.country || data.city || data.state)
      this.locationInfoSection.click({ force: true });
    if (data.city)
      this.cityInput
        .scrollIntoView()
        .clear({ force: true })
        .type(data.city, { force: true });
    if (data.state)
      this.stateInput
        .scrollIntoView()
        .clear({ force: true })
        .type(data.state, { force: true });
    if (data.country) {
      this.countrySelect.click({ force: true });
      this.selectFromDropdown(data.country);
    }
  }

  submit() {
    cy.wait(500);
    this.saveBtn.click({ force: true });
  }

  cancel() {
    this.cancelBtn.click();
  }

  assertModalIsOpen() {
    this.modalTitle.should("be.visible");
  }
}

module.exports = EditCampusModalPage;