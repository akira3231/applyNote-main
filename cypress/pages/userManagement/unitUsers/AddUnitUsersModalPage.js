const BaseTablePage = require("../../common/BaseTablePage");

class AddUnitUsersModalPage extends BaseTablePage {
  get modalTitle() {
    return cy.contains("h2, .modal-title", "Add Unit User");
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
      .find('button[role="combobox"]');
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
    if (userData.designation) {
      this.designationSelect.click();
      this.selectFromDropdown(userData.designation);
    }
    if (userData.unitType) {
      this.unitSelect.click();
      this.selectFromDropdown(userData.unitType);
    }
    if (userData.unitName) {
      cy.wait(500);
      this.selectWithSearch(this.unitNameSelect, userData.unitName);
    }
    if (userData.commissionRate)
      this.commissionRateInput.clear().type(userData.commissionRate);
    if (userData.email) this.emailInput.clear().type(userData.email);
    if (userData.phone) this.phoneInput.clear().type(userData.phone);
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

module.exports = AddUnitUsersModalPage;
