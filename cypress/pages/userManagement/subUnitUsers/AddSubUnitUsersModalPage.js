class AddSubUnitUsersModalPage {
  get modalTitle() {
    return cy.contains("h2, .modal-title", "Add Sub Unit User");
  }

  get firstNameInput() {
    return cy.get('input[name="first_name"]');
  }

  get lastNameInput() {
    return cy.get('input[name="last_name"]');
  }

  get branchUnitSelect() {
    return cy.get('button[id="subUnit"]').filter(":visible");
  }

  get subUnitSelect() {
    return cy.get('button[aria-haspopup="dialog"]').filter(":visible").first();
  }

  get designationSelect() {
    return cy.get('button[id="designation"]').filter(":visible");
  }

  get commissionRateInput() {
    return cy.get('input[name="commissionRate"]');
  }

  get emailInput() {
    return cy.get('input[name="email"]');
  }

  get phoneInput() {
    return cy.get('input[name="phone"]');
  }

  get genderSelect() {
    return cy.get('button[role="combobox"]').filter(":visible").eq(4);
  }

  get dateOfBirthBtn() {
    return cy.contains("button", "Pick date");
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
  get addNewBtn() {
    return cy.contains("button", "Add New");
  }

  get cancelBtn() {
    return cy.contains("button", "Cancel");
  }

  selectFromDropdown(value) {
    cy.document().then((doc) => {
      cy.wrap(doc.body)
        .find('[role="option"]', { timeout: 10000 })
        .contains(value)
        .then(($el) => {
          $el[0].scrollIntoView({ block: "center" });
        })
        .should("be.visible")
        .click({ force: true });
    });
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

  fillForm(userData) {
    if (userData.firstName)
      this.firstNameInput.clear().type(userData.firstName);

    if (userData.lastName) this.lastNameInput.clear().type(userData.lastName);

    if (userData.branchUnit) {
      this.branchUnitSelect.click();
      this.selectFromDropdown(userData.branchUnit);
    }

    if (userData.subUnit) {
      cy.wait(1000);
      this.subUnitSelect.click();
      this.selectFromDropdown(userData.subUnit);
    }

    if (userData.designation) {
      this.designationSelect.click();
      this.selectFromDropdown(userData.designation);
    }

    if (userData.commissionRate)
      this.commissionRateInput.clear().type(userData.commissionRate);

    if (userData.email) this.emailInput.clear().type(userData.email);

    if (userData.phone) this.phoneInput.clear().type(userData.phone);

    if (userData.gender) {
      this.genderSelect.click();
      this.selectFromDropdown(userData.gender);
    }

    if (userData.dateOfBirth) this.setDate(userData.dateOfBirth);
    if (userData.country || userData.city || userData.state)
      this.addressInfoSection.click();

    if (userData.city) this.cityInput.clear().type(userData.city);

    if (userData.state) this.stateInput.clear().type(userData.state);

    if (userData.country) {
      this.countrySelect.click();
      this.selectFromDropdown(userData.country);
    }
  }

  submit() {
    this.addNewBtn.click();
  }

  cancel() {
    this.cancelBtn.click();
  }

  assertModalIsOpen() {
    this.modalTitle.should("be.visible");
  }
}

module.exports = AddSubUnitUsersModalPage;
