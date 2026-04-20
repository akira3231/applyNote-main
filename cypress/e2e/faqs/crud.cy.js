const FaqsPage = require("../../pages/faqs/FaqsPage.js");
const AddFaqsModalPage = require("../../pages/faqs/AddFaqsModalPage.js");
const EditFaqsModalPage = require("../../pages/faqs/EditFaqsModalPage.js");

describe("Faqs - CRUD Operations", () => {
  let faqsPage;
  let addFaqModal;
  let editFaqModal;

  beforeEach(() => {
    cy.loginWithSession();
    cy.fixture("/faqs/crud.json").as("faqData");
  });

  faqsPage = new FaqsPage();
  addFaqModal = new AddFaqsModalPage();
  editFaqModal = new EditFaqsModalPage();

  // Test suite: Read
  describe("Read Faqs", () => {
    it("should fetch faqs from API and display them correctly", () => {
      cy.intercept("POST", "**/api/admin/faq/**").as("getFaqs");

      faqsPage.visit();

      cy.wait("@getFaqs").then((interception) => {
        const body = interception.response.body;

        const data = body.data || body.results || body.agreements || [];

        const apiCount = body.count || data.length;

        faqsPage.assertRecordState(apiCount);
      });
    });
  });

  // Test suite: Create
  describe("Create Faq", () => {
    it("should create a new faq successfully", function () {
      const newFaq = this.faqData.newFaq;
      cy.intercept("POST", "**/api/admin/faq/**").as("createFaq");

      faqsPage.visit();
      faqsPage.clickAddFaq();

      addFaqModal.fillForm(this.faqData.newFaq);
      addFaqModal.submit();

      cy.wait("@createFaq")
        .its("response.statusCode")
        .should("be.oneOf", [200, 201, 202, 204]);

      cy.get("body").should("contain.text", this.faqData.successMessage);

      faqsPage.searchTable(newFaq.question);
      faqsPage.assertExists(newFaq.question);
    });
  });

  // Test suite: Update
  describe("Update Faq", () => {
    it("should update first available faq", function () {
      const updatedFaq = this.faqData.updatedFaq;

      cy.intercept("PUT", "**/api/admin/faq/update/**").as("updateFaq");

      faqsPage.visit();

      faqsPage.editFirstRow();

      editFaqModal.assertModalIsOpen();
      editFaqModal.fillForm(updatedFaq);
      editFaqModal.submit();

      cy.wait("@updateFaq")
        .its("response.statusCode")
        .should("be.oneOf", [200, 201, 202, 204]);
      cy.get("body").should("contain.text", this.faqData.updateMessage);

      faqsPage.searchTable(updatedFaq.question);
      faqsPage.assertExists(updatedFaq.question);
    });
  });

  // Test suite: Delete
  describe("Delete Faq", () => {
    it("should delete a faq successfully", function () {
      cy.intercept("DELETE", "**/api/admin/faq/delete/**").as("deleteFaq");

      faqsPage.visit();
      faqsPage.deleteFirstRow();
      faqsPage.assertDeleteModalVisible("Faq");

      faqsPage.confirmDelete();

      cy.wait("@deleteFaq")
        .its("response.statusCode")
        .should("be.oneOf", [200, 201, 202, 204]);

      cy.get("body").should("contain.text", this.faqData.deleteMessage);
    });
  });
});
