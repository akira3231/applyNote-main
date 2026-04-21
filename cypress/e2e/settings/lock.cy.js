const lockPage = require('../../pages/settings/lockPage');

describe('User Settings Pin Lock', () => {
    const settingsPage = new lockPage();

    beforeEach(() => {
        cy.loginWithSession();
        cy.visit('https://console.applynote.com');
        settingsPage.waitForTable();
    });

    it('should add or change new pin and save', () => {
        cy.fixture('settings/lock.fixture.json').then((notifData) => {
            settingsPage.openSettings();
            settingsPage.goToProfile();
            settingsPage.goToNotifications();

            settingsPage.fillAllInputs(
                notifData.field1,
                notifData.field2,
                notifData.field3
            );

            settingsPage.selectDropdownValue(notifData.dropdownOption);
            settingsPage.clickSave();
            settingsPage.verifyResetSuccess();
        });
    });
});