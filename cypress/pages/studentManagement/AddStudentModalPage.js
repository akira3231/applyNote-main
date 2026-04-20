class AddStudentModalPage {
  get modalTitle() {
    return cy.contains("h2, .modal-title", "Add Student");
  }
  get firstNameInput() {
    return cy.get('input[placeholder*="Enter First Name and Middle Name"], input[name="firstName"]');
  }
  get lastNameInput() {
    return cy.get('input[placeholder*="Enter Last Name"], input[name="lastName"]');
  }
  get emailInput() {
    return cy.get('input[placeholder*="example@gmail.com"], input[type="email"], input[name="email"]');
  }
  get phoneInput() {
    return cy.get('input[placeholder*="Enter Phone"], input[name="phone"]');
  }
  get genderSelect() {
    return cy.get('button[role="combobox"]').filter(":visible").first();
  }
  get dateOfBirthInput() {
    return cy.get(':nth-child(8) > .inline-flex');
  }
  get descriptionInput() {
    return cy.get('textarea[placeholder*="Enter description"], textarea[name="description"]');
  }
  get locationInfoSection() {
    return cy.contains("button, div, h3", "Location Info");
  }
  get countrySelect() {
    return cy.get('button[role="combobox"]').filter(":visible").eq(0);
  }
  get stateInput() {
    return cy.get('input[placeholder*="Enter State/Province"], input[name="state"]');
  }
  get cityInput() {
    return cy.get('input[placeholder*="City"], input[name="city"]');
  }
  get addNewBtn() {
    return cy.contains("button", "Add New");
  }

  selectFromDropdown(value) {
    cy.get("body").find('[role="option"]').should("be.visible").contains(value).click({ force: true });
  }

  fillForm(data) {
    if (data.firstName) this.firstNameInput.clear().type(data.firstName);
    if (data.lastName) this.lastNameInput.clear().type(data.lastName);
    if (data.email) this.emailInput.clear().type(data.email);
    if (data.phone) this.phoneInput.clear().type(data.phone);
    if (data.gender) { this.genderSelect.click(); this.selectFromDropdown(data.gender); }
    if (data.dateOfBirth) this.dateOfBirthInput.clear().type(data.dateOfBirth);
    if (data.description) this.descriptionInput.clear().type(data.description);
    if (data.country || data.city || data.state) this.locationInfoSection.click();
    if (data.city) this.cityInput.clear().type(data.city);
    if (data.state) this.stateInput.clear().type(data.state);
    if (data.country) { this.countrySelect.click(); this.selectFromDropdown(data.country); }
  }

  submit() { this.addNewBtn.click(); }
  assertModalIsOpen() { this.modalTitle.should("be.visible"); }
}

module.exports = AddStudentModalPage;