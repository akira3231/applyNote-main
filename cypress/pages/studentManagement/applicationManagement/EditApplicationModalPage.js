class EditApplicationModalPage {
  get modal() {
    return cy.get('[role="dialog"]', { timeout: 10000 }).first();
  }

  assertModalIsOpen() {
    cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible');
  }


  get totalTuitionFeeInput() {
    return cy.get('[name="total_tution_fee"]');
  }

  get claimableTuitionFeeInput() {
    return cy.get('[name="claimable_tution_fee"]');
  }


  get studentDropdown() {
    return cy.get('[role="combobox"][aria-haspopup="dialog"]').filter(':visible').first();
  }

  get institutionDropdown() {
    return cy.get('[role="combobox"][aria-haspopup="dialog"]').filter(':visible').eq(1);
  }

  get courseDropdown() {
    return cy.get('[role="combobox"][aria-haspopup="dialog"]').filter(':visible').eq(2);
  }


  get stateInput() {
    return cy.get('input[name="state_applying_for"]');
  }

  get cityInput() {
    return cy.get('input[name="city_applying_for"]');
  }


  get ecRelationInput() {
    return cy.get('input[name="ec_relation"]').eq(0);
  }

  get ecGivenNameInput() {
    return cy.get('input[name="ec_relation"]').eq(1);
  }

  get ecFamilyNameInput() {
    return cy.get('input[name="ec_relation"]').eq(2);
  }

  get ecEmailInput() {
    return cy.get('input[name="ec_email"]').eq(0);
  }

  get ecPhoneInput() {
    return cy.get('input[name="ec_email"]').eq(1);
  }


  get aqProgramTitleInput() {
    return cy.get('input[name="aq_program_title"]').eq(0);
  }

  get aqSchoolNameInput() {
    return cy.get('input[name="aq_program_title"]').eq(1);
  }

  expandSection(sectionName) {
    cy.contains(sectionName)
      .closest('[class*="cursor-pointer"], button, [role="button"]')
      .then(($el) => {
        const ariaExpanded = $el.attr('aria-expanded');
        if (ariaExpanded === 'false' || !$el.find('[data-state="open"]').length) {
          cy.wrap($el).click({ force: true });
        }
      });
  }


  _selectComboboxOption(triggerEl, optionText) {
    triggerEl.click({ force: true });
    cy.get('[role="option"]').filter(':visible').contains(optionText).click({ force: true });
  }

  _selectSearchableCombobox(triggerEl) {
    triggerEl.click({ force: true });
    cy.get('input[placeholder*="Search"]').filter(':visible').first().should('exist');
    cy.get('[role="option"], [role="radio"]')
      .filter(':visible')
      .first()
      .click({ force: true });
  }


  fillForm(data) {
    if (data.student !== undefined) {
      this._selectSearchableCombobox(this.studentDropdown);
    }

    if (data.totalTuitionFee || data.claimableTuitionFee) {
      this.expandSection('Financial Info');
      if (data.totalTuitionFee) {
        this.totalTuitionFeeInput.clear().type(data.totalTuitionFee);
      }
      if (data.claimableTuitionFee) {
        this.claimableTuitionFeeInput.clear().type(data.claimableTuitionFee);
      }
    }

    if (data.state) {
      this.stateInput.clear().type(data.state);
    }
    if (data.city) {
      this.cityInput.clear().type(data.city);
    }
    if (data.ecRelation) {
      this.ecRelationInput.clear().type(data.ecRelation);
    }
    if (data.aqProgramTitle) {
      this.aqProgramTitleInput.clear().type(data.aqProgramTitle);
    }
    if (data.aqSchoolName) {
      this.aqSchoolNameInput.clear().type(data.aqSchoolName);
    }
  }


  get saveBtn() {
    return cy.contains('button', 'Update Application');
  }

  submit() {
    this.saveBtn.should('not.be.disabled').click();
  }
}

module.exports = EditApplicationModalPage;