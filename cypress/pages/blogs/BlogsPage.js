const BaseTablePage = require("../common/BaseTablePage");

class BlogsPage extends BaseTablePage {
  visit() {
    const base = Cypress.env("BASE_URL");
    cy.visit(`${base}/blogs`);
    this.waitForTable();
  }

  clickCreatePost() {
    cy.contains("button", "Create Post").click();
  }

  editFirstBlog() {
    this.clickFirstRowAction(/edit/i);
  }

  deleteFirstBlog() {
    this.clickFirstRowAction(/delete/i);
  }
}

module.exports = BlogsPage;
