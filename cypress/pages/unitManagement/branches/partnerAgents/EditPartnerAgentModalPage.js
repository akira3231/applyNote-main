const BaseTablePage = require("../../../common/BaseTablePage");

class EditPartnerAgentModalPage extends BaseTablePage {
  get modalTitle() {
    return cy.contains("h2, .modal-title", /Edit PartnerAgent/);
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
    return cy
      .contains("label, div", /country/i)
      .parent()
      .find('button[role="combobox"]');
  }
  get updateBtn() {
    return cy.contains("button", "Update Partner Agent");
  }

  fillForm(partnerAgentsData) {
    if (partnerAgentsData.displayName)
      this.updateField(this.displayNameInput, partnerAgentsData.displayName);
    if (partnerAgentsData.legalName)
      this.updateField(this.legalNameInput, partnerAgentsData.legalName);
    if (partnerAgentsData.email)
      this.updateField(this.emailInput, partnerAgentsData.email);
    if (partnerAgentsData.phone)
      this.updateField(this.phoneInput, partnerAgentsData.phone);
    if (partnerAgentsData.currency)
      this.updateDropdownWithSearch(
        this.currencySelect,
        partnerAgentsData.currency,
      );
    if (partnerAgentsData.commissionRate)
      this.updateField(
        this.commissionRateInput,
        partnerAgentsData.commissionRate,
      );
    if (
      partnerAgentsData.country ||
      partnerAgentsData.city ||
      partnerAgentsData.state
    )
      this.locationInfoSection.click();
    if (partnerAgentsData.city)
      this.updateField(this.cityInput, partnerAgentsData.city);
    if (partnerAgentsData.state)
      this.updateField(this.stateInput, partnerAgentsData.state);
    if (partnerAgentsData.country)
      this.updateDropdownWithSearch(
        this.countrySelect,
        partnerAgentsData.country,
      );
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

module.exports = EditPartnerAgentModalPage;
