class BaseTablePage {
  get table() {
    return cy.get("table");
  }
  get tableRows() {
    return this.table.find("tbody tr");
  }
  get mainSearchInput() {
    return cy.get('input[placeholder="Search..."]').first();
  }
  get tableSearchInput() {
    return cy.get('input[placeholder="Search..."]').last();
  }

  waitForTable() {
    cy.get("table").should("exist");

    cy.get("body").then(($body) => {
      if ($body.find("tbody tr").length > 0) {
        this.tableRows.should("have.length.gte", 1);
      } else {
        cy.contains("No entries found").should("be.visible");
      }
    });
  }

  searchTable(text) {
    this.tableSearchInput.clear().type(text);
  }

  searchMain(text) {
    this.mainSearchInput.clear().type(text);
  }

  getRowByText(text) {
    return cy.contains("td", text).closest("tr");
  }

  getFirstRow() {
    return this.tableRows.first();
  }

  getFirstRowText() {
    return this.getFirstRow()
      .find("td")
      .first()
      .invoke("text")
      .then((t) => t.trim());
  }

  clickFirstRowAction(actionRegex) {
    cy.get("tbody tr")
      .first()
      .find('button[aria-haspopup="menu"]')
      .click({ force: true });

    cy.get('[role="menuitem"]')
      .contains(actionRegex)
      .should("be.visible")
      .click({ force: true });
  }

  editFirstRow() {
    this.clickFirstRowAction(/edit/i);
  }

  deleteFirstRow() {
    this.clickFirstRowAction(/delete/i);
  }

  confirmDelete() {
    cy.contains("button", /^delete$/i)
      .should("be.visible")
      .click({ force: true });
  }

  cancelDelete() {
    cy.contains("button", /^cancel$/i)
      .should("be.visible")
      .click({ force: true });
  }

  assertDeleteModalVisible(entityName = "item") {
    cy.contains("h2", new RegExp(`delete ${entityName}`, "i")).should(
      "be.visible",
    );
  }

  assertExists(text) {
    cy.contains("td", text).should("be.visible");
  }

  assertNotExists(text) {
    cy.contains("td", text).should("not.exist");
  }

  assertRecordState(count) {
    cy.wait(1000);
    if (count === 0) {
      cy.contains("No entries found").should("exist");
    } else {
      cy.get("tbody tr").should("have.length.gt", 0);
    }
  }

  selectFromDropdown(value) {
    cy.contains('[role="option"]', value)
      .scrollIntoView()
      .should("be.visible")
      .click();
  }

  selectWithSearch(triggerEl, value) {
    triggerEl.then(($btn) => {
      cy.wrap($btn).click({ force: true });

      cy.get('[cmdk-root] input[placeholder="Search..."]', { timeout: 10000 })
        .filter(":visible")
        .first()
        .clear({ force: true })
        .type(value, { force: true });

      cy.get("[cmdk-item]", { timeout: 10000 })
        .filter(":visible")
        .contains(value)
        .click({ force: true });
    });
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

  updateRadixDropdown(triggerEl, value) {
    if (!value) return;
    triggerEl.then(($btn) => {
      const current = $btn.text().replace(/\s+/g, " ").trim();
      if (current === value) return;
      cy.wrap($btn).click({ force: true });
      cy.contains('[role="option"]', value)
        .scrollIntoView()
        .should("be.visible")
        .click();
    });
  }

  updateDropdownWithSearch(triggerEl, value) {
    if (!value) return;
    triggerEl.then(($btn) => {
      const current = $btn.text().replace(/\s+/g, " ").trim();
      if (current === value) return;
      cy.wrap($btn).click({ force: true });
      cy.get('[cmdk-root] input[placeholder="Search..."]', { timeout: 10000 })
        .filter(":visible")
        .first()
        .clear({ force: true })
        .type(value, { force: true });
      cy.get("[cmdk-item]", { timeout: 10000 })
        .filter(":visible")
        .contains(value)
        .click({ force: true });
    });
  }

  setDate(btnOrDateString, dateString) {
    let btn, date;
    if (typeof btnOrDateString === "string") {
      date = btnOrDateString;
      btn = this.dateOfBirthBtn;
    } else {
      btn = btnOrDateString;
      date = dateString;
    }

    if (!date) return;

    const [year, month, day] = date.split("-");
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

  setDateRange(btn, startDate, endDate) {
    if (!startDate || !endDate) return;

    const pickDay = (dateStr) => {
      const target = new Date(dateStr);
      const targetYear = target.getFullYear();
      const targetMonth = target.getMonth();
      const dayNum = target.getDate();

      cy.get('[data-slot="calendar"]')
        .as("calendar")
        .find(".rdp-caption_label")
        .first()
        .then(($label) => {
          const text = $label.text().trim();
          const [monthName, yearStr] = text.split(" ");
          const currentYear = parseInt(yearStr);
          const currentMonth = new Date(`${monthName} 1`).getMonth();

          const monthsToClick =
            (targetYear - currentYear) * 12 + (targetMonth - currentMonth);

          if (monthsToClick > 0) {
            Cypress._.times(monthsToClick, () => {
              cy.get("@calendar")
                .find("button.rdp-button_next")
                .click({ force: true });
            });
          } else if (monthsToClick < 0) {
            Cypress._.times(Math.abs(monthsToClick), () => {
              cy.get("@calendar")
                .find("button.rdp-button_previous")
                .click({ force: true });
            });
          }
        });

      cy.get("@calendar")
        .find("td:not(.rdp-outside) button.rdp-day_button:not(.rdp-outside)")
        .contains(new RegExp(`^${dayNum}$`))
        .last()
        .scrollIntoView({ offset: { top: -100 } })
        .click();
    };

    btn.click();
    cy.get('[data-slot="calendar"]').should("exist");
    pickDay(startDate);
    btn.click();
    cy.get('[data-slot="calendar"]').should("exist");
    pickDay(endDate);
  }

  selectCountries(countries, triggerEl = null) {
    if (!countries || !countries.length) return;

    // Use passed trigger or fall back to common getters
    const trigger =
      triggerEl || this.countriesAllowedSelect || this.countriesSelect;

    // Open the dropdown
    trigger.should("be.visible").click({ force: true });

    // Wait a bit for the listbox/popover to render
    cy.wait(400);

    countries.forEach((country, index) => {
      cy.contains(
        '[role="option"]',
        new RegExp(`^${country}$`, "i"), // exact match, case-insensitive
        { timeout: 10000 },
      )
        .scrollIntoView({ block: "center" })
        .should("be.visible")
        .click({ force: true });

      // Small delay between selections (important for multi-select UIs)
      if (index < countries.length - 1) {
        cy.wait(250);
      }
    });
  }
}

module.exports = BaseTablePage;
