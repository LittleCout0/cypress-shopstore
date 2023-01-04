describe("Filter Validation", () => {
  beforeEach(() => {
    cy.loginViaAPI()
  })
  it("filter a product by name", () => {
    cy.get("[name=search]").should("be.visible")
    cy.searchForValidProduct()
    cy.contains("Showing 1 results").should("be.visible")
    cy.get(".card-img-top").should("be.visible")
  })

  it("filter products by category that's doesn't have products", () => {
    cy.chooseCategory("household")
    cy.contains("Showing 0 results").should("be.visible")
    cy.get("#toast-container").invoke("show").should("be.visible").should("have.text", " No Products Found ")
  })
})
