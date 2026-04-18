class AddAgreementsModalPage {
  get modalTitle() {
    return cy.contains("h2, div.bg-sidebar-primary", /Add Agreement/i);
  }

  get institutionSelect() {
    return cy.contains("button", "Select Institution").filter(":visible");
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
    return cy.contains("button", "Pick start date");
  }

  get endDateBtn() {
    return cy.contains("button", "Pick end date");
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
    return cy.contains("button, div, h3", "Commission");
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

  get attachmentSection() {
    return cy.contains("button, div, h3", "Attachments");
  }

  get addAttachmentBtn() {
    return cy
      .contains("span.font-semibold", "Attachments")
      .closest('[data-orientation="vertical"]')
      .find('[data-state="open"]')
      .find("button.text-primary");
  }

  get attachmentFileInput() {
    return cy.get('input[type="file"]').last();
  }

  uploadAttachment(filePath) {
    if (!filePath) return;

    // Check if file input already exists, if not click Add first
    cy.get('input[type="file"]').then(($inputs) => {
      if ($inputs.length === 0) {
        this.addAttachmentBtn.click({ force: true });
      }
    });

    cy.get('input[type="file"]', { timeout: 10000 })
      .last()
      .selectFile(filePath, { force: true });
  }
  get addNewBtn() {
    return cy.get("button.bg-success");
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
          $el[0].click();
        });
    });
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

    // Wait for calendar to be present in DOM
    cy.get('[data-slot="calendar"]', { timeout: 10000 })
      .last()
      .within(() => {
        cy.get("select.rdp-months_dropdown").select(String(monthIndex), {
          force: true,
        });

        cy.get("select.rdp-years_dropdown").select(year, { force: true });
      });

    // Click day outside within() so it can find the updated calendar
    cy.get(`[data-day="${year}-${month}-${day}"] button`)
      .last()
      .click({ force: true });
  }

  fillForm(agreementData) {
    if (agreementData.institution) {
      this.institutionSelect.click();
      this.selectFromDropdown(agreementData.institution);
    }

    if (agreementData.invoicingName)
      this.invoicingNameInput.clear().type(agreementData.invoicingName);

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

    if (agreementData.attachments) this.attachmentSection.click();

    if (agreementData.attachments && agreementData.attachments.length > 0) {
      agreementData.attachments.forEach((filePath) => {
        this.uploadAttachment(filePath);
      });
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

module.exports = AddAgreementsModalPage;
