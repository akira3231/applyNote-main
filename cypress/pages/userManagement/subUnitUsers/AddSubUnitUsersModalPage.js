const BaseTablePage = require("../../common/BaseTablePage");

class AddSubUnitUsersModalPage extends BaseTablePage {
  get modalTitle() {
    return cy.contains("h2, .modal-title", "Add Sub Unit User");
  }
  get firstNameInput() {
    return cy.get('input[name="first_name"]');
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
    return cy.contains("button", "Pick date");
  }
  get addressInfoSection() {
    return cy.contains("button, div, h3", "Address Info");
  }
  get countrySelect() {
    return cy.contains('button[role="combobox"]', "Country");
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

  fillForm(userData) {
    if (userData.firstName)
      this.firstNameInput.clear().type(userData.firstName);
    if (userData.lastName) this.lastNameInput.clear().type(userData.lastName);
    if (userData.branchUnit) {
      this.branchUnitSelect.click();
      this.selectFromDropdown(userData.branchUnit);
    }
    if (userData.subUnit) {
      cy.wait(500);
      this.subUnitSelect.click();
      this.selectFromDropdown(userData.subUnit);
    }
    if (userData.designation) {
      this.designationSelect.click();
      this.selectFromDropdown(userData.designation);
    }
    if (userData.commissionRate)
      this.commissionRateInput.clear().type(userData.commissionRate);
    if (userData.email) this.emailInput.clear().type(userData.email);
    if (userData.phone) this.phoneInput.clear().type(userData.phone);
    if (userData.gender) {
      this.genderSelect.click();
      this.selectFromDropdown(userData.gender);
    }
    if (userData.dateOfBirth) this.setDate(userData.dateOfBirth);
    if (userData.country || userData.city || userData.state)
      this.addressInfoSection.click();
    if (userData.city) this.cityInput.clear().type(userData.city);
    if (userData.state) this.stateInput.clear().type(userData.state);
    if (userData.country) {
      this.selectWithSearch(this.countrySelect, userData.country);
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

module.exports = AddSubUnitUsersModalPage;
