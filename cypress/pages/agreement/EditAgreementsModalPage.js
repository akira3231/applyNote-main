const BaseTablePage = require("../common/BaseTablePage");

class EditAgreementsModalPage extends BaseTablePage {
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
  get cancelBtn() {
    return cy.contains("button", /Cancel/);
  }

  fillForm(agreementData) {
    if (agreementData.institution) {
      this.institutionSelect.click();
      this.updateRadixDropdown(
        this.institutionSelect,
        agreementData.institution,
      );
    }
    if (agreementData.invoicingName)
      this.updateField(this.invoicingNameInput, agreementData.invoicingName);
    if (agreementData.countries) {
      this.selectCountries(
        agreementData.countries,
        this.countriesAllowedSelect,
      );
      this.invoicingNameInput.click({ force: true });
      cy.wait(300);
    }
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

  cancel() {
    this.cancelBtn.click();
  }

  assertModalIsOpen() {
    this.modalTitle.should("be.visible");
  }
}

module.exports = EditAgreementsModalPage;
