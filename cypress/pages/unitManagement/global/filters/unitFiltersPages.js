const BaseTablePage = require("../../../common/BaseTablePage.js");

class UnitFilter extends BaseTablePage {
  get filterTitle() {
    return cy.get('h2[id^="radix-"]').filter(":visible");
  }
  get countrySelect() {
    return cy
      .contains('button[role="combobox"]', "Select Country")
      .filter(":visible");
  }
  get commissionRateSelect() {
    return cy
      .contains('button[role="combobox"]', "Select Commission Rate range")
      .filter(":visible");
  }
  get createdOnDateBtn() {
    return cy.contains("button", "Pick a date range").filter(":visible");
  }
  get statusRadio() {
    return {
      active: cy.get('input[id="status-Active"]'),
      inactive: cy.get('input[id="status-inactive"]'),
    };
  }
  get applyBtn() {
    return cy.contains("button", "Apply");
  }
  get cancelBtn() {
    return cy.contains("button", "Cancel");
  }
  get resetBtn() {
    return cy.contains("button", "Reset All");
  }

  selectStatus(status) {
    if (!status) return;
    if (status.toLowerCase() === "active") {
      this.statusRadio.active.click();
    } else {
      this.statusRadio.inactive.click();
    }
  }

  selectDateRange(start, end) {
    this.setDateRange(this.createdOnDateBtn, start, end);
  }

  applyFilters(filterData = {}) {
    if (filterData.country)
      this.selectWithSearch(this.countrySelect, filterData.country);
    if (filterData.status) this.selectStatus(filterData.status);
    if (filterData.commissionRate) {
      this.commissionRateSelect.click();
      this.selectFromDropdown(filterData.commissionRate);
    }
    if (filterData.createdOn && Array.isArray(filterData.createdOn)) {
      this.selectDateRange(filterData.createdOn[0], filterData.createdOn[1]);
    }
    this.applyBtn.click();
  }

  reset() {
    this.resetBtn.click();
  }

  cancel() {
    this.cancelBtn.click();
  }
}

module.exports = UnitFilter;
