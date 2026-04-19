class AddBlogsPage {
  get pageTitle() {
    return cy.contains("h1", "Create Post");
  }

  get titleInput() {
    return cy.get('input[name="title"]');
  }

  get coverImageInput() {
    return cy.get('input[type="file"][accept*="image"]');
  }

  get slugInput() {
    return cy.get('input[name="slug"]');
  }

  get authorInput() {
    return cy.get('input[name="author"]');
  }

  get contentEditor() {
    return cy.get('div.tiptap.ProseMirror[contenteditable="true"]');
  }

  get submitBtn() {
    return cy.contains("button", "Create");
  }

  get cancelBtn() {
    return cy.contains("button", "Cancel");
  }

  fillForm(blogData) {
    if (blogData.title) this.titleInput.clear().type(blogData.title);

    if (blogData.coverImage)
      this.coverImageInput.selectFile(blogData.coverImage, { force: true });

    if (blogData.slug) this.slugInput.clear().type(blogData.slug);

    if (blogData.author) this.authorInput.clear().type(blogData.author);

    if (blogData.content) {
      this.contentEditor.click().type("{selectall}").type(blogData.content);
    }
  }

  submit() {
    this.submitBtn.click({ force: true });
  }

  cancel() {
    this.cancelBtn.click();
  }

  assertPageIsOpen() {
    this.pageTitle.should("be.visible");
  }
}

module.exports = AddBlogsPage;
