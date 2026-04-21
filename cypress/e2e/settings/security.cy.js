const SettingsSecurityPage = require('../../pages/settings/SettingsSecurityPage');

describe('User Settings Security - Reset Failed Validation', () => {
    const settingsPage = new SettingsSecurityPage();

    beforeEach(() => {
        cy.loginWithSession();
        cy.visit('https://console.applynote.com');
        settingsPage.waitForTable();
    });

    it('should fill apply notes and verify reset failed', () => {
        cy.fixture('settings/security.fixture.json').then((apiData) => {
            settingsPage.openSettings();
            settingsPage.goToProfile();
            settingsPage.goToApiKeys();

            settingsPage.fillAllApplyNotes(
                apiData.applyNote1,
                apiData.applyNote2,
                apiData.applyNote3
            );

            settingsPage.saveProfile();

            settingsPage.verifyResetFailed();
        });
    });
});