const BaseTablePage = require("../../common/BaseTablePage");

class EditSubUnitUsersModalPage extends BaseTablePage {
  get modalTitle() {
    return cy.contains("h2, .modal-title", "Edit Sub Unit User");
  }
  get firstNameInput() {
    return cy.get(' input[name="first_name"]');
  }
  get lastNameInput() {
    return cy.get('input[name="last_name"]');
  }
  get branchUnitSelect() {
    return cy.get('button[id="subUnit"]').filter(":visible");
  }
  get subUnitSelect() {
    return cy.get('button[aria-haspopup="dialog"]').filter(":visible").first();
  }
  get designationSelect() {
    return cy.get('button[id="designation"]').filter(":visible");
  }
  get commissionRateInput() {
    return cy.get('input[name="commissionRate"]');
  }
  get emailInput() {
    return cy.get('input[name="email"]');
  }
  get phoneInput() {
    return cy.get('input[name="phone"]');
  }
  get genderSelect() {
    return cy
      .contains("label", /Gender/i)
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
    if (userData.branchUnit)
      this.updateRadixDropdown(this.branchUnitSelect, userData.branchUnit);
    if (userData.subUnit) {
      cy.wait(1000);
      this.updateDropdownWithSearch(this.subUnitSelect, userData.subUnit);
    }
    if (userData.designation)
      this.updateRadixDropdown(this.designationSelect, userData.designation);
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

module.exports = EditSubUnitUsersModalPage;
