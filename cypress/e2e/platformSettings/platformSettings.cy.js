const PlatformSettingsPage = require('../../pages/platformSettings/PlatformSettingsPage');

describe('Platform Settings Update', () => {
    const platformSettingsPage = new PlatformSettingsPage();

    beforeEach(() => {
        cy.loginWithSession();
        cy.visit('https://console.applynote.com');
        platformSettingsPage.waitForTable();
    });

    it('should_update_platform_settings_and_verify_success', () => {
        cy.fixture('platformSettings/platform.fixture.json').then((platformData) => {
            platformSettingsPage.openSettings();
            platformSettingsPage.goToPlatformSettings();

            platformSettingsPage.fillPlatformSettings(platformData);
            platformSettingsPage.clickSave();
            platformSettingsPage.verifySuccessMessage();
        });
    });
});