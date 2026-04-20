const SubUnitUsersPage = require("../../../pages/userManagement/subUnitUsers/SubUnitUsersPage.js");
const AddSubUnitUsersModalPage = require("../../../pages/userManagement/subUnitUsers/AddSubUnitUsersModalPage.js");
const EditSubUnitUsersModalPage = require("../../../pages/userManagement/subUnitUsers/EditSubUnitUsersModalPage.js");

describe("SubUnitUsers - CRUD Operations", () => {
  let subUnitUsersPage;
  let addSubUnitUserModal;
  let editSubUnitUserModal;

  beforeEach(() => {
    cy.loginWithSession();
    cy.fixture("/userManagement/subUnitUsers/crud.json").as("subUnitUserData");
    subUnitUsersPage = new SubUnitUsersPage();
    addSubUnitUserModal = new AddSubUnitUsersModalPage();
    editSubUnitUserModal = new EditSubUnitUsersModalPage();
  });

  // Test suite: Read
  describe("Read SubUnitUsers", () => {
    it("should fetch subUnitUsers from API and display them correctly", () => {
      cy.intercept("POST", "**/api/admin/employees/subunit-employees/**").as(
        "getSubUnitUsers",
      );

      subUnitUsersPage.visit();

      cy.wait("@getSubUnitUsers").then((interception) => {
        const body = interception.response.body;
        const data = body.data || body.results || body.subUnitUsers || [];
        const apiCount = body.count || data.length;

        subUnitUsersPage.assertRecordState(apiCount);
      });
    });
  });

  // Test suite: Create
  describe("Create SubUnitUser", () => {
    it("should create a new subUnitUser successfully", function () {
      const newSubUnitUser = {
        ...this.subUnitUserData.newSubUnitUser,
        email: `qa.test.user+${Date.now()}@applynote.com`,
      };
      const fullName = `${newSubUnitUser.firstName} ${newSubUnitUser.lastName}`;

      cy.intercept("POST", "**/api/admin/employees/subunit-employees/**").as(
        "createSubUnitUser",
      );

      subUnitUsersPage.visit();
      subUnitUsersPage.clickAddSubUnitUser();

      addSubUnitUserModal.assertModalIsOpen();
      addSubUnitUserModal.fillForm(newSubUnitUser);

      addSubUnitUserModal.submit();

      cy.wait("@createSubUnitUser")
        .its("response.statusCode")
        .should("be.oneOf", [200, 201, 202, 204]);
      cy.get("body").should(
        "contain.text",
        this.subUnitUserData.successMessage,
      );

      subUnitUsersPage.searchTable(fullName);
      subUnitUsersPage.assertExists(fullName);
    });
  });

  // Test suite: Update
  describe("Update SubUnitUser", () => {
    it("should update first available subUnitUser", function () {
      const updatedSubUnitUser = {
        ...this.subUnitUserData.updatedSubUnitUser,
        email: `qa.test.updated+${Date.now()}@applynote.com`,
      };
      const fullName = `${updatedSubUnitUser.firstName} ${updatedSubUnitUser.lastName}`;

      cy.intercept(
        "PUT",
        "**/api/admin/employees/subunit-employees/update/**",
      ).as("updateSubUnitUser");

      subUnitUsersPage.visit();
      subUnitUsersPage.editFirstRow();

      editSubUnitUserModal.assertModalIsOpen();
      editSubUnitUserModal.fillForm(updatedSubUnitUser);
      editSubUnitUserModal.submit();

      cy.wait("@updateSubUnitUser")
        .its("response.statusCode")
        .should("be.oneOf", [200, 201, 202, 204]);
      cy.get("body").should("contain.text", this.subUnitUserData.updateMessage);

      subUnitUsersPage.searchTable(fullName);
      subUnitUsersPage.assertExists(fullName);
    });
  });

  // Test suite: Delete
  describe("Delete SubUnitUser", () => {
    it("should delete a subUnitUser successfully", function () {
      cy.intercept("DELETE", "**/api/admin/employees/subunit-employees/**").as(
        "deleteSubUnitUser",
      );

      subUnitUsersPage.visit();
      subUnitUsersPage.deleteFirstRow();
      subUnitUsersPage.assertDeleteModalVisible("Sub Unit User");

      subUnitUsersPage.confirmDelete();

      cy.wait("@deleteSubUnitUser")
        .its("response.statusCode")
        .should("be.oneOf", [200, 201, 202, 204]);
      cy.get("body").should("contain.text", this.subUnitUserData.deleteMessage);
    });
  });
});
