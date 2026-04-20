const BaseTablePage = require("../../common/BaseTablePage");

class AddSchoolModalPage extends BaseTablePage {
  get modalTitle() {
    return cy.contains("h2, .modal-title", "Add School");
  }
  get displayNameInput() {
    return cy.get(
      'input[placeholder*="Display Name"], input[name="displayName"]',
    );
  }
  get legalNameInput() {
    return cy.get('input[placeholder*="Legal Name"], input[name="legalName"]');
  }
  get emailInput() {
    return cy.get('input[placeholder*="Email"], input[type="email"]');
  }
  get phoneInput() {
    return cy.get('input[placeholder*="Phone"], input[name="phone"]');
  }
  get commissionPointInput() {
    return cy.get(
      'input[placeholder*="Commission Point"], input[name="commissionPoint"]',
    );
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
    return cy.contains('button[role="combobox"]', "Select Country");
  }
  get addNewBtn() {
    return cy.contains("button", "Add New");
  }
  get cancelBtn() {
    return cy.contains("button", "Cancel");
  }

  fillForm(schoolData) {
    if (schoolData.displayName)
      this.displayNameInput.clear().type(schoolData.displayName);
    if (schoolData.legalName)
      this.legalNameInput.clear().type(schoolData.legalName);
    if (schoolData.email) this.emailInput.clear().type(schoolData.email);
    if (schoolData.phone) this.phoneInput.clear().type(schoolData.phone);
    if (schoolData.commissionPoint)
      this.commissionPointInput.clear().type(schoolData.commissionPoint);
    if (schoolData.country || schoolData.city || schoolData.state)
      this.locationInfoSection.click();
    if (schoolData.city) this.cityInput.clear().type(schoolData.city);
    if (schoolData.state) this.stateInput.clear().type(schoolData.state);
    if (schoolData.country)
      this.selectWithSearch(this.countrySelect, schoolData.country);
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

module.exports = AddSchoolModalPage;
