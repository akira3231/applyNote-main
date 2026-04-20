const ApplicationPage = require("../../pages/studentManagement/applicationManagement/ApplicationPage.js");
const AddApplicationModalPage = require("../../pages/studentManagement/applicationManagement/AddApplicationModalPage.js");
const EditApplicationModalPage = require("../../pages/studentManagement/applicationManagement/EditApplicationModalPage.js");

describe("Application - CRUD Operations", () => {
  let applicationPage;
  let addApplicationModal;
  let editApplicationModal;

  beforeEach(() => {
    cy.loginWithSession();
    cy.fixture("studentManagement/applicationManagement/crud").as("applicationData");
    applicationPage = new ApplicationPage();
    addApplicationModal = new AddApplicationModalPage();
    editApplicationModal = new EditApplicationModalPage();
  });


  describe("Read Applications", () => {
    it("should display the Applications list", () => {
      applicationPage.visit();
      applicationPage.waitForTable();
      cy.get("tbody tr").should("have.length.gte", 1);
    });

    it("should open View Detail for the first application", () => {
      applicationPage.visit();
      applicationPage.viewDetailFirst();
      cy.url().should("match", /\/students\/applications\/\d+/);
      cy.go("back");
      applicationPage.waitForTable();
    });
  });


  describe("Create Application", () => {
    it("should create a new application successfully", function () {
      const newApplication = {
        student: this.applicationData.newApplication.student,
        studyStartDate: this.applicationData.newApplication.studyStartDate,
        coeDate: this.applicationData.newApplication.coeDate,
        institution: this.applicationData.newApplication.institution,
        course: this.applicationData.newApplication.course,
        visaStatus: this.applicationData.newApplication.visaStatus,
        visaExpiryDate: this.applicationData.newApplication.visaExpiryDate,
        country: this.applicationData.newApplication.country,
        state: this.applicationData.newApplication.state,
        city: this.applicationData.newApplication.city,
        ecRelation: this.applicationData.newApplication.ecRelation,
        ecGivenName: this.applicationData.newApplication.ecGivenName,
        ecFamilyName: this.applicationData.newApplication.ecFamilyName,
        ecEmail: this.applicationData.newApplication.ecEmail,
        ecPhone: this.applicationData.newApplication.ecPhone,
        aqProgramTitle: this.applicationData.newApplication.aqProgramTitle,
        aqSchoolName: this.applicationData.newApplication.aqSchoolName,
        completionMonth: this.applicationData.newApplication.completionMonth,
        completionYear: this.applicationData.newApplication.completionYear,
        firstLanguage: this.applicationData.newApplication.firstLanguage,
        maritalStatus: this.applicationData.newApplication.maritalStatus,
        oshcProvider: this.applicationData.newApplication.oshcProvider,
        totalTuitionFee: this.applicationData.newApplication.totalTuitionFee,
        claimableTuitionFee: this.applicationData.newApplication.claimableTuitionFee,
      };

      applicationPage.visit();
      applicationPage.clickCreateApplication();
      addApplicationModal.assertModalIsOpen();
      addApplicationModal.fillForm(newApplication);
      addApplicationModal.submit();
      cy.get("body").should("contain.text", this.applicationData.successMessage);
    });
  });


  describe("Update Application", () => {
    it("should update the first application successfully", function () {
      const updatedApplication = {
        totalTuitionFee: this.applicationData.updatedApplication.totalTuitionFee,
        claimableTuitionFee: this.applicationData.updatedApplication.claimableTuitionFee,
      };

      applicationPage.visit();
      applicationPage.editFirstApplication();
      editApplicationModal.assertModalIsOpen();
      editApplicationModal.fillForm(updatedApplication);
      editApplicationModal.submit();
      cy.get("body").should("contain.text", this.applicationData.updateMessage);
    });
  });


  describe("Delete Application", () => {
    it("should delete the first application", function () {
      applicationPage.visit();
      applicationPage.openDeleteForApplication();
      applicationPage.assertDeleteModalVisible("Application");
      applicationPage.confirmDelete();
      cy.get("body").should("contain.text", this.applicationData.deleteMessage);
    });
  });


  describe("Generate Report", () => {
    it("should open the generate report popup and trigger PDF download", () => {
      applicationPage.visit();
      applicationPage.generateReportForFirst();
      applicationPage.assertGenerateReportModalVisible();
      applicationPage.clickDownloadPdf();
    });
  });
});