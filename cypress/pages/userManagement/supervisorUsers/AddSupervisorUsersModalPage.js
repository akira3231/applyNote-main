class AddSupervisorUsersModalPage {
  get modalTitle() {
    return cy.contains("h2, .modal-title", "Add Supervisor User");
  }

  get firstNameInput() {
    return cy.get('input[name="first_name"]');
  }

  get lastNameInput() {
    return cy.get('input[name="last_name"]');
  }
  get designationSelect() {
    return cy.get('button[role="combobox"]').filter(":visible").eq(0);
  }

  get genderSelect() {
    return cy.get('button[role="combobox"]').filter(":visible").eq(1);
  }

  get dateOfBirthBtn() {
    return cy.get('button[aria-haspopup="dialog"]').filter(":visible");
  }

  setDate(dateString) {
    if (!dateString) return;

    const [year, month, day] = dateString.split("-");
    const monthIndex = parseInt(month) - 1;

    this.dateOfBirthBtn.click();

    cy.get("select.rdp-months_dropdown").select(String(monthIndex));
    cy.get("select.rdp-years_dropdown").select(year);

    cy.get(`[data-day="${year}-${month}-${day}"] button`).click();
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
    return cy.get('button[role="combobox"]').filter(":visible").eq(-1);
  }
  get stateInput() {
    return cy.get('input[name="state_province"]');
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

    if (userData.designation) {
      this.designationSelect.click();
      this.selectFromDropdown(userData.designation);
    }
    if (userData.email) this.emailInput.clear().type(userData.email);
    if (userData.gender) {
      this.genderSelect.click();
      this.selectFromDropdown(userData.gender);
    }
    if (userData.phone) this.phoneInput.clear().type(userData.phone);
    if (userData.dateOfBirth) this.setDate(userData.dateOfBirth);
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

module.exports = AddSupervisorUsersModalPage;
