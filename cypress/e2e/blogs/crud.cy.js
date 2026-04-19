const BlogsPage = require("../../pages/blogs/BlogsPage.js");
const AddBlogsPage = require("../../pages/blogs/AddBlogsPage.js");
const EditBlogsPage = require("../../pages/blogs/EditBlogsPage.js");

describe("Blogs - CRUD Operations", () => {
  let blogsPage;
  let addBlogPage;
  let editBlogPage;

  beforeEach(() => {
    cy.loginWithSession();
    cy.fixture("/blogs/crud.json").as("blogData");
  });

  blogsPage = new BlogsPage();
  addBlogPage = new AddBlogsPage();
  editBlogPage = new EditBlogsPage();

  // Test suite: Read
  describe("Read Blogs", () => {
    it("should fetch blogs from API and display them correctly", () => {
      cy.intercept("POST", "**/api/admin/blogs/**").as("getBlogs");

      blogsPage.visit();

      cy.wait("@getBlogs").then((interception) => {
        const body = interception.response.body;
        const data = body.data || body.results || body.blogs || [];
        const apiCount = body.count || data.length;

        blogsPage.assertRecordState(apiCount);
      });
    });
  });

  // Test suite: Create
  describe("Create Blog", () => {
    it("should create a new blog successfully", function () {
      const newBlog = this.blogData.newBlog;

      cy.intercept("POST", "**/api/admin/blogs/**").as("createBlog");

      blogsPage.visit();
      blogsPage.clickCreatePost();

      addBlogPage.assertPageIsOpen();
      addBlogPage.fillForm(newBlog);
      addBlogPage.submit();

      cy.wait("@createBlog").its("response.statusCode").should("eq", 200);
      cy.get("body").should("contain.text", this.blogData.successMessage);

      blogsPage.searchTable(newBlog.title);
      blogsPage.assertExists(newBlog.title);
    });
  });

  // Test suite: Update
  describe("Update Blog", () => {
    it("should update first available blog", function () {
      const updatedBlog = this.blogData.updatedBlog;

      cy.intercept("PUT", "**/api/admin/blogs/**").as("updateBlog");

      blogsPage.visit();
      blogsPage.editFirstBlog();

      editBlogPage.assertPageIsOpen();
      editBlogPage.fillForm(updatedBlog);
      editBlogPage.submit();

      cy.wait("@updateBlog").its("response.statusCode").should("eq", 200);
      cy.get("body").should("contain.text", this.blogData.updateMessage);

      blogsPage.searchTable(updatedBlog.title);
      blogsPage.assertExists(updatedBlog.title);
    });
  });

  // Test suite: Delete
  describe("Delete Blog", () => {
    it("should delete a blog successfully", function () {
      cy.intercept("DELETE", "**/api/admin/blogs/**").as("deleteBlog");

      blogsPage.visit();
      blogsPage.deleteFirstBlog();
      blogsPage.assertDeleteModalVisible("Blog");

      blogsPage.confirmDelete();

      cy.wait("@deleteBlog").its("response.statusCode").should("eq", 200);
      cy.get("body").should("contain.text", this.blogData.deleteMessage);
    });
  });
});
