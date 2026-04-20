const BaseTablePage = require("../common/BaseTablePage");

class EditBlogsPage extends BaseTablePage {
  get pageTitle() {
    return cy.contains("h1", /Edit Post/i);
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
    return cy.contains("button", /Update/);
  }
  get cancelBtn() {
    return cy.contains("button", "Cancel");
  }

  updateContent(newValue) {
    if (!newValue) return;
    this.contentEditor.then(($el) => {
      const currentValue = $el.text().trim();
      if (currentValue !== newValue) {
        cy.wrap($el).click().type("{selectall}").type(newValue);
      }
    });
  }

  fillForm(blogData) {
    if (blogData.title) this.updateField(this.titleInput, blogData.title);
    if (blogData.coverImage)
      this.coverImageInput.selectFile(blogData.coverImage, { force: true });
    if (blogData.slug) this.updateField(this.slugInput, blogData.slug);
    if (blogData.author) this.updateField(this.authorInput, blogData.author);
    if (blogData.content) this.updateContent(blogData.content);
  }

  submit() {
    this.submitBtn.click();
  }

  cancel() {
    this.cancelBtn.click();
  }

  assertPageIsOpen() {
    this.pageTitle.should("be.visible");
  }
}

module.exports = EditBlogsPage;
