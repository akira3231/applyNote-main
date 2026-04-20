const BaseTablePage = require("../common/BaseTablePage");

class EditDocumentsModalPage extends BaseTablePage {
  get modalTitle() {
    return cy.contains("div.bg-sidebar-primary", /Edit Document/);
  }
  get nameInput() {
    return cy.get('input[placeholder*="Enter Name"], input[name="name"]');
  }
  get countriesSelect() {
    return cy.get('button[role="combobox"]').filter(":visible");
  }
  get updateBtn() {
    return cy.contains("button", "Update Document");
  }
  get cancelBtn() {
    return cy.contains("button", "Cancel");
  }

  fillForm(documentData) {
    if (documentData.name) this.updateField(this.nameInput, documentData.name);
    if (documentData.countries) this.selectCountries(documentData.countries);
  }

  submit() {
    this.updateBtn.click();
  }

  assertModalIsOpen() {
    this.modalTitle.should("be.visible");
  }
}

module.exports = EditDocumentsModalPage;
