const BaseTablePage = require("../../common/BaseTablePage");

class EditUnitUsersModalPage extends BaseTablePage {
  get modalTitle() {
    return cy.contains("h2, .modal-title", "Edit Unit User");
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
  get designationSelect() {
    return cy
      .get(
        'button[id="designation"], button[role="combobox"][aria-controls*="designation"]',
      )
      .filter(":visible");
  }
  get genderSelect() {
    return cy
      .contains("label", /gender/i)
      .closest("div")
      .find('button[role="combobox"]')
      .filter(":visible");
  }
  get dateOfBirthBtn() {
    return cy
      .contains("label", /date of birth/i)
      .closest("div")
      .find('button[aria-haspopup="dialog"]');
  }
  get unitSelect() {
    return cy
      .get(
        'button[id="unitType"], button[role="combobox"][aria-controls*="unitType"]',
      )
      .filter(":visible");
  }
  get unitNameSelect() {
    return cy
      .contains("label", /Unit Name/i)
      .closest("div")
      .find('button[role="combobox"]')
      .filter(":visible");
  }
  get commissionRateInput() {
    return cy.get(
      'input[placeholder*="Commision Rate"], input[name="commisionRate"]',
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
  get addressInfoSection() {
    return cy.contains("button, div, h3", "Address Info");
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
    if (userData.unitType)
      this.updateRadixDropdown(this.unitSelect, userData.unitType);
    if (userData.unitName) {
      cy.wait(500);
      this.updateDropdownWithSearch(this.unitNameSelect, userData.unitName);
    }
    if (userData.commissionRate)
      this.updateField(this.commissionRateInput, userData.commissionRate);
    if (userData.email) this.updateField(this.emailInput, userData.email);
    if (userData.phone) this.updateField(this.phoneInput, userData.phone);
    if (userData.gender)
      this.updateRadixDropdown(this.genderSelect, userData.gender);
    if (userData.dateOfBirth) this.setDate(userData.dateOfBirth);
    if (userData.country || userData.city || userData.state)
      this.addressInfoSection.click();
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

module.exports = EditUnitUsersModalPage;
