const StudentPage = require("../../pages/studentManagement/StudentPage.js");
const AddStudentModalPage = require("../../pages/studentManagement/AddStudentModalPage.js");
const EditStudentModalPage = require("../../pages/studentManagement/EditStudentModalPage.js");

describe("Students - CRUD Operations", () => {
  let studentsPage;
  let addStudentModal;
  let editStudentModal;

  beforeEach(() => {
    cy.loginWithSession();
    cy.fixture("studentManagement/crud.json").as("studentData");
    studentsPage = new StudentPage();
    addStudentModal = new AddStudentModalPage();
    editStudentModal = new EditStudentModalPage();
  });

  describe("Read Students", () => {
    it("should fetch students from API and display them correctly", () => {
      cy.intercept("POST", "**/api/admin/students/**").as("getStudents");
      studentsPage.visit();
      cy.wait("@getStudents").then((interception) => {
        const body = interception.response.body;
        const data = body.data || body.results || body.students || [];
        const apiCount = body.count || data.length;
        studentsPage.assertRecordState(apiCount);
      });
    });
  });

  describe("Create Student", () => {
    it("should create a new student successfully", function () {
      const newStudent = { ...this.studentData.newStudent, email: `qa.test.student+${Date.now()}@applynote.com` };
      const fullName = `${newStudent.firstName} ${newStudent.lastName}`;
      cy.intercept("POST", "**/api/admin/students/**").as("createStudent");
      studentsPage.visit();
      studentsPage.clickAddStudent();
      addStudentModal.assertModalIsOpen();
      addStudentModal.fillForm(newStudent);
      addStudentModal.submit();
      cy.wait("@createStudent").its("response.statusCode").should("eq", 200);
      cy.get("body").should("contain.text", this.studentData.successMessage);
      studentsPage.searchTable(fullName);
      studentsPage.assertExists(fullName);
    });
  });

  describe("Update Student", () => {
    it("should update first available student", function () {
      const updatedStudent = { ...this.studentData.updatedStudent, email: `qa.test.updated.student+${Date.now()}@applynote.com` };
      const fullName = `${updatedStudent.firstName} ${updatedStudent.lastName}`;
      cy.intercept("PUT", "**/api/admin/students/update/**").as("updateStudent");
      studentsPage.visit();
      studentsPage.editFirstStudent();
      editStudentModal.assertModalIsOpen();
      editStudentModal.fillForm(updatedStudent);
      editStudentModal.submit();
      cy.wait("@updateStudent").its("response.statusCode").should("eq", 200);
      cy.get("body").should("contain.text", this.studentData.updateMessage);
      studentsPage.searchTable(fullName);
      studentsPage.assertExists(fullName);
    });
  });

  describe("Delete Student", () => {
    it("should delete a student successfully", function () {
      cy.intercept("DELETE", "**/api/admin/students/**").as("deleteStudent");
      studentsPage.visit();
      studentsPage.openDeleteForStudent();
      studentsPage.assertDeleteModalVisible("Student");
      studentsPage.confirmDelete();
      cy.wait("@deleteStudent").its("response.statusCode").should("eq", 200);
      cy.get("body").should("contain.text", this.studentData.deleteMessage);
    });
  });
});