const BaseTablePage = require("../../common/BaseTablePage");

class EditSupervisorUsersModalPage extends BaseTablePage {
  get modalTitle() {
    return cy.contains("h2, .modal-title", "Edit Supervisor User");
  }
  get firstNameInput() {
    return cy.get('input[name="first_name"]');
  }
  get lastNameInput() {
    return cy.get('input[name="last_name"]');
  }
  get designationSelect() {
    return cy
      .contains("label", /designation/i)
      .closest("div")
      .find('button[role="combobox"]')
      .filter(":visible");
  }
  get genderSelect() {
    return cy
      .contains("label", /Gender/i)
      .closest("div")
      .find('button[role="combobox"]')
      .filter(":visible");
  }
  get dateOfBirthBtn() {
    return cy.get('button[aria-haspopup="dialog"]').filter(":visible");
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
    return cy
      .contains("label", /country/i)
      .closest("div")
      .find('button[role="combobox"]')
      .filter(":visible");
  }
  get stateInput() {
    return cy.get('input[name="state_province"]');
  }
  get cityInput() {
    return cy.get('input[placeholder*="City"], input[name="city"]');
  }
  get dateOfBirthBtn() {
    return cy.get('button[aria-haspopup="dialog"]').filter(":visible");
  }
  get updateBtn() {
    return cy.contains("button", /Update Employee/);
  }
  get cancelBtn() {
    return cy.contains("button", "Cancel");
  }

  fillForm(userData) {
    if (userData.firstName)
      this.updateField(this.firstNameInput, userData.firstName);
    if (userData.lastName)
      this.updateField(this.lastNameInput, userData.lastName);
    if (userData.designation)
      this.updateRadixDropdown(this.designationSelect, userData.designation);
    if (userData.email) this.updateField(this.emailInput, userData.email);
    if (userData.gender)
      this.updateRadixDropdown(this.genderSelect, userData.gender);
    if (userData.phone) this.updateField(this.phoneInput, userData.phone);
    if (userData.dateOfBirth) this.setDate(userData.dateOfBirth);
    if (userData.country || userData.city || userData.state)
      this.locationInfoSection.click();
    if (userData.city) this.updateField(this.cityInput, userData.city);
    if (userData.state) this.updateField(this.stateInput, userData.state);
    if (userData.country)
      this.updateDropdownWithSearch(this.countrySelect, userData.country);
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

module.exports = EditSupervisorUsersModalPage;
