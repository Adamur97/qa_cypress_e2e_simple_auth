describe('Sign In', () => {
  const baseUrl = 'https://the-internet.herokuapp.com/login';

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it('should allow a user to log in with valid credentials', () => {
    cy.get('#username').type('tomsmith');
    cy.get('#password').type('SuperSecretPassword!');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/secure');
    cy.get('.flash.success')
      .should('be.visible')
      .and('contain.text', 'You logged into a secure area!');
    cy.get('h2').should('contain.text', 'Secure Area');
  });

  it('should show an error when logging in with invalid credentials', () => {
    cy.get('#username').type('invalidUser');
    cy.get('#password').type('invalidPass');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/login');
    cy.get('.flash.error')
      .should('be.visible')
      .and('contain.text', 'Your username is invalid!');
  });

  it('should allow a logged-in user to log out successfully', () => {
    cy.get('#username').type('tomsmith');
    cy.get('#password').type('SuperSecretPassword!');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/secure');

    cy.contains('a', 'Logout').click();

    cy.url().should('include', '/login');
    cy.get('.flash.success')
      .should('be.visible')
      .and('contain.text', 'You logged out of the secure area!');
  });
});
