describe("authentication middleware", () => {
  it('should access homepage when authenticated', function () {
    cy.login()

    cy.mock("/villagers-anniversary-today*", [
      {
        "id":1648,
        "name":"Koaline",
        "image_url":"https://dodo.ac/np/images/3/3f/Sydney_NH.png",
        "LangDataName":"fr"
      }
    ])

    cy.visit("/")

    cy.get(".HeroSection__logo").should("exist")
  })

  it('should show correct anniversary', function () {
    cy.get(".BirthdaySection")
      .should("exist")
      .should("contain", "Koaline fête son anniversaire aujourd'hui !")
  })
})
