
const BaseTablePage = require("../common/BaseTablePage");

class lockPage extends BaseTablePage {
    get settingsMenu() {
        return cy.get(':nth-child(6) > .justify-center');
    }

    get profileLink() {
        return cy.get('[href="/settings/profile"]');
    }

    get lockTab() {
        return cy.get('.space-y-2 > :nth-child(3)');
    }

    get firstInput() {
        return cy.get('.space-y-4 > :nth-child(1) > .flex');
    }

    get secondInput() {
        return cy.get('.space-y-4 > :nth-child(2) > .flex');
    }

    get thirdInput() {
        return cy.get(':nth-child(3) > .flex');
    }

    get dropdownField() {
        return cy.get('.p-6.pt-6 > :nth-child(1) > .flex');
    }

    get saveButton() {
        return cy.get(':nth-child(2) > .p-6.pt-6 > .-mx-6 > .bg-success');
    }

     get resetSuccessMessage() {
        return cy.get('[data-content=""] > div').contains('PIN set successfully');
    }

    openSettings() {
        this.settingsMenu.click();
    }

    goToProfile() {
        this.profileLink.click();
    }

    goToNotifications() {
        this.lockTab.click();
    }

    fillInputField(element, value) {
        element.click();
        element.clear().type(value);
    }

    fillAllInputs(val1, val2, val3) {
        this.fillInputField(this.firstInput, val1);
        this.fillInputField(this.secondInput, val2);
        this.fillInputField(this.thirdInput, val3);
    }

    selectDropdownValue(value) {
        this.dropdownField.click();
        this.selectFromDropdown(value);
    }

    clickSave() {
        this.saveButton.click();
    }

    verifyResetSuccess() {
        this.resetSuccessMessage.should('be.visible');
    }
}

module.exports = lockPage;