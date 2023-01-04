describe("Dashboard Page Validation", () => {
  beforeEach(() => {
    cy.loginViaAPI()
  })
  it("click on View button and check product details", () => {
    cy.accessRandomProductDetail()
    cy.url().should("contains", "product-details")
    cy.get(".img-fluid").should("be.visible")
    cy.get(".continue").should("be.visible")
  })

  it("add a product to cart and see success message", () => {
    cy.addProductToCart()
    cy.get('[role="alertdialog"]').should("be.visible").should("have.text", " Product Added To Cart ")
    cy.get(".btn > label").should("have.text", 1)
  })

  it("access cart page with one product added", () => {
    cy.fixture("products").then(products => {
      let product = Cypress._.sample(products)
      cy.addProductToCart(product)
      cy.get('[role="alertdialog"]').should("be.visible").should("have.text", " Product Added To Cart ")
      cy.get(".btn > label").should("have.text", 1)
      cy.get("nav ul button:contains(Cart)").click()
      cy.contains("My Cart").should("be.visible")
      cy.contains(product).should("be.visible")
      cy.get(".itemImg").should("be.visible")
    })
  })
})
