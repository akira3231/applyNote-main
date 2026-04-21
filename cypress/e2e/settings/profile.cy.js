const SettingsPage = require('../../pages/settings/SettingsPage');

describe('User Settings Profile', () => {
  const settingsPage = new SettingsPage();

  beforeEach(() => {
    cy.loginWithSession();
    cy.visit('https://console.applynote.com');
    settingsPage.waitForTable();
  });

  it('should_update_user_profile', () => {
    cy.fixture('settings/profile.fixture.json').then((profileData) => {
      settingsPage.openSettings();
      settingsPage.goToProfile();
      
      settingsPage.fillPersonalInfo(
        profileData.firstName,
        profileData.lastName,
        profileData.phone,
        profileData.dob,
        profileData.description
      );
      
      settingsPage.fillAddress(
        profileData.street,
        profileData.aptSuite,
        profileData.city,
        profileData.state,
        profileData.postalCode,
        profileData.country
      );
      
      settingsPage.saveProfile();
      
      // Assertions
      settingsPage.assertExists(profileData.firstName);
      settingsPage.assertExists(profileData.lastName);
    });
  });
});