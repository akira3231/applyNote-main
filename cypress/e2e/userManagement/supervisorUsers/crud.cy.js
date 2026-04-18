const SupervisorUsersPage = require("../../../pages/userManagement/supervisorUsers/supervisorUsersPage.js");
const AddSupervisorUsersModalPage = require("../../../pages/userManagement/supervisorUsers/AddSupervisorUsersModalPage.js");
const EditSupervisorUsersModalPage = require("../../../pages/userManagement/supervisorUsers/EditSupervisorUsersModalPage.js");

describe("SupervisorUsers - CRUD Operations", () => {
  let supervisorUsersPage;
  let addSupervisorUserModal;
  let editSupervisorUserModal;

  beforeEach(() => {
    cy.loginWithSession();
    cy.fixture("/userManagement/supervisorUsers/crud.json").as(
      "supervisorUserData",
    );
    supervisorUsersPage = new SupervisorUsersPage();
    addSupervisorUserModal = new AddSupervisorUsersModalPage();
    editSupervisorUserModal = new EditSupervisorUsersModalPage();
  });

  // Test suite: Read
  describe("Read SupervisorUsers", () => {
    it("should fetch supervisorUsers from API and display them correctly", () => {
      cy.intercept("POST", "**/api/admin/supervisor/**").as(
        "getSupervisorUsers",
      );

      supervisorUsersPage.visit();

      cy.wait("@getSupervisorUsers").then((interception) => {
        const body = interception.response.body;
        const data = body.data || body.results || body.hqUsers || [];
        const apiCount = body.count || data.length;

        supervisorUsersPage.assertRecordState(apiCount);
      });
    });
  });

  // Test suite: Create
  describe("Create SupervisorUser", () => {
    it("should create a new supervisorUser successfully", function () {
      const newSupervisorUser = {
        ...this.supervisorUserData.newSupervisorUser,
        email: `qa.test.user+${Date.now()}@applynote.com`,
      };
      const fullName = `${newSupervisorUser.firstName} ${newSupervisorUser.lastName}`;

      cy.intercept("POST", "**/api/admin/supervisor/**").as(
        "createSupervisorUser",
      );

      supervisorUsersPage.visit();
      supervisorUsersPage.clickAddSupervisorUser();

      addSupervisorUserModal.assertModalIsOpen();
      addSupervisorUserModal.fillForm(newSupervisorUser);

      addSupervisorUserModal.submit();

      cy.wait("@createSupervisorUser")
        .its("response.statusCode")
        .should("eq", 200);
      cy.get("body").should(
        "contain.text",
        this.supervisorUserData.successMessage,
      );

      supervisorUsersPage.searchTable(fullName);
      supervisorUsersPage.assertExists(fullName);
    });
  });

  // Test suite: Update
  describe("Update SupervisorUser", () => {
    it("should update first available supervisorUser", function () {
      const updatedSupervisorUser = {
        ...this.supervisorUserData.updatedSupervisorUser,
        email: `qa.test.updated+${Date.now()}@applynote.com`,
      };
      const fullName = `${updatedSupervisorUser.firstName} ${updatedSupervisorUser.lastName}`;

      cy.intercept("PUT", "**/api/admin/supervisor/update/**").as(
        "updateSupervisorUser",
      );

      supervisorUsersPage.visit();
      supervisorUsersPage.editFirstRow();

      editSupervisorUserModal.assertModalIsOpen();
      editSupervisorUserModal.fillForm(updatedSupervisorUser);
      editSupervisorUserModal.submit();

      cy.wait("@updateSupervisorUser")
        .its("response.statusCode")
        .should("eq", 200);
      cy.get("body").should(
        "contain.text",
        this.supervisorUserData.updateMessage,
      );

      supervisorUsersPage.searchTable(fullName);
      supervisorUsersPage.assertExists(fullName);
    });
  });

  // Test suite: Delete
  describe("Delete SupervisorUser", () => {
    it("should delete a supervisorUser successfully", function () {
      cy.intercept("DELETE", "**/api/admin/supervisor/**").as(
        "deleteSupervisorUser",
      );

      supervisorUsersPage.visit();
      supervisorUsersPage.deleteFirstRow();
      supervisorUsersPage.assertDeleteModalVisible("Supervisor User");

      supervisorUsersPage.confirmDelete();

      cy.wait("@deleteSupervisorUser")
        .its("response.statusCode")
        .should("eq", 200);
      cy.get("body").should(
        "contain.text",
        this.supervisorUserData.deleteMessage,
      );
    });
  });
});
