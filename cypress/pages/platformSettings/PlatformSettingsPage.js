const BaseTablePage = require("../common/BaseTablePage");

class PlatformSettingsPage extends BaseTablePage {
  get settingsMenu() {
    return cy.get(':nth-child(6) > .justify-center');
  }

  get platformSettingsLink() {
    return cy.get('[href="/platform-settings"]');
  }

  get displayNameInput() {
    return cy.get('[name="displayName"]');
  }

  get legalNameInput() {
    return cy.get('[name="legalName"]');
  }

  get websiteInput() {
    return cy.get('[name="website"]');
  }

  get emailInput() {
    return cy.get('[name="email"]');
  }

  get phoneInput() {
    return cy.get('[name="phone"]');
  }

  get descriptionInput() {
    return cy.get('[name="description"]');
  }

  get streetInput() {
    return cy.get('[name="street"]');
  }

  get aptSuiteInput() {
    return cy.get('[name="aptSuite"]');
  }

  get cityInput() {
    return cy.get('[name="city"]');
  }

  get stateInput() {
    return cy.get('[name="state"]');
  }

  get postalCodeInput() {
    return cy.get('[name="postalCode"]');
  }

  get countryButton() {
    return cy.get(':nth-child(5) > :nth-child(6) > .inline-flex');
  }

  get saveButton() {
    return cy.contains('button', 'Save Changes');
  }

  get successMessage() {
    return cy.contains('Platform settings updated successfully');
  }

  openSettings() {
    this.settingsMenu.click();
  }

  goToPlatformSettings() {
    this.platformSettingsLink.click();
  }

  fillPlatformSettings(data) {
    this.displayNameInput.clear().type(data.displayName);
    this.legalNameInput.clear().type(data.legalName);
    this.websiteInput.clear().type(data.website);
    this.emailInput.clear().type(data.email);
    this.phoneInput.clear().type(data.phone);
    this.descriptionInput.clear().type(data.description);
    this.streetInput.clear().type(data.street);
    this.aptSuiteInput.clear().type(data.aptSuite);
    this.cityInput.clear().type(data.city);
    this.stateInput.clear().type(data.state);
    this.postalCodeInput.clear().type(data.postalCode);
    this.selectWithSearch(this.countryButton, data.country);
  }

  clickSave() {
    this.saveButton.click();
  }

  verifySuccessMessage() {
    this.successMessage.should('be.visible');
  }
}

module.exports = PlatformSettingsPage;