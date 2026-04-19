const BaseTablePage = require("../../common/BaseTablePage");

class EditBranchModalPage extends BaseTablePage {
  get modalTitle() {
    return cy.contains("h2, .modal-title", /Edit Branch|Update Branch/);
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
    return cy
      .contains("label, div", /currency/i)
      .parent()
      .find('button[role="combobox"]');
  }
  get countrySelect() {
    return cy.get('button[role="combobox"]').filter(":visible");
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
  get updateBtn() {
    return cy.contains("button", "Update Branch");
  }
  get cancelBtn() {
    return cy.contains("button", "Cancel");
  }

  fillForm(branchData) {
    if (branchData.displayName)
      this.updateField(this.displayNameInput, branchData.displayName);
    if (branchData.legalName)
      this.updateField(this.legalNameInput, branchData.legalName);
    if (branchData.email) this.updateField(this.emailInput, branchData.email);
    if (branchData.phone) this.updateField(this.phoneInput, branchData.phone);
    if (branchData.currency) {
      this.updateDropdownWithSearch(this.currencySelect, branchData.currency, "currency");
    }
    if (branchData.commissionRate)
      this.updateField(this.commissionRateInput, branchData.commissionRate);
    if (branchData.country || branchData.city || branchData.state)
      this.locationInfoSection.click();
    if (branchData.city) this.updateField(this.cityInput, branchData.city);
    if (branchData.state) this.updateField(this.stateInput, branchData.state);
    if (branchData.country) {
      this.updateDropdownWithSearch(this.countrySelect, branchData.country, "country");
    }
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

module.exports = EditBranchModalPage;
