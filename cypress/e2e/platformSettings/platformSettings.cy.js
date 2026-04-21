const PlatformSettingsPage = require('../../pages/platformSettings/PlatformSettingsPage');

describe('Platform Settings Update', () => {
    const platformSettingsPage = new PlatformSettingsPage();

    beforeEach(() => {
        cy.loginWithSession();
        cy.visit('https://console.applynote.com');
        platformSettingsPage.waitForTable();
    });

    it('should update platform settings and verify success', () => {
        cy.fixture('platformSettings/platform.fixture.json').then((platformData) => {
            platformSettingsPage.openSettings();
            platformSettingsPage.goToPlatformSettings();

            platformSettingsPage.fillPlatformSettings(platformData);
            platformSettingsPage.clickSave();
            platformSettingsPage.verifySuccessMessage();
        });
    });
});