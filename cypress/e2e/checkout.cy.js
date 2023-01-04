describe("Checkout Page Validation", () => {
  beforeEach(() => {
    cy.loginViaAPI()
    cy.addProductToCart()
    cy.accessCart()
    cy.goToCheckout()
  })
  it("insert an invalid coupon and check error message", () => {
    cy.get('[name="coupon"]').type("0102")
    cy.get('[type="submit"]:contains(Apply Coupon)').click()
    cy.contains("Invalid Coupon").should("be.visible")
  })

  it("fill payment data, proceed with the order and check success page", () => {
    cy.url().should("include", "dashboard/order")
    cy.contains("Payment Method").should("be.visible")
    cy.contains("Credit Card").should("be.visible")
    cy.get(".item__details").should("be.visible")
    cy.get(".item__title").should("not.be.empty")
    cy.get(".item__price").should("not.be.empty")
    cy.get(".item__quantity").should("not.be.empty")
    cy.get(".item__description").should("not.be.empty")
    cy.fillCheckoutFields()
    cy.contains("Place Order").click({ force: true })
    cy.get(".img-fluid").should("be.visible")
    cy.get(".hero-primary").should("be.visible").and("have.text", " Thankyou for the order. ")
  })
})
