const HqUsersPage = require("../../../pages/userManagement/hqUsers/HqUsersPage.js");
const AddHqUsersModalPage = require("../../../pages/userManagement/hqUsers/AddHqUsersModalPage.js");
const EditHqUsersModalPage = require("../../../pages/userManagement/hqUsers/EditHqUsersModalPage.js");

describe("HqUsers - CRUD Operations", () => {
  let hqUsersPage;
  let addHqUserModal;
  let editHqUserModal;

  beforeEach(() => {
    cy.loginWithSession();
    cy.fixture("/userManagement/hqUsers/crud.json").as("hqUserData");
    hqUsersPage = new HqUsersPage();
    addHqUserModal = new AddHqUsersModalPage();
    editHqUserModal = new EditHqUsersModalPage();
  });

  // Test suite: Read
  describe("Read HqUsers", () => {
    it("should fetch hqUsers from API and display them correctly", () => {
      cy.intercept("POST", "**/api/admin/employees/hq-employees/**").as(
        "getHqUsers",
      );

      hqUsersPage.visit();

      cy.wait("@getHqUsers").then((interception) => {
        const body = interception.response.body;
        const data = body.data || body.results || body.hqUsers || [];
        const apiCount = body.count || data.length;

        hqUsersPage.assertRecordState(apiCount);
      });
    });
  });

  // Test suite: Create
  describe("Create HqUser", () => {
    it("should create a new hqUser successfully", function () {
      const newHqUser = {
        ...this.hqUserData.newHqUser,
        email: `qa.test.user+${Date.now()}@applynote.com`,
      };
      const fullName = `${newHqUser.firstName} ${newHqUser.lastName}`;

      cy.intercept("POST", "**/api/admin/employees/hq-employees/**").as(
        "createHqUser",
      );

      hqUsersPage.visit();
      hqUsersPage.clickAddHqUser();

      addHqUserModal.assertModalIsOpen();
      addHqUserModal.fillForm(newHqUser);

      addHqUserModal.submit();

      cy.wait("@createHqUser").its("response.statusCode").should("eq", 200);
      cy.get("body").should("contain.text", this.hqUserData.successMessage);

      hqUsersPage.searchTable(fullName);
      hqUsersPage.assertExists(fullName);
    });
  });

  // Test suite: Update
  describe("Update HqUser", () => {
    it("should update first available hqUser", function () {
      const updatedHqUser = {
        ...this.hqUserData.updatedHqUser,
        email: `qa.test.updated+${Date.now()}@applynote.com`,
      };
      const fullName = `${updatedHqUser.firstName} ${updatedHqUser.lastName}`;

      cy.intercept("PUT", "**/api/admin/employees/hq-employees/update/**").as(
        "updateHqUser",
      );

      hqUsersPage.visit();
      hqUsersPage.editFirstRow();

      editHqUserModal.assertModalIsOpen();
      editHqUserModal.fillForm(updatedHqUser);
      editHqUserModal.submit();

      cy.wait("@updateHqUser").its("response.statusCode").should("eq", 200);
      cy.get("body").should("contain.text", this.hqUserData.updateMessage);

      hqUsersPage.searchTable(fullName);
      hqUsersPage.assertExists(fullName);
    });
  });

  // Test suite: Delete
  describe("Delete HqUser", () => {
    it("should delete a hqUser successfully", function () {
      cy.intercept("DELETE", "**/api/admin/employees/hq-employees/**").as(
        "deleteHqUser",
      );

      hqUsersPage.visit();
      hqUsersPage.deleteFirstRow();
      hqUsersPage.assertDeleteModalVisible("HQ User");

      hqUsersPage.confirmDelete();

      cy.wait("@deleteHqUser").its("response.statusCode").should("eq", 200);
      cy.get("body").should("contain.text", this.hqUserData.deleteMessage);
    });
  });
});
