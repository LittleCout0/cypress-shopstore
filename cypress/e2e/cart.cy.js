describe("Cart Page Validation", () => {
  beforeEach(() => {
    cy.loginViaAPI()
    cy.addProductToCart()
    cy.accessCart()
  })
  it("remove an item from cart and check the message displayed", () => {
    cy.get(".btn-danger").click()
    cy.get("h1").eq(1).should("have.text", "No Products in Your Cart !")
    cy.get("#toast-container").invoke("show").should("be.visible").should("have.text", " No Product in Your Cart ")
    cy.url().should("include", "dashboard/cart")
  })

  it("click on 'Continue Shopping' button and check the dashboard page", () => {
    cy.contains("Continue Shopping").click()
    cy.url().should("include", "dashboard/dash")
    cy.get("h3").should("have.text", "Automation")
  })

  it("click on 'Buy Now' button and check the checkout page", () => {
    cy.contains("Buy Now").click()
    cy.url().should("include", "dashboard/order")
    cy.contains("Payment Method").should("be.visible")
    cy.contains("Credit Card").should("be.visible")
    cy.get(".item__details").should("be.visible")
    cy.get(".item__title").should("not.be.empty")
    cy.get(".item__price").should("not.be.empty")
    cy.get(".item__quantity").should("not.be.empty")
    cy.get(".item__description").should("not.be.empty")
  })
})
