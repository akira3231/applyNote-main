const BaseTablePage = require("../common/BaseTablePage");

class AddAgreementsModalPage extends BaseTablePage {
  get modalTitle() {
    return cy.contains("h2, div.bg-sidebar-primary", /Add Agreement/);
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
    return cy.get(".space-y-4 > div > .inline-flex");
  }
  get attachmentFileInput() {
    return cy.get('input[type="file"]').last();
  }
  get addNewBtn() {
    return cy
      .get("button.bg-success")
      .contains("button", "Add Agreement")
      .filter(":visible");
  }
  get cancelBtn() {
    return cy.contains("button", "Cancel");
  }

  uploadAttachment(filePath) {
    if (!filePath) return;

    this.addAttachmentBtn.click({ force: true });

    cy.get('input[type="file"]', { timeout: 10000 })
      .last()
      .selectFile(filePath, { force: true });
  }

  fillForm(agreementData) {
    if (agreementData.institution) {
      this.institutionSelect.click();
      this.selectFromDropdown(agreementData.institution);
    }

    if (agreementData.invoicingName)
      this.invoicingNameInput.clear().type(agreementData.invoicingName);

    if (agreementData.countries) {
      this.selectCountries(agreementData.countries);
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

    if (agreementData.attachments) this.attachmentSection.click();

    if (agreementData.attachments && agreementData.attachments.length > 0) {
      agreementData.attachments.forEach((filePath) => {
        this.uploadAttachment(filePath);
      });
    }
  }

  submit() {
    cy.wait(2000);
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
