const BaseTablePage = require("../common/BaseTablePage");

class AddDocumentsModalPage extends BaseTablePage {
  get modalTitle() {
    return cy.contains("div.bg-sidebar-primary", "Add Document");
  }
  get nameInput() {
    return cy.get('input[placeholder*="Enter Name"], input[name="name"]');
  }
  get countriesSelect() {
    return cy.contains('button[role="combobox"]', "Select countries...");
  }
  get addNewBtn() {
    return cy.contains("button", "Add New");
  }
  get cancelBtn() {
    return cy.contains("button", "Cancel");
  }

  submit() {
    this.addNewBtn.click();
  }

  cancel() {
    this.cancelBtn.click();
  }

  fillForm(documentData) {
    if (documentData.name) this.nameInput.clear().type(documentData.name);
    if (documentData.countries) {
      this.selectCountries(documentData.countries);
    }
  }

  assertModalIsOpen() {
    this.modalTitle.should("be.visible");
  }
}

module.exports = AddDocumentsModalPage;
