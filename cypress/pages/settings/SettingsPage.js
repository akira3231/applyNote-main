const BaseTablePage = require("../common/BaseTablePage");

class SettingsPage extends BaseTablePage {
  get settingsMenu() {
    return cy.get(':nth-child(6) > .justify-center');
  }

  get profileLink() {
    return cy.get('[href="/settings/profile"]');
  }

  get firstNameInput() {
    return cy.get('[name="firstName"]');
  }

  get lastNameInput() {
    return cy.get('[name="lastName"]');
  }

  get phoneInput() {
    return cy.get('[name="phone"]');
  }

  get dobButton() {
    return cy.get(':nth-child(10) > .inline-flex');
  }

//   get descriptionInput() {
//     return cy.get('[name="description"]');
//   }

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
    return cy.get(':nth-child(6) > .inline-flex');
  }

  get saveButton() {
    return cy.contains('button', 'Save Changes');
  }

  openSettings() {
    this.settingsMenu.click();
  }

  goToProfile() {
    this.profileLink.click();
  }

  fillPersonalInfo(firstName, lastName, phone, dob) {
    this.firstNameInput.clear().type(firstName);
    this.lastNameInput.clear().type(lastName);
    this.phoneInput.clear().type(phone);
    this.setDate(this.dobButton, dob);
    // this.descriptionInput.clear().type(description);
  }

  fillAddress(street, aptSuite, city, state, postalCode, country) {
    this.streetInput.clear().type(street);
    this.aptSuiteInput.clear().type(aptSuite);
    this.cityInput.clear().type(city);
    this.stateInput.clear().type(state);
    this.postalCodeInput.clear().type(postalCode);
    this.selectWithSearch(this.countryButton, country);
  }

  saveProfile() {
    this.saveButton.click();
  }
}

module.exports = SettingsPage;