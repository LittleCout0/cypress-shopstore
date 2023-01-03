Cypress.Commands.add("loginPageValidation", () => {
  cy.contains("Log in").should("be.visible")
  cy.title().should("contains", "Let's Shop")
  cy.get(".blink_me").should(
    "have.text",
    "Register to sign in with your personal account"
  )
})

Cypress.Commands.add(
  "login",
  (
    user = Cypress.env("valid_username"),
    pwd = Cypress.env("valid_password"),
    { cacheSession = true } = {}
  ) => {
    const login = () => {
      cy.visit(Cypress.env("url"))

      cy.get("#userEmail").type(user, { delay: 0 })
      cy.get("#userPassword").type(pwd, { delay: 0, log: false })
      cy.get("#login").click()
    }

    const validate = () => {
      cy.visit(Cypress.env("url"))
      cy.location("pathname", { timeout: 1000 }).should(
        "not.eql",
        "/auth/login"
      )
    }

    const options = {
      cacheAcrossSpecs: true,
      validate,
    }

    if (cacheSession) {
      cy.session(user, login, options)
    } else {
      login()
    }
  }
)

Cypress.Commands.add("logout", () => {
  cy.get("button:contains(Sign Out)").click()
  cy.contains("Logout Successfully").should("be.visible")
})
