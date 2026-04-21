const BaseTablePage = require("../common/BaseTablePage.js");

class AuditLogsFilter extends BaseTablePage {
  get filterTitle() {
    return cy.get('h2[id^="radix-"]').filter(":visible");
  }
  get activityDateRangeBtn() {
    return cy.contains("button", "Pick a date range").filter(":visible");
  }
  get userSelect() {
    return cy
      .contains('button[role="combobox"]', "Select User")
      .filter(":visible");
  }
  get eventTypeSelect() {
    return cy
      .contains('button[role="combobox"]', "Select Event Type")
      .filter(":visible");
  }
  get resourceTypeSelect() {
    return cy
      .contains('button[role="combobox"]', "Select Resource Type")
      .filter(":visible");
  }
  get platformSelect() {
    return cy
      .contains('button[role="combobox"]', "Select Platform")
      .filter(":visible");
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

  selectDateRange(start, end) {
    this.setDateRange(this.activityDateRangeBtn, start, end);
  }

  applyFilters(filterData = {}) {
    if (filterData.activityDate && Array.isArray(filterData.activityDate)) {
      this.selectDateRange(
        filterData.activityDate[0],
        filterData.activityDate[1],
      );
    }
    if (filterData.user) {
      this.selectWithSearch(this.userSelect, filterData.user);
    }
    if (filterData.eventType) {
      this.eventTypeSelect.click();
      this.selectFromDropdown(filterData.eventType);
    }
    if (filterData.resourceType) {
      this.selectWithSearch(this.resourceTypeSelect, filterData.resourceType);
    }
    if (filterData.platform) {
      this.platformSelect.click();
      this.selectFromDropdown(filterData.platform);
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

module.exports = AuditLogsFilter;
