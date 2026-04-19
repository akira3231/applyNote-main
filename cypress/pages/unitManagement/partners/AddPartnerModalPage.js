const BaseTablePage = require("../../common/BaseTablePage");

class AddPartnerModalPage extends BaseTablePage {
  get modalTitle() {
    return cy.contains("h2, .modal-title", "Add Partner");
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
  get currencySelect() {
    return cy.contains('button[role="combobox"]', "Select Currency");
  }
  get commissionRateInput() {
    return cy.get(
      'input[placeholder*="Commission Rate"], input[name="commissionRate"]',
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

  fillForm(partnerData) {
    if (partnerData.displayName)
      this.displayNameInput.clear().type(partnerData.displayName);
    if (partnerData.legalName)
      this.legalNameInput.clear().type(partnerData.legalName);
    if (partnerData.email) this.emailInput.clear().type(partnerData.email);
    if (partnerData.phone) this.phoneInput.clear().type(partnerData.phone);
    if (partnerData.currency)
      this.selectWithSearch(this.currencySelect, partnerData.currency);
    if (partnerData.commissionRate)
      this.commissionRateInput.clear().type(partnerData.commissionRate);
    if (partnerData.country || partnerData.city || partnerData.state)
      this.locationInfoSection.click();
    if (partnerData.city) this.cityInput.clear().type(partnerData.city);
    if (partnerData.state) this.stateInput.clear().type(partnerData.state);
    if (partnerData.country)
      this.selectWithSearch(this.countrySelect, partnerData.country);
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

module.exports = AddPartnerModalPage;
