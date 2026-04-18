class EditUnitUsersModalPage {
  get modalTitle() {
    return cy.contains("h2, .modal-title", "Edit Unit User");
  }

  get firstNameInput() {
    return cy.get(
      'input[placeholder*="Enter First Name"], input[name="firstName"]',
    );
  }

  get lastNameInput() {
    return cy.get(
      'input[placeholder*="Enter Last Name"], input[name="lastName"]',
    );
  }

  get designationSelect() {
    return cy
      .get(
        'button[id="designation"], button[role="combobox"][aria-controls*="designation"]',
      )
      .filter(":visible");
  }

  get genderSelect() {
    return cy.get('button[role="combobox"]').filter(":visible").eq(-1);
  }
  get unitSelect() {
    return cy
      .get(
        'button[id="unitType"], button[role="combobox"][aria-controls*="unitType"]',
      )
      .filter(":visible");
  }

  get unitNameSelect() {
    return cy.get('button[role="combobox"]').filter(":visible").eq(2);
  }

  get commissionRateInput() {
    return cy.get(
      'input[placeholder*="Commision Rate"], input[name="commisionRate"]',
    );
  }

  get emailInput() {
    return cy.get(
      'input[placeholder*="example@gmail.com"], input[type="email"], input[name="email"]',
    );
  }

  get phoneInput() {
    return cy.get('input[placeholder*="Enter Phone"], input[name="phone"]');
  }

  get addressInfoSection() {
    return cy.contains("button, div, h3", "Address Info");
  }

  get countrySelect() {
    return cy.get('button[role="combobox"]').filter(":visible").eq(-1);
  }

  get stateInput() {
    return cy.get('input[name="state_province"]');
  }

  get cityInput() {
    return cy.get('input[placeholder*="City"], input[name="city"]');
  }

  get dateOfBirthBtn() {
    return cy
      .contains("label", /date of birth/i)
      .closest("div")
      .find('button[aria-haspopup="dialog"]');
  }

  get updateBtn() {
    return cy.contains("button", /Update Employee/);
  }

  setDate(dateString) {
    if (!dateString) return;

    const [year, month, day] = dateString.split("-");
    const monthIndex = parseInt(month) - 1;

    this.dateOfBirthBtn.click();

    cy.get("select.rdp-months_dropdown").select(String(monthIndex));
    cy.get("select.rdp-years_dropdown").select(year);

    cy.get(`[data-day="${year}-${month}-${day}"] button`).click();
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

  selectUnitName(value) {
    if (!value) return;
    // Wait for dynamic options to load after unitType is selected
    this.unitNameSelect.click();
    cy.get('[role="option"]', { timeout: 15000 })
      .should("have.length.gt", 0)
      .contains(value)
      .click({ force: true });
  }

  updateDropdown(trigger, value, label = "dropdown") {
    if (!value) return;

    trigger
      .should("be.visible")
      .invoke("text")
      .then((text) => {
        const current = text.replace(/\s+/g, " ").trim();

        if (current === value) {
          return;
        }

        cy.contains(
          'button[role="combobox"]',
          current || { timeout: 10000 },
        ).click({ force: true });

        cy.document().then((doc) => {
          cy.wrap(doc.body)
            .find('[role="option"]', { timeout: 10000 })
            .contains(value)
            .click({ force: true });
        });
      });
  }

  fillForm(userData) {
    if (userData.firstName)
      this.updateField(this.firstNameInput, userData.firstName);

    if (userData.lastName)
      this.updateField(this.lastNameInput, userData.lastName);
    if (userData.designation)
      this.updateDropdown(this.designationSelect, userData.designation);
    if (userData.unitType)
      this.updateDropdown(this.unitSelect, userData.unitType);
    if (userData.unitName) {
      cy.wait(500);
      this.updateDropdown(this.unitNameSelect, userData.unitName);
    }

    if (userData.commissionRate)
      this.updateField(this.commissionRateInput, userData.commissionRate);

    if (userData.email) this.updateField(this.emailInput, userData.email);

    if (userData.phone) this.updateField(this.phoneInput, userData.phone);
    if (userData.gender)
      this.updateDropdown(this.genderSelect, userData.gender);
    if (userData.dateOfBirth) this.setDate(userData.dateOfBirth);
    if (userData.country || userData.city || userData.state)
      this.addressInfoSection.click();

    if (userData.city) this.updateField(this.cityInput, userData.city);

    if (userData.state) this.updateField(this.stateInput, userData.state);

    if (userData.country)
      this.updateDropdown(this.countrySelect, userData.country);
  }

  submit() {
    this.updateBtn.click();
  }

  assertModalIsOpen() {
    this.modalTitle.should("be.visible");
  }
}

module.exports = EditUnitUsersModalPage;
