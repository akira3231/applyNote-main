const CourseLevelPage = require("../../../pages/courseAndInstitutionManagement/courseLevelManagement/CourseLevelPage.js");
const AddCourseLevelModalPage = require("../../../pages/courseAndInstitutionManagement/courseLevelManagement/AddCourseLevelModalPage.js");
const EditCourseLevelModalPage = require("../../../pages/courseAndInstitutionManagement/courseLevelManagement/EditCourseLevelModalPage.js");

describe("Course Level - CRUD Operations", () => {
  let courseLevelPage;
  let addCourseLevelModal;
  let editCourseLevelModal;

  beforeEach(() => {
    cy.loginWithSession();
    cy.fixture("courseAndInstitutionManagement/courseLevelManagement/crud").as("courseLevelData");
    courseLevelPage = new CourseLevelPage();
    addCourseLevelModal = new AddCourseLevelModalPage();
    editCourseLevelModal = new EditCourseLevelModalPage();
  });


  describe("Read Course Levels", () => {
    it("should display the Course Level by Institution list", () => {
      courseLevelPage.visit();
      courseLevelPage.waitForTable();
      cy.get("tbody tr").should("have.length.gte", 1);
    });

    it("should open course levels for an institution that has data", () => {
      courseLevelPage.visit();
      courseLevelPage.viewInstitutionWithData();
      cy.get("tbody tr").should("have.length.gte", 1);
    });
  });


  describe("Create Course Level", () => {
    it("should create a new course level successfully", function () {
      const newCourseLevel = {
        courseLevelName: `QA Course Level ${Date.now()}`,
        institution: this.courseLevelData.newCourseLevel.institution,
        course: this.courseLevelData.newCourseLevel.course,
      };

      courseLevelPage.visit();
      courseLevelPage.clickAddCourseLevel();
      addCourseLevelModal.assertModalIsOpen();
      addCourseLevelModal.fillForm(newCourseLevel);
      addCourseLevelModal.submit();

      cy.get("body").should("contain.text", this.courseLevelData.successMessage);
    });
  });


  describe("Update Course Level", () => {
    it("should update the first course level inside an institution", function () {
      const updatedCourseLevel = {
        courseLevelName: this.courseLevelData.updatedCourseLevel.courseLevelName,
        course: this.courseLevelData.updatedCourseLevel.course,
      };

      courseLevelPage.visit();
      courseLevelPage.viewInstitutionWithData();
      courseLevelPage.editFirstCourseLevel();

      editCourseLevelModal.assertModalIsOpen();
      editCourseLevelModal.fillForm(updatedCourseLevel);
      editCourseLevelModal.submit();

      cy.get("body").should("contain.text", this.courseLevelData.updateMessage);
    });
  });


  describe("Delete Course Level", () => {
    it("should delete a single course level from within an institution", function () {
      courseLevelPage.visit();
      courseLevelPage.viewInstitutionWithData();
      courseLevelPage.openDeleteForCourseLevel();

      courseLevelPage.assertDeleteModalVisible("Course Level");
      courseLevelPage.confirmDelete();

      cy.get("body").should("contain.text", this.courseLevelData.deleteMessage);
    });

    it("should delete all course levels for an institution from the institution table", function () {
      courseLevelPage.visit();
      courseLevelPage.deleteAllCourseLevelsForFirst();

      courseLevelPage.assertDeleteModalVisible("Course Level");
      courseLevelPage.confirmDelete();

      cy.get("body").should("contain.text", this.courseLevelData.deleteMessage);
    });
  });
});