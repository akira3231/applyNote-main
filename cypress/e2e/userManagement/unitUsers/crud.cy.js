const UnitUsersPage = require("../../../pages/userManagement/unitUsers/UnitUsersPage.js");
const AddUnitUsersModalPage = require("../../../pages/userManagement/unitUsers/AddUnitUsersModalPage.js");
const EditUnitUsersModalPage = require("../../../pages/userManagement/unitUsers/EditUnitUsersModalPage.js");

describe("UnitUsers - CRUD Operations", () => {
  let unitUsersPage;
  let addUnitUserModal;
  let editUnitUserModal;

  beforeEach(() => {
    cy.loginWithSession();
    cy.fixture("/userManagement/unitUsers/crud.json").as("unitUserData");
    unitUsersPage = new UnitUsersPage();
    addUnitUserModal = new AddUnitUsersModalPage();
    editUnitUserModal = new EditUnitUsersModalPage();
  });

  // Test suite: Read
  describe("Read UnitUsers", () => {
    it("should fetch unitUsers from API and display them correctly", () => {
      cy.intercept("POST", "**/api/admin/employees/unit-employees/**").as(
        "getUnitUsers",
      );

      unitUsersPage.visit();

      cy.wait("@getUnitUsers").then((interception) => {
        const body = interception.response.body;
        const data = body.data || body.results || body.unitUsers || [];
        const apiCount = body.count || data.length;

        unitUsersPage.assertRecordState(apiCount);
      });
    });
  });

  // Test suite: Create
  describe("Create UnitUser", () => {
    it("should create a new unitUser successfully", function () {
      const newUnitUser = {
        ...this.unitUserData.newUnitUser,
        email: `qa.test.user+${Date.now()}@applynote.com`,
      };
      const fullName = `${newUnitUser.firstName} ${newUnitUser.lastName}`;

      cy.intercept("POST", "**/api/admin/employees/unit-employees/**").as(
        "createUnitUser",
      );

      unitUsersPage.visit();
      unitUsersPage.clickAddUnitUser();

      addUnitUserModal.assertModalIsOpen();
      addUnitUserModal.fillForm(newUnitUser);

      addUnitUserModal.submit();

      cy.wait("@createUnitUser").its("response.statusCode").should("eq", 200);
      cy.get("body").should("contain.text", this.unitUserData.successMessage);

      unitUsersPage.searchTable(fullName);
      unitUsersPage.assertExists(fullName);
    });
  });

  // Test suite: Update
  describe("Update UnitUser", () => {
    it("should update first available unitUser", function () {
      const updatedUnitUser = {
        ...this.unitUserData.updatedUnitUser,
        email: `qa.test.updated+${Date.now()}@applynote.com`,
      };
      const fullName = `${updatedUnitUser.firstName} ${updatedUnitUser.lastName}`;

      cy.intercept("PUT", "**/api/admin/employees/unit-employees/update/**").as(
        "updateUnitUser",
      );

      unitUsersPage.visit();
      unitUsersPage.editFirstRow();

      editUnitUserModal.assertModalIsOpen();
      editUnitUserModal.fillForm(updatedUnitUser);
      editUnitUserModal.submit();

      cy.wait("@updateUnitUser").its("response.statusCode").should("eq", 200);
      cy.get("body").should("contain.text", this.unitUserData.updateMessage);

      unitUsersPage.searchTable(fullName);
      unitUsersPage.assertExists(fullName);
    });
  });

  // Test suite: Delete
  describe("Delete UnitUser", () => {
    it("should delete a unitUser successfully", function () {
      cy.intercept("DELETE", "**/api/admin/employees/unit-employees/**").as(
        "deleteUnitUser",
      );

      unitUsersPage.visit();
      unitUsersPage.deleteFirstRow();
      unitUsersPage.assertDeleteModalVisible("Unit Employee");

      unitUsersPage.confirmDelete();

      cy.wait("@deleteUnitUser").its("response.statusCode").should("eq", 200);
      cy.get("body").should("contain.text", this.unitUserData.deleteMessage);
    });
  });
});
