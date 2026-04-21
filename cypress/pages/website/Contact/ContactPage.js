const BaseTablePage = require('../../common/BaseTablePage');


class ContactPage extends BaseTablePage {
    get contactLink() {
        return cy.get(':nth-child(4) > .px-2');
    }

    get firstNameInput() {
        return cy.get('[name="first_name"]');
    }

    get lastNameInput() {
        return cy.get('[name="last_name"]');
    }

    get emailInput() {
        return cy.get('[name="email"]');
    }

    get countryCodeDropdown() {
        return cy.get('[data-testid="country-trigger"]').eq(0);
    }

    get phoneInput() {
        return cy.get('[name="phone"]');
    }

    get secondCountryDropdown() {
        return cy.get('[data-testid="country-trigger"]').eq(1);
    }

    get thirdCountryDropdown() {
        return cy.get('[data-testid="country-trigger"]').eq(2);
    }

    get subjectDropdown() {
        return cy.get(':nth-child(7) > .flex');
    }

    get messageInput() {
        return cy.get('[name="message"]');
    }

    get successMessage() {
        return cy.contains('Message sent successfully!');
    }

    get sendButton() {
        return cy.get('.flex-1')
    }

    get customSearchInput() {
        return cy.get('#radix-\\:r15\\: > .p-1 > .flex-col > .sticky > .min-w-0');
    }

    visitContactPage() {
        this.contactLink.click();
    }

    selectWithCustomSearch(triggerEl, value) {
        triggerEl.click({ force: true });

        // Wait for dropdown + input
        cy.get('[data-testid="country-search"]', { timeout: 10000 })
            .should('be.visible')
            .clear()
            .type(value);

        // Wait for filtered results and click
        cy.get('[data-testid="country-option"]')
            .should('have.length.greaterThan', 0)
            .contains(value)
            .click({ force: true });
    }

    fillContactForm(data) {
        this.firstNameInput.clear().type(data.first_name);
        this.lastNameInput.clear().type(data.last_name);
        this.emailInput.clear().type(data.email);

        this.selectWithCustomSearch(this.countryCodeDropdown, data.country_code);

        this.phoneInput.clear().type(data.phone);

        this.selectWithCustomSearch(this.secondCountryDropdown, data.country);
        this.selectWithCustomSearch(this.thirdCountryDropdown, data.preferred_country);

        this.subjectDropdown.click();
        this.selectFromDropdown(data.subject);

        this.messageInput.clear().type(data.message);
    }

    clickSendMessage() {
        this.sendButton.click();
    }

    verifySuccessMessage() {
        this.successMessage.should('be.visible');
    }
}

module.exports = ContactPage;