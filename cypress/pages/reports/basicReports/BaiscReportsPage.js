const BaseTablePage = require("../../common/BaseTablePage.js");

class BasicReportsPage extends BaseTablePage {
  visit() {
    const base = Cypress.env("BASE_URL");
    cy.visit(`${base}/reports/basic`);
  }
  get dateFromBtn() {
    return cy.contains("button", "Date From").filter(":visible");
  }
  get dateToBtn() {
    return cy.contains("button", "Date From").filter(":visible");
  }
  get unitTypeSelect() {
    return cy
      .contains('button[role="combobox"]', "Select Unit Type")
      .filter(":visible");
  }
  get unitSelect() {
    return cy
      .contains('button[role="combobox"]', "Select unit")
      .filter(":visible");
  }
  get counsellorSelect() {
    return cy
      .contains('button[role="combobox"]', "Select Counsellor")
      .filter(":visible");
  }
  get countrySelect() {
    return cy
      .contains('button[role="combobox"]', "Select Country")
      .filter(":visible");
  }
  get schoolSelect() {
    return cy
      .contains('button[role="combobox"]', "Select institution")
      .filter(":visible");
  }
  get applyBtn() {
    return cy.contains("button", "Apply Filter");
  }
  get resetBtn() {
    return cy.contains("button", "Reset");
  }

  getStatCards() {
    return cy.get(".grid.grid-cols-3 > div");
  }

  captureCardValues() {
    cy.wait(1000);
    const values = {};
    return cy.get(".grid.grid-cols-3 > div").then(($cards) => {
      $cards.each((i, card) => {
        const title = card.querySelector(".text-h4")?.innerText?.trim();
        const rows = card.querySelectorAll(
          ".flex.items-center.justify-between",
        );
        values[title] = {};
        rows.forEach((row) => {
          const label = row
            .querySelector(".text-muted-foreground")
            ?.innerText?.trim();
          const value = row.querySelector(".font-medium")?.innerText?.trim();
          if (label && value) values[title][label] = value;
        });
      });
      return values;
    });
  }

  applyFilters(filterData = {}) {
    if (filterData.dateFrom)
      this.setDate(this.dateFromBtn, filterData.dateFrom);

    if (filterData.dateTo) this.setDate(this.dateToBtn, filterData.dateTo);

    if (filterData.unitType) {
      this.unitTypeSelect.click();
      this.selectFromDropdown(filterData.unitType);
    }
    if (filterData.unit) {
      cy.wait(500);
      this.selectWithSearch(this.unitSelect, filterData.unit);
    }

    if (filterData.counsellor) {
      cy.wait(500);
      this.selectWithSearch(this.counsellorSelect, filterData.counsellor);
    }
    if (filterData.country) {
      this.selectWithSearch(this.countrySelect, filterData.country);
    }
    if (filterData.school) {
      this.selectWithSearch(this.schoolSelect, filterData.school);
    }
    this.applyBtn.click();
  }

  reset() {
    this.resetBtn.click();
  }
}

module.exports = BasicReportsPage;
