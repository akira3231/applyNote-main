class AddCourseModalPage {
  get modalTitle() {
    return cy.contains("h2, .modal-title", "Add Course");
  }


  get courseCodeInput() {
    return cy
      .get('input[id="course_code"], input[name="courseCode"], input[name="course_code"]')
      .filter(":visible")
      .first();
  }

  get courseNameInput() {
    return cy
      .get('input[placeholder*="Enter Course Name"], input[name="courseName"], input[name="course_name"]')
      .filter(":visible")
      .first();
  }

  get institutionSelect() {
    return cy
      .contains("Select Institution")
      .closest("div")
      .find("select, button")
      .filter(":visible")
      .first();
  }

  get courseLevelTrigger() {
    return cy.get('button[id="courselevel"]').filter(":visible").first();
  }

  get fieldOfEducationSelect() {
    return cy
      .contains("Select Field of Education")
      .closest("div")
      .find("select, button, [role='combobox']")
      .filter(":visible")
      .first();
  }

  get courseLanguageSelect() {
    return cy
      .contains("Select Language")
      .closest("div")
      .find("select, button, [role='combobox']")
      .filter(":visible")
      .first();
  }

  get courseDurationInput() {
    return cy
      .get('input[placeholder*="Enter duration"], input[name*="duration"]')
      .filter(":visible")
      .first();
  }

  get durationUnitSelect() {
    return cy
      .contains("Unit")
      .closest("div")
      .find("select, button, [role='combobox']")
      .filter(":visible")
      .first();
  }

  get shortDescriptionInput() {
    return cy
      .get('textarea[placeholder*="Enter course description"], textarea[name*="description"]')
      .filter(":visible")
      .first();
  }


  get intakeMonthTrigger() {
    return cy.get("div[class='grid grid-cols-2 gap-2 mt-2'] div:nth-child(1) button:nth-child(1)");
  }

  get intakeYearTrigger() {
    return cy.get(":nth-child(8) > .grid > :nth-child(2) > .flex");
  }

  get intakeAddBtn() {
    return cy
      .get("body")
      .find("button")
      .filter(":visible")
      .filter((_, el) => el.textContent.trim().toLowerCase() === "add")
      .last();
  }


  get tuitionFeeInput() {
    return cy
      .get('input[name*="tuition"], input[id*="tuition"]')
      .filter(":visible")
      .first();
  }

  get nonTuitionFeeInput() {
    return cy
      .get('input[name*="non_tuition"], input[name*="nonTuition"], input[id*="non"]')
      .filter(":visible")
      .first();
  }

  get totalCourseCostInput() {
    return cy
      .get('input[name*="total"], input[id*="total"]')
      .filter(":visible")
      .first();
  }


  get campusDropdown() {
    return cy
      .contains("Select campus")
      .closest("div")
      .find("button, select, [role='combobox']")
      .filter(":visible")
      .first();
  }

  get addCampusBtn() {
    return cy.get(".space-y-2 > :nth-child(2) > :nth-child(2) > .inline-flex");
  }


  get addNewCourseBtn() {
    return cy.contains("button", "Add New Course");
  }

  get cancelBtn() {
    return cy.contains("button", "Cancel");
  }


  expandBasicInfo() {
    cy.contains("Basic Info").click();
  }

  expandFeesAndCost() {
    cy.contains("Fees and Cost").click();
  }

  expandCourseLocation() {
    cy.contains("Course Location").click();
  }

  _selectFirstOption() {
    cy.wait(400);
    cy.get('[role="option"], [role="listbox"] li, div[class*="option"]', {
      timeout: 10000,
    })
      .filter(":visible")
      .first()
      .should("be.visible")
      .click({ force: true });
  }

  _selectFromDropdown(value, useFirst = false) {
    cy.wait(300);

    if (useFirst) {
      this._selectFirstOption();
      return;
    }

    cy.get('[role="option"], [role="listbox"] li, div[class*="option"]', {
      timeout: 10000,
    })
      .filter(":visible")
      .then(($options) => {
        const $match = $options.filter((_, el) =>
          el.textContent.trim().toLowerCase().includes(value.toLowerCase())
        );

        if ($match.length > 0) {
          cy.wrap($match.first()).then(($el) =>
            $el[0].scrollIntoView({ block: "center" })
          );
          cy.wrap($match.first()).should("be.visible").click({ force: true });
        } else {
          cy.log(`Option "${value}" not found — selecting first available`);
          this._selectFirstOption();
        }
      });
  }


  selectInstitution(institutionName) {
    this.institutionSelect.click();

    cy.document().then((doc) => {
      cy.wrap(doc.body)
        .find(
          '[role="listbox"], [class*="dropdown"], [class*="popover"], [class*="menu"]',
          { timeout: 8000 }
        )
        .filter(":visible")
        .first()
        .within(() => {
          cy.get('input[placeholder*="Search"], input[type="search"]', {
            timeout: 6000,
          })
            .filter(":visible")
            .first()
            .clear()
            .type(institutionName);
        });
    });

    cy.wait(400);
    this._selectFromDropdown(institutionName);
  }

  selectCourseLevel() {
    this.courseLevelTrigger.click();
    cy.wait(400);
    this._selectFirstOption();
  }

  selectFieldOfEducation(fieldName) {
    this.fieldOfEducationSelect.click();
    this._selectFromDropdown(fieldName);
  }

  selectCourseLanguage(language) {
    this.courseLanguageSelect.click();
    this._selectFromDropdown(language);
  }

  selectDurationUnit(unit) {
    this.durationUnitSelect.click();
    this._selectFromDropdown(unit);
  }

  selectIntakeMonth(monthName) {
    this.intakeMonthTrigger.click();
    this._selectFromDropdown(monthName);
  }

  selectIntakeYear(year) {
    this.intakeYearTrigger.click();
    this._selectFromDropdown(String(year));
  }

  addIntakeEntry(monthName, year) {
    this.selectIntakeMonth(monthName);
    cy.wait(300);
    this.selectIntakeYear(year);
    cy.wait(300);
    this.intakeAddBtn.click({ force: true });
  }

  selectCampusAndAdd() {
    this.expandCourseLocation();
    cy.wait(300);
    this.campusDropdown.click();
    cy.wait(400);
    this._selectFirstOption();
    cy.wait(300);
    this.addCampusBtn.click();
  }


  fillBasicInfo(data) {
    if (data.courseCode) {
      this.courseCodeInput.clear().type(data.courseCode);
    }

    if (data.courseName) {
      this.courseNameInput.should("be.visible").clear().type(data.courseName);
    }

    if (data.institution) {
      this.selectInstitution(data.institution);
    }

    if (data.courseLevel !== undefined) {
      cy.wait(400); 
      this.selectCourseLevel();
    }

    if (data.fieldOfEducation) {
      this.selectFieldOfEducation(data.fieldOfEducation);
    }

    if (data.courseLanguage) {
      this.selectCourseLanguage(data.courseLanguage);
    }

    if (data.courseDuration) {
      this.courseDurationInput.clear().type(data.courseDuration);
    }

    if (data.durationUnit) {
      this.selectDurationUnit(data.durationUnit);
    }

    if (data.shortDescription) {
      this.shortDescriptionInput.clear().type(data.shortDescription);
    }

    if (data.intakeMonth && data.intakeYear) {
      this.addIntakeEntry(data.intakeMonth, data.intakeYear);
    } else {
      if (data.intakeMonth) {
        this.selectIntakeMonth(data.intakeMonth);
      }
      if (data.intakeYear) {
        this.selectIntakeYear(data.intakeYear);
      }
    }
  }

  fillFeesAndCost(data) {
    this.expandFeesAndCost();

    if (data.tuitionFee !== undefined) {
      this.tuitionFeeInput.clear().type(data.tuitionFee);
    }

    if (data.nonTuitionFee !== undefined) {
      this.nonTuitionFeeInput.clear().type(data.nonTuitionFee);
    }

    if (data.totalCourseCost !== undefined) {
      this.totalCourseCostInput.clear().type(data.totalCourseCost);
    }
  }

  fillCourseLocation() {
    this.selectCampusAndAdd();
  }

  fillForm(data) {
    this.fillBasicInfo(data);

    if (
      data.tuitionFee !== undefined ||
      data.nonTuitionFee !== undefined ||
      data.totalCourseCost !== undefined
    ) {
      this.fillFeesAndCost(data);
    }

    this.fillCourseLocation();
  }

  submit() {
    this.addNewCourseBtn.click();
  }

  cancel() {
    this.cancelBtn.click();
  }

  assertModalIsOpen() {
    this.modalTitle.should("be.visible");
  }
}

module.exports = AddCourseModalPage;