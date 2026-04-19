class EditDocumentsModalPage {
  get modalTitle() {
    return cy.contains(
      "div.bg-sidebar-primary",
      /Edit Document|Update Document/,
    );
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

  updateField(input, newValue) {
    if (!newValue) return;

    input.then(($el) => {
      const currentValue = $el.val?.() ?? $el.text?.();
      if (currentValue !== newValue) {
        cy.wrap($el).clear().type(String(newValue));
      }
    });
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
