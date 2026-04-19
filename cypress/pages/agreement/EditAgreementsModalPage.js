class EditAgreementsModalPage {
  get modalTitle() {
    return cy.contains("h2, .modal-title", "Edit Agreement");
  }

  get institutionSelect() {
    return cy
      .get('button[aria-haspopup="dialog"][role="combobox"]')
      .filter(":visible")
      .first();
  }

  get invoicingNameInput() {
    return cy.get('input[name="invoice_name"]');
  }
  get countriesAllowedSelect() {
    return cy
      .get('button[role="combobox"][aria-haspopup="listbox"]')
      .filter(":visible");
  }

  get startDateBtn() {
    return cy
      .contains("label", /start date/i)
      .parent()
      .find('button[aria-haspopup="dialog"]');
  }

  get endDateBtn() {
    return cy
      .contains("label", /end date/i)
      .parent()
      .find('button[aria-haspopup="dialog"]');
  }

  get blacklistRadio() {
    return {
      yes: cy.get('input[id="is_blacklisted_true"]'),
      no: cy.get('input[id="is_blacklisted_false"]'),
    };
  }

  get commentsInput() {
    return cy.get('textarea[name="comments"]');
  }

  get commissionSection() {
    return cy
      .contains("span.font-semibold", "Commission")
      .closest("h3")
      .find("button");
  }

  get commissionTypeRadio() {
    return {
      flat: cy.get('input[id="commision_type_flat"]'),
      progressive: cy.get('input[id="commision_type_progressive"]'),
    };
  }

  get commissionAmountInput() {
    return cy.get('input[name="commission_amount"]');
  }

  get updateBtn() {
    return cy.contains("button", /Update Agreement/);
  }

  selectCountries(countries) {
    if (!countries || !countries.length) return;

    this.countriesAllowedSelect.click();

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

    this.invoicingNameInput.click({ force: true });
    cy.wait(300);
  }

  setDate(btn, dateString) {
    if (!dateString) return;

    const [year, month, day] = dateString.split("-");
    const monthIndex = parseInt(month) - 1;

    btn.click({ force: true });

    cy.get('[data-slot="calendar"]', { timeout: 10000 })
      .last()
      .within(() => {
        cy.get("select.rdp-months_dropdown").select(String(monthIndex), {
          force: true,
        });

        cy.get("select.rdp-years_dropdown").select(year, { force: true });
      });

    cy.get(`[data-day="${year}-${month}-${day}"] button`)
      .last()
      .click({ force: true });
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
          .scrollIntoView()
          .should("be.visible")
          .click({ force: true });
      });
  }

  fillForm(agreementData) {
    if (agreementData.institution) {
      this.institutionSelect.click();
      this.updateDropdown(this.institutionSelect, agreementData.institution);
    }

    if (agreementData.invoicingName)
      this.updateField(this.invoicingNameInput, agreementData.invoicingName);

    if (agreementData.countries) this.selectCountries(agreementData.countries);

    if (agreementData.startDate)
      this.setDate(this.startDateBtn, agreementData.startDate);

    if (agreementData.endDate)
      this.setDate(this.endDateBtn, agreementData.endDate);

    if (agreementData.blacklist !== undefined) {
      if (agreementData.blacklist) {
        this.blacklistRadio.yes.click();
      } else {
        this.blacklistRadio.no.click();
      }
    }

    if (agreementData.comments)
      this.commentsInput.clear().type(agreementData.comments);

    if (agreementData.commissionType || agreementData.commissionAmount)
      this.commissionSection.click();

    if (agreementData.commissionType !== undefined) {
      if (agreementData.commissionType === "flat") {
        this.commissionTypeRadio.flat.click();
      } else if (agreementData.commissionType === "progressive") {
        this.commissionTypeRadio.progressive.click();
      }
    }

    if (agreementData.commissionAmount)
      this.commissionAmountInput.clear().type(agreementData.commissionAmount);
  }

  submit() {
    this.updateBtn.click();
  }

  assertModalIsOpen() {
    this.modalTitle.should("be.visible");
  }
}

module.exports = EditAgreementsModalPage;
