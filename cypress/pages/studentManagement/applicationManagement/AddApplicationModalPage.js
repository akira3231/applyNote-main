class AddApplicationModalPage {
  get modal() {
    return cy.get('[role="dialog"]', { timeout: 10000 }).first();
  }

  assertModalIsOpen() {
    cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible');
  }



  get studentDropdown() {
    return cy.get('[role="combobox"][aria-haspopup="dialog"]').filter(':visible').first();
  }

  get studyStartDateBtn() {
    return cy.get('button[aria-haspopup="dialog"]:not([role="combobox"])').filter(':visible').eq(0);
  }

  get coeDateBtn() {
    return cy.get('button[aria-haspopup="dialog"]:not([role="combobox"])').filter(':visible').eq(1);
  }

  get institutionDropdown() {
    return cy.get('[role="combobox"][aria-haspopup="dialog"]').filter(':visible').eq(1);
  }

  get courseDropdown() {
    return cy.get('[role="combobox"][aria-haspopup="dialog"]').filter(':visible').eq(2);
  }

  get totalTuitionFeeInput() {
    return cy.get('[name="total_tution_fee"]');
  }

  get claimableTuitionFeeInput() {
    return cy.get('[name="claimable_tution_fee"]');
  }


  get visaStatusDropdown() {
    return cy.contains('span', 'Select Visa Status').closest('button');
  }

  get visaExpiryDateBtn() {
    return cy.get('button[aria-haspopup="dialog"]:not([role="combobox"])').filter(':visible').eq(2);
  }

  clickAllVisaYesRadios() {
    const visaYesIds = [
      'Do you currently hold a Australia Visa?-yes',
      'Do you currently hold a visa for another country other than Australia?-yes',
      'Do you intend to apply for a Australia Student Visa?-yes',
      'Have you ever been excluded from a Australia education institution before?-yes',
    ];
    visaYesIds.forEach((id) => {
      cy.get(`#${CSS.escape(id)}`).click({ force: true });
    });
  }


  get countryDropdown() {
    return cy.get('[role="combobox"][aria-haspopup="dialog"]').filter(':visible').eq(3);
  }

  get stateInput() {
    return cy.get('input[name="state_applying_for"]');
  }

  get cityInput() {
    return cy.get('input[name="city_applying_for"]');
  }

  clickAllGeneralDetailsYesRadios() {
    const generalYesIds = [
      'Is the student currently onshore in Australia?-yes',
      'Does the student have dual citizenship?-yes',
      'Does the student have a disability, impairment or long-term medical condition which may affect their studies?-yes',
    ];
    generalYesIds.forEach((id) => {
      cy.get(`#${CSS.escape(id)}`).click({ force: true });
    });

    cy.get('button[role="radio"][value="yes"]').filter(':visible').each(($btn) => {
      const id = $btn.attr('id') || '';
      if (
        id.includes('brother or sister') ||
        id.includes('partnership institution')
      ) {
        cy.wrap($btn).click({ force: true });
      }
    });
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


  get aqProgramLevelDropdown() {
    return cy.contains('span', 'Program Level').closest('button[role="combobox"]');
  }

  get aqProgramTitleInput() {
    return cy.get('input[name="aq_program_title"]').eq(0);
  }

  get aqSchoolNameInput() {
    return cy.get('input[name="aq_program_title"]').eq(1);
  }

  get aqCountryInput() {
    return cy.get('input[name="aq_program_title"]').eq(2);
  }

  get aqLanguageDropdown() {
    return cy.contains('span', 'Select language of instruction').closest('button');
  }

  get aqCompletionMonthDropdown() {
    return cy.contains('span', 'Month').closest('button[role="combobox"]');
  }

  get aqCompletionYearDropdown() {
    return cy.contains('span', 'Year').closest('button[role="combobox"]');
  }

  clickAllAcademicQualificationYesRadios() {
    cy.get('#' + CSS.escape('Have you completed the above study?-yes')).click({ force: true });
    cy.get('#' + CSS.escape('Has it been more than 6 months since you last studied?-yes')).click({ force: true });
  }


  clickCreditForPriorLearningYes() {
    cy.get('#' + CSS.escape('Do you wish to have any completed tertiary studies considered for credit/advanced standing?-yes'))
      .click({ force: true });
  }


  get firstLanguageDropdown() {
    return cy.contains('span', 'Select your first language').closest('button');
  }

  get englishRequirementDropdown() {
    return cy.contains('span', 'How do you intend on meeting the English language requirements?').closest('button[role="combobox"]');
  }

  clickEnglishLanguageProgramYes() {
    cy.get('#' + CSS.escape('Would you like the University to arrange an English language program for you?-yes'))
      .click({ force: true });
  }


  clickEmploymentStatusYes() {
    cy.get('#' + CSS.escape('Do you have work experience?-yes')).click({ force: true });
  }

  clickFundingSelfFunded() {
    cy.get('#' + CSS.escape('Please indicate which source of funding you will use to pay for your tuition fees and living costs:-self_funded'))
      .click({ force: true });
  }


  clickSponsorshipYes() {
    cy.get('#' + CSS.escape('Have you applied for or have you received sponsorship from your home government or any other foreign agency?-yes'))
      .click({ force: true });
  }


  get maritalStatusDropdown() {
    return cy.contains('span', 'Marital Status').closest('button[role="combobox"]');
  }

  clickAllDependentsYesRadios() {
    const dependentYesIds = [
      'Do you intend to bring your spouse with you to Australia?-yes',
      'Do you have any dependents?-yes',
      'Do you have any relatives living/studying in Australia?-yes',
      'Do you have any relatives being deported by any countries?-yes',
    ];
    dependentYesIds.forEach((id) => {
      cy.get(`#${CSS.escape(id)}`).click({ force: true });
    });
  }


  get oshcProviderDropdown() {
    return cy.contains('span', 'Select OSHC provider').closest('button[role="combobox"]');
  }


  clickPersonalRepresentativeYes() {
    cy.get('button[role="radio"][value="yes"]').filter(':visible').each(($btn) => {
      const id = $btn.attr('id') || '';
      if (id.includes('authorise') || id.includes('release information')) {
        cy.wrap($btn).click({ force: true });
      }
    });
  }

  clickAllCharacterDeclarationYesRadios() {
    const characterYesIds = [
      'Been convicted of crime or offence in any country?-yes',
      'Been charged of a crime that is awaiting Legal action?-yes',
      'Been removed or deported from any country?-yes',
      'Committed or been involved in the commission of war crimes or crimes against humanity or human rights?-yes',
      'Had any outstanding debt to the Australia government or any public authority in Australia?-yes',
      'Been involved in any activity or committed of any offence relating to the illegal movement of people to any country?-yes',
    ];
    characterYesIds.forEach((id) => {
      cy.get(`#${CSS.escape(id)}`).click({ force: true });
    });
  }


  clickApplicationSourceEducationInstitute() {
    cy.get('button[role="radio"][value="education_institute"]').click({ force: true });
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

  _setDatePicker(dateBtn, dateString) {
    dateBtn.click({ force: true });
    cy.get('input[type="date"]').filter(':visible').then(($inputs) => {
      if ($inputs.length > 0) {
        cy.wrap($inputs.first()).clear().type(dateString);
      }
    });
    cy.get('body').type('{esc}');
  }


  expandSection(sectionName) {
    cy.contains(sectionName).closest('[class*="cursor-pointer"], button, [role="button"]').then(($el) => {
      const ariaExpanded = $el.attr('aria-expanded');
      if (ariaExpanded === 'false' || !$el.find('[data-state="open"]').length) {
        cy.wrap($el).click({ force: true });
      }
    });
  }


  fillBasicAcademicInfo(data) {
    if (data.student !== undefined) {
      this._selectSearchableCombobox(this.studentDropdown);
    }
    if (data.studyStartDate) {
      this._setDatePicker(this.studyStartDateBtn, data.studyStartDate);
    }
    if (data.coeDate) {
      this._setDatePicker(this.coeDateBtn, data.coeDate);
    }
    if (data.institution !== undefined) {
      this._selectSearchableCombobox(this.institutionDropdown);
    }
    if (data.course !== undefined) {
      this._selectSearchableCombobox(this.courseDropdown);
    }
  }

  fillFinancialInfo(data) {
    if (data.totalTuitionFee) {
      this.totalTuitionFeeInput.clear().type(data.totalTuitionFee);
    }
    if (data.claimableTuitionFee) {
      this.claimableTuitionFeeInput.clear().type(data.claimableTuitionFee);
    }
  }

  fillVisaDetails(data) {
    if (data.visaStatus) {
      this._selectComboboxOption(this.visaStatusDropdown, data.visaStatus);
    }
    if (data.visaExpiryDate) {
      this._setDatePicker(this.visaExpiryDateBtn, data.visaExpiryDate);
    }
    this.clickAllVisaYesRadios();
  }

  fillGeneralDetails(data) {
    if (data.country !== undefined) {
      this._selectSearchableCombobox(this.countryDropdown);
    }
    if (data.state) {
      this.stateInput.clear().type(data.state);
    }
    if (data.city) {
      this.cityInput.clear().type(data.city);
    }
    this.clickAllGeneralDetailsYesRadios();
  }

  fillEmergencyContactDetails(data) {
    if (data.ecRelation) {
      this.ecRelationInput.clear().type(data.ecRelation);
    }
    if (data.ecGivenName) {
      this.ecGivenNameInput.clear().type(data.ecGivenName);
    }
    if (data.ecFamilyName) {
      this.ecFamilyNameInput.clear().type(data.ecFamilyName);
    }
    if (data.ecEmail) {
      this.ecEmailInput.clear().type(data.ecEmail);
    }
    if (data.ecPhone) {
      this.ecPhoneInput.clear().type(data.ecPhone);
    }
  }

  fillAcademicQualification(data) {
    if (data.aqProgramTitle) {
      this.aqProgramTitleInput.clear().type(data.aqProgramTitle);
    }
    if (data.aqSchoolName) {
      this.aqSchoolNameInput.clear().type(data.aqSchoolName);
    }
    if (data.completionMonth) {
      this._selectComboboxOption(this.aqCompletionMonthDropdown, data.completionMonth);
    }
    if (data.completionYear) {
      this._selectComboboxOption(this.aqCompletionYearDropdown, data.completionYear);
    }
    this.clickAllAcademicQualificationYesRadios();
  }

  fillEnglishProficiency(data) {
    if (data.firstLanguage) {
      this._selectComboboxOption(this.firstLanguageDropdown, data.firstLanguage);
    }
    this.clickEnglishLanguageProgramYes();
  }

  fillDependents(data) {
    if (data.maritalStatus) {
      this._selectComboboxOption(this.maritalStatusDropdown, data.maritalStatus);
    }
    this.clickAllDependentsYesRadios();
  }

  fillOshc(data) {
    if (data.oshcProvider) {
      this._selectComboboxOption(this.oshcProviderDropdown, data.oshcProvider);
    }
  }

  fillForm(data) {
    this.fillBasicAcademicInfo(data);
    this.fillFinancialInfo(data);
    this.fillVisaDetails(data);
    this.fillGeneralDetails(data);
    this.fillEmergencyContactDetails(data);
    this.fillAcademicQualification(data);
    this.clickCreditForPriorLearningYes();
    this.fillEnglishProficiency(data);
    this.clickEmploymentStatusYes();
    this.clickFundingSelfFunded();
    this.clickSponsorshipYes();
    this.fillDependents(data);
    this.fillOshc(data);
    this.clickPersonalRepresentativeYes();
    this.clickAllCharacterDeclarationYesRadios();
    this.clickApplicationSourceEducationInstitute();
  }


  get addNewBtn() {
    return cy.contains('button', 'Add New');
  }

  submit() {
    this.addNewBtn.should('not.be.disabled').click();
  }
}

module.exports = AddApplicationModalPage;