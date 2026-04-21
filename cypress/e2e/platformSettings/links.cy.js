const LinksPage = require('../../pages/platformSettings/linksPage');

describe('Platform Settings - Social Links', () => {
    const linksPage = new LinksPage();

    beforeEach(() => {
        cy.loginWithSession();
        cy.visit('https://console.applynote.com');
        linksPage.waitForTable();
    });

    it('should update social links and verify_success', () => {
        cy.fixture('platformSettings/links.fixture.json').then((linksData) => {
            linksPage.openSettings();
            linksPage.goToPlatformSettings();
            linksPage.goToLinksTab();

            linksPage.fillSocialLinks(linksData);
            linksPage.clickSave();
            linksPage.verifySuccessMessage();
        });
    });
});