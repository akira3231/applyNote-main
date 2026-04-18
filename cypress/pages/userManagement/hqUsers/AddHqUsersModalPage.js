class AddHqUsersModalPage {
  get modalTitle() {
    return cy.contains("h2, .modal-title", "Add HQ User");
  }

  get firstNameInput() {
    return cy.get(
      'input[placeholder*="Enter First Name and Middle Name"], input[name="firstName"]',
    );
  }

  get lastNameInput() {
    return cy.get(
      'input[placeholder*="Enter Last Name"], input[name="lastName"]',
    );
  }

  get designationSelect() {
    return cy
      .get(
        'button[id="designation"], button[role="combobox"][aria-controls*="designation"]',
      )
      .filter(":visible");
  }

  get emailInput() {
    return cy.get(
      'input[placeholder*="example@gmail.com"], input[type="email"], input[name="email"]',
    );
  }

  get phoneInput() {
    return cy.get('input[placeholder*="Enter Phone"], input[name="phone"]');
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

  get addNewBtn() {
    return cy.contains("button", "Add New");
  }

  get cancelBtn() {
    return cy.contains("button", "Cancel");
  }

  selectFromDropdown(value) {
    cy.get("body")
      .find('[role="option"]')
      .should("be.visible")
      .contains(value)
      .click({ force: true });
  }

  fillForm(userData) {
    if (userData.firstName)
      this.firstNameInput.clear().type(userData.firstName);

    if (userData.lastName) this.lastNameInput.clear().type(userData.lastName);

    if (userData.email) this.emailInput.clear().type(userData.email);

    if (userData.phone) this.phoneInput.clear().type(userData.phone);

    if (userData.designation) {
      this.designationSelect.click();
      this.selectFromDropdown(userData.designation);
    }

    if (userData.country || userData.city || userData.state)
      this.locationInfoSection.click();

    if (userData.city) this.cityInput.clear().type(userData.city);

    if (userData.state) this.stateInput.clear().type(userData.state);

    if (userData.country) {
      this.countrySelect.click();
      this.selectFromDropdown(userData.country);
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

module.exports = AddHqUsersModalPage;
