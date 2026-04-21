
const BaseTablePage = require("../common/BaseTablePage");

class SettingsSecurityPage extends BaseTablePage {
    get settingsMenu() {
        return cy.get(':nth-child(6) > .justify-center');
    }

    get profileLink() {
        return cy.get('[href="/settings/profile"]');
    }

    get apiKeysTab() {
        return cy.get('.pt-0 > .space-y-2 > :nth-child(2)');
    }

    get firstApplyNote() {
        return cy.get('.space-y-4 > :nth-child(1) > .relative > .flex');
    }

    get secondApplyNote() {
        return cy.get(':nth-child(3) > .relative > .flex');
    }

    get thirdApplyNote() {
        return cy.get(':nth-child(4) > .relative > .flex');
    }

    get saveButton() {
        return cy.contains('button', 'Save Changes');
    }

    get resetFailedMessage() {
        return cy.get('[data-content=""] > div').contains('Reset failed');
    }

    openSettings() {
        this.settingsMenu.click();
    }

    goToProfile() {
        this.profileLink.click();
    }

    goToApiKeys() {
        this.apiKeysTab.click();
    }


    fillApplyNoteField(element, value) {
        element.click();
        element.clear().type(value);
    }

    fillAllApplyNotes(note1, note2, note3) {
        this.fillApplyNoteField(this.firstApplyNote, note1);
        this.fillApplyNoteField(this.secondApplyNote, note2);
        this.fillApplyNoteField(this.thirdApplyNote, note3);
    }

    saveProfile() {
        this.saveButton.click();
    }

    verifyResetFailed() {
        this.resetFailedMessage.should('be.visible');
    }
}

module.exports = SettingsSecurityPage;