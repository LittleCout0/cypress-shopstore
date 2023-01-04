Cypress.Commands.add("loginPageValidation", () => {
  cy.contains("Log in").should("be.visible")
  cy.title().should("contains", "Let's Shop")
  cy.get(".blink_me").should("have.text", "Register to sign in with your personal account")
})

Cypress.Commands.add(
  "login",
  (user = Cypress.env("valid_username"), pwd = Cypress.env("valid_password"), { cacheSession = true } = {}) => {
    const login = () => {
      cy.visit(Cypress.env("url"))

      cy.get("#userEmail").type(user, { delay: 0 })
      cy.get("#userPassword").type(pwd, { delay: 0, log: false })
      cy.get("#login").click()
    }

    const validate = () => {
      cy.visit(Cypress.env("url"))
      cy.location("pathname", { timeout: 1000 }).should("not.eql", "/auth/login")
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

Cypress.Commands.add("loginViaAPI", () => {
  cy.request("POST", "https://rahulshettyacademy.com/api/ecom/auth/login", {
    userEmail: Cypress.env("valid_username"),
    userPassword: Cypress.env("valid_password"),
  })
    .then(function (resp) {
      expect(resp.status).to.eq(200)
      Cypress.env("token", resp.body.token)
    })
    .then(function () {
      cy.visit(Cypress.env("url"), {
        onBeforeLoad: function (window) {
          window.localStorage.setItem("token", Cypress.env("token"))
        },
      })
    })
})

Cypress.Commands.add("logout", () => {
  cy.get("button:contains(Sign Out)").click()
  cy.contains("Logout Successfully").should("be.visible")
})

Cypress.Commands.add("selectProductFromDashboard", productName => {
  cy.get(".card-body h5").each(($el, index, $list) => {
    if ($el.text().includes(productName)) {
      cy.get(".card > .card-body > .w-40").eq(index).click()
    }
  })
})

Cypress.Commands.add("addProductToCart", (productName = null) => {
  cy.fixture("products").then(products => {
    if (!productName) {
      productName = Cypress._.sample(products)
    }

    cy.get(".card-body h5").each(($el, index, $list) => {
      if ($el.text().includes(productName)) {
        cy.get(".card > .card-body > .w-10").eq(index).click()
      }
    })
  })
})

Cypress.Commands.add("accessCart", () => {
  cy.get("nav ul button:contains(Cart)").click()
})

Cypress.Commands.add("accessRandomProductDetail", () => {
  cy.fixture("products").then(products => {
    let product = Cypress._.sample(products)
    cy.selectProductFromDashboard(product)
    cy.contains(product).should("be.visible")
  })
})

Cypress.Commands.add("searchForValidProduct", () => {
  cy.fixture("products").then(products => {
    let product = Cypress._.sample(products)
    cy.get("[formcontrolname=productName]").eq(1).type(product).type("{enter}")
  })
})

Cypress.Commands.add("chooseCategory", (category = null) => {
  cy.fixture("categories").then(list => {
    if (!category) {
      category = Cypress._.sample(list)
    }
    cy.get("[type=checkbox] + label").each(($el, index, $list) => {
      if ($el.text().includes(category)) {
        cy.get('[type="checkbox"]').eq(index).click({ force: true })
      }
    })
  })
})

Cypress.Commands.add("goToCheckout", () => {
  cy.contains("Buy Now").click()
})

Cypress.Commands.add("fillCheckoutFields", () => {
  cy.get('[placeholder="Select Country"]').type("Braz")
  cy.contains("Brazil").click()
  cy.get("input.txt").eq(1).type("1234")
  cy.get("input.txt").eq(2).type("Test QA", { force: true })
})
