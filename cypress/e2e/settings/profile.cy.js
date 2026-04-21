const SettingsPage = require('../../pages/settings/SettingsPage');

describe('User Settings Profile', () => {
  const settingsPage = new SettingsPage();

  beforeEach(() => {
    cy.loginWithSession();
    cy.visit('https://console.applynote.com');
    settingsPage.waitForTable();
  });

  it('should update user profile', () => {
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
      settingsPage.assertExistsGeneral(profileData.firstName);
      settingsPage.assertExistsGeneral(profileData.lastName);
    });
  });
});