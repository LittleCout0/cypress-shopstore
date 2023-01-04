describe("Login Page Validation", () => {
  it("log in using valid credentials and check dashboard", () => {
    const user = Cypress.env("valid_username")
    const pwd = Cypress.env("valid_password")
    const options = { cacheSession: false }

    cy.login(user, pwd, options)
    cy.loginPageValidation()

    cy.get("h3").should("be.visible").should("have.text", "Automation")
    cy.contains("Login Successfully").should("be.visible")
    cy.url().should("be.equal", `${Cypress.env("url")}/dashboard/dash`)
  })

  it("shows an error message when an invalid credential is used", () => {
    const user = Cypress.env("invalid_username")
    const pwd = Cypress.env("invalid_password")
    const options = { cacheSession: false }

    cy.login(user, pwd, options)
    cy.contains("Incorrect email or password.").should("be.visible")
    cy.url().should("be.equal", `${Cypress.env("url")}/auth/login`)
  })

  it("shows error message when the fields is not filled", () => {
    cy.visit(Cypress.env("url"))
    cy.get("#login").click()
    cy.contains("Email is required").should("be.visible")
    cy.contains("Password is required").should("be.visible")
    cy.url().should("be.equal", `${Cypress.env("url")}/auth/login`)
  })

  it("log in using API and set token in local storage", () => {
    cy.loginViaAPI()
    cy.get("h3").should("have.text", "Automation")
    cy.url().should("be.equal", `${Cypress.env("url")}/dashboard/dash`)
    cy.getAllLocalStorage().then(storage => {
      expect(storage).to.deep.equal({
        "https://rahulshettyacademy.com": {
          token: Cypress.env("token"),
        },
      })
    })
  })

  it("log out and check the login page", () => {
    const user = Cypress.env("valid_username")
    const pwd = Cypress.env("valid_password")
    const options = { cacheSession: false }
    cy.login(user, pwd, options)

    cy.logout()
    cy.contains("Log in").should("be.visible")
    cy.url().should("be.equal", `${Cypress.env("url")}/auth/login`)
  })
})
