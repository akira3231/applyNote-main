class AddDocumentsModalPage {
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
  selectCountries(countries) {
    if (!countries || !countries.length) return;

    this.countriesSelect.click();

    countries.forEach((country) => {
      cy.document().then((doc) => {
        cy.wrap(doc.body)
          .find('[role="option"]', { timeout: 10000 })
          .contains(country)
          .then(($el) => {
            $el[0].scrollIntoView({ block: "center" });
            $el[0].click();
          });
      });
    });
  }

  fillForm(documentData) {
    if (documentData.name) this.nameInput.clear().type(documentData.name);
    if (documentData.countries) {
      this.countriesSelect.click();
      this.selectCountries(documentData.countries);
    }
  }
  assertModalIsOpen() {
    this.modalTitle.should("be.visible");
  }
}

module.exports = AddDocumentsModalPage;
