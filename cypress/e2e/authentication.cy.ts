describe("authentication middleware", () => {
  const pages = ["", "profile", "characters", "villagers", "musics", "insects", "fishes", "sea-creatures"]

  pages.forEach(page =>
    it(`should redirect from ${page} page to login when unauthenticated`, function () {
      cy.visit(`/${page}`)
      cy.url().should("contain", "/login")
    })
  )

  it('should redirect to profile on login', function () {
    cy.login()
  })
})
