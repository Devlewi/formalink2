describe('Inscription utilisateur', () => {
  it('En tant qu’utilisateur, je peux m’inscrire à une formation', () => {
    cy.visit('http://localhost:3000/');
    cy.get('input[name="nom"]').type('Jean');
    cy.get('input[name="prenom"]').type('Dupont');
    cy.get('input[name="contact"]').type('0701020304');
    cy.get('select[name="formation"]').select('Laravel');
    cy.get('button[type="submit"]').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Inscription réussie !');
    });
  });

  it('Affiche des erreurs si le formulaire est vide', () => {
    cy.visit('http://localhost:3000/');
    cy.get('button[type="submit"]').click();
    cy.get('[data-cy="erreur"]').should('contain', 'Tous les champs sont requis.');
  });
});
