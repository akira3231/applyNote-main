class EditSupervisorUsersModalPage {
  get modalTitle() {
    return cy.contains("h2, .modal-title", "Edit Supervisor User");
  }

  get firstNameInput() {
    return cy.get('input[name="first_name"]');
  }

  get lastNameInput() {
    return cy.get('input[name="last_name"]');
  }
  get designationSelect() {
    return cy.get('button[role="combobox"]').filter(":visible").eq(0);
  }

  get genderSelect() {
    return cy.get('button[role="combobox"]').filter(":visible").eq(1);
  }

  get dateOfBirthBtn() {
    return cy.get('button[aria-haspopup="dialog"]').filter(":visible");
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

  get emailInput() {
    return cy.get(
      'input[placeholder*="example@gmail.com"], input[type="email"], input[name="email"]',
    );
  }

  get phoneInput() {
    return cy.get('input[placeholder*="Enter Phone"], input[name="phone"]');
  }

  get locationInfoSection() {
    return cy.contains("button, div, h3", "Location Info");
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
    return cy.get('button[aria-haspopup="dialog"]').filter(":visible");
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

        cy.get('[role="option"]', { timeout: 10000 })
          .contains(value)
          .scrollIntoView({ block: "center" })
          .should("be.visible")
          .click({ force: true });
      });
  }

  fillForm(userData) {
    if (userData.firstName)
      this.updateField(this.firstNameInput, userData.firstName);

    if (userData.lastName)
      this.updateField(this.lastNameInput, userData.lastName);

    if (userData.designation)
      this.updateDropdown(this.designationSelect, userData.designation);
    if (userData.email) this.updateField(this.emailInput, userData.email);
    if (userData.gender)
      this.updateDropdown(this.genderSelect, userData.gender);
    if (userData.phone) this.updateField(this.phoneInput, userData.phone);
    if (userData.dateOfBirth) this.setDate(userData.dateOfBirth);

    if (userData.country || userData.city || userData.state)
      this.locationInfoSection.click();

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

module.exports = EditSupervisorUsersModalPage;
