const CoursePage = require("../../../pages/courseAndInstitutionManagement/courseManagement/CoursePage");
const AddCourseModalPage = require("../../../pages/courseAndInstitutionManagement/courseManagement/AddCourseModalPage");
const EditCourseModalPage = require("../../../pages/courseAndInstitutionManagement/courseManagement/EditCourseModalPage");

const coursePage = new CoursePage();
const addCourseModal = new AddCourseModalPage();
const editCourseModal = new EditCourseModalPage();
describe("Course - CRUD Operations", () => {
  let coursePage;
  let addCourseModal;
  let editCourseModal;

  beforeEach(() => {
    cy.loginWithSession();
    cy.fixture("courseAndInstitutionManagement/courseManagement/crud").as("courseData");
    coursePage = new CoursePage();
    addCourseModal = new AddCourseModalPage();
    editCourseModal = new EditCourseModalPage();
  });


  describe("Read Courses", () => {
    it("should display the Courses by Institution list", () => {
      coursePage.visit();
      coursePage.waitForTable();
      cy.get("tbody tr").should("have.length.gte", 1);
    });

    it("should open courses for an institution that has data", () => {
      coursePage.visit();
      coursePage.viewInstitutionWithData();
      cy.get("tbody tr").should("have.length.gte", 1);
    });
  });


  describe("Create Course", () => {
    it("should create a new course successfully", function () {
      const newCourse = {
        ...this.courseData.newCourse,
        courseName: `QA Course ${Date.now()}`,
      };

      coursePage.visit();
      coursePage.clickAddCourse();
      addCourseModal.assertModalIsOpen();
      addCourseModal.fillForm(newCourse);
      addCourseModal.submit();

      cy.get("body").should("contain.text", this.courseData.successMessage);
    });
  });


  describe("Update Course", () => {
    it("should update the first course inside an institution", function () {
      const updatedCourse = { ...this.courseData.updatedCourse };

      coursePage.visit();
      coursePage.viewInstitutionWithData();

      coursePage.editFirstCourse();
      editCourseModal.assertModalIsOpen();
      editCourseModal.fillForm(updatedCourse);
      editCourseModal.submit();

      cy.get("body").should("contain.text", this.courseData.updateMessage);

      coursePage.searchTable(updatedCourse.courseName);
      coursePage.assertExists(updatedCourse.courseName);
    });
  });


  describe("Delete Course", () => {
    it("should delete a single course from within an institution", function () {
      coursePage.visit();
      coursePage.viewInstitutionWithData();

      coursePage.openDeleteForCourse();
      coursePage.assertDeleteModalVisible("Course");
      coursePage.confirmDelete();

      cy.get("body").should("contain.text", this.courseData.deleteMessage);
    });

    it("should delete all courses for an institution", function () {
      coursePage.visit();
      coursePage.deleteAllCoursesForFirst();

      coursePage.assertDeleteModalVisible("Course");
      coursePage.confirmDelete();

      cy.get("body").should("contain.text", this.courseData.deleteMessage);
    });
  });
});