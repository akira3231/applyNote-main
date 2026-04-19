const BaseTablePage = require("../../common/BaseTablePage");

class EditHqUsersModalPage extends BaseTablePage {
  get modalTitle() {
    return cy.contains("h2, .modal-title", "Edit HQ User");
  }
  get firstNameInput() {
    return cy.get(
      'input[placeholder*="Enter First Name"], input[name="firstName"]',
    );
  }
  get lastNameInput() {
    return cy.get(
      'input[placeholder*="Enter Last Name"], input[name="lastName"]',
    );
  }
  get emailInput() {
    return cy.get(
      'input[placeholder*="example@gmail.com"], input[type="email"], input[name="email"]',
    );
  }
  get phoneInput() {
    return cy.get('input[placeholder*="Enter Phone"], input[name="phone"]');
  }
  get designationSelect() {
    return cy
      .get(
        'button[id="designation"], button[role="combobox"][aria-controls*="designation"]',
      )
      .filter(":visible");
  }
  get dateOfBirthBtn() {
    return cy
      .contains("label", /date of birth/i)
      .closest("div")
      .find('button[aria-haspopup="dialog"]');
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
  get countrySelect() {
    return cy
      .contains("label", /country/i)
      .closest("div")
      .find('button[role="combobox"]');
  }
  get updateBtn() {
    return cy.contains("button", /Update HQ User/);
  }
  get cancelBtn() {
    return cy.contains("button", "Cancel");
  }

  fillForm(userData) {
    if (userData.firstName)
      this.updateField(this.firstNameInput, userData.firstName);
    if (userData.lastName)
      this.updateField(this.lastNameInput, userData.lastName);
    if (userData.email) this.updateField(this.emailInput, userData.email);
    if (userData.phone) this.updateField(this.phoneInput, userData.phone);
    if (userData.designation)
      this.updateRadixDropdown(this.designationSelect, userData.designation);
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

module.exports = EditHqUsersModalPage;
