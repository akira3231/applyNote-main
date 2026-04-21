const BaseTablePage = require("../common/BaseTablePage");

class LinksPage extends BaseTablePage {
    get settingsMenu() {
        return cy.get(':nth-child(6) > .justify-center');
    }

    get platformSettingsLink() {
        return cy.get('[href="/platform-settings"]');
    }


    get linksTab() {
        return cy.get('.space-y-2 > :nth-child(5)');
    }

    get facebookInput() {
        return cy.get('[name="facebook_url"]');
    }

    get instagramInput() {
        return cy.get('[name="instagram_url"]');
    }

    get xInput() {
        return cy.get('[name="x_url"]');
    }

    get youtubeInput() {
        return cy.get('[name="youtube_url"]');
    }

    get tiktokInput() {
        return cy.get('[name="tiktok_url"]');
    }

    get saveButton() {
        return cy.contains('button', 'Save Changes');
    }

    get successMessage() {
        return cy.contains('Platform settings updated successfully');
    }

    openSettings() {
        this.settingsMenu.click();
    }

    goToPlatformSettings() {
        this.platformSettingsLink.click();
    }

    goToLinksTab() {
        this.linksTab.click();
    }

    fillSocialLinks(links) {
        this.facebookInput.clear().type(links.facebook_url);
        this.instagramInput.clear().type(links.instagram_url);
        this.xInput.clear().type(links.x_url);
        this.youtubeInput.clear().type(links.youtube_url);
        this.tiktokInput.clear().type(links.tiktok_url);
    }

    clickSave() {
        this.saveButton.click();
    }

    verifySuccessMessage() {
        this.successMessage.should('be.visible');
    }
}

module.exports = LinksPage;