import "cypress-drag-drop";
import "cypress-file-upload";
import "cypress-real-events/support";
import tests from "../e2e/imports/imports";

require("@4tw/cypress-drag-drop");

Cypress.Commands.add("loginWithSession", (username, password, orgName) => {
  const useAuthHubLogin = Cypress.env("USE_AUTHHUB_LOGIN");
  cy.log("Using AuthHub login:", useAuthHubLogin);

  cy.session(`${username}-${orgName}-${Cypress.spec.name}`, () => {
    if (useAuthHubLogin) {
      // AuthHub flow
      return tests
        .visitpage()
        .then(() => {
          return tests.Auth_hub_Username(username);
        })
        .then(() => {
          return tests.Auth_hub_Continue();
        })
        .then(() => {
          return tests.Auth_hub_Password(password);
        })
        .then(() => {
          return tests.Auth_hub_LoginButton();
        }).then(() => {
          return tests.switchOrganization(orgName);
        });
    } else {
      // Legacy login flow
      return tests
        .visitpage()
        .then(() => {
          return tests.Username(username);
        })
        .then(() => {
          return tests.VerifyUsername(username);
        })
        .then(() => {
          return tests.Password(password);
        })
        .then(() => {
          return tests.VerifyPassword(password);
        })
        .then(() => {
          return tests.ClickonLoginButton();
        })
        .then(() => {
          return tests.switchOrganization(orgName);
        });
    }
  });
});

Cypress.Commands.add("logMemoryUsage", () => {
  const memoryUsage = process.memoryUsage();
  console.log("Memory Usage:", memoryUsage);
});

Cypress.Commands.add('waitForPageLoad', (maxWait = 30000) => {
  cy.get('body').should('be.visible');
  
  // Wait for any loading indicators
  cy.get('.loading, .spinner, .loading-overlay', { timeout: maxWait })
    .should('not.exist');
    
  // Ensure JavaScript has loaded
  cy.window().should('have.property', 'Cypress');
  
  // Wait for network to be idle (if using cy.intercept)
  cy.wait(2000); // Buffer for any remaining requests
});

/*Cypress.Commands.add('refreshIfStillVisible', (selector, maxRetries = 3, timeout = 60000) => {

  function check(retriesLeft) {
    cy.get('body').then(($body) => {
      if (!$body.find(selector).length) {
        cy.log(`${selector} not found, continuing`)
        return
      }

      cy.get(selector, { timeout })
        .should('not.be.visible')
        .then(() => {
          cy.log(`${selector} became invisible → continuing`)
        })
        .then(null, () => {
          // this is the "catch" equivalent in Cypress

          if (retriesLeft === 0) {
            throw new Error(`${selector} still visible after max retries`)
          }

          cy.log(`${selector} still visible after ${timeout}ms → reloading (${retriesLeft} retries left)`)

          cy.reload()

          cy.wait(2000)

          return check(retriesLeft - 1)
        })
    })
  }

  check(maxRetries)
});*/

Cypress.Commands.add('refreshIfStillVisible', (selector, timeout = 120000) => {
  cy.log(`Waiting for loader lifecycle: ${selector}`)

  cy.get('body', { timeout }).then(($body) => {
    if ($body.find(selector).length) {
      cy.get(selector, { timeout }).should('not.be.visible')
    } else {
      // Wait briefly to see if it appears
      cy.wait(3000)

      cy.get('body').then(($bodyRetry) => {
        if ($bodyRetry.find(selector).length) {
          cy.get(selector, { timeout }).should('not.be.visible')
        }
      })
    }
  })
})




// import "cypress-drag-drop";
// import "cypress-file-upload";
// import "cypress-real-events/support";
// import tests from "../e2e/imports/imports";

// require("@4tw/cypress-drag-drop");

// Cypress.Commands.add("loginWithSession", (microsoft_username,microsoft_password,username, password, orgName) => {
//   const useAuthHubLogin = Cypress.env("USE_AUTHHUB_LOGIN");
//   cy.log("Using AuthHub login:", useAuthHubLogin);

//   cy.session(`${username}-${orgName}-${Cypress.spec.name}`, () => {
//     if (useAuthHubLogin) {
//       // AuthHub flow
//       return tests
//         .visitpage()
//         .then(() => {
//           return tests.Auth_hub_Username(microsoft_username);
//         }).then(() => {
//               cy.wait(2000); // Adjust the wait time as necessary
//         })
//         .then(() => {
//           return tests.Auth_hub_Continue();
//         }).then(() => {
//               cy.wait(20000); // Adjust the wait time as necessary
//         });
//         // .then(() => {
//         //   return tests.Auth_hub_Password(microsoft_password);
//         // })
//         // .then(() => {
//         //   return tests.Auth_hub_LoginButton();
//         // });
//     // } else {
//     //   // Legacy login flow
//     //   return tests
//     //     .visitpage()
//     //     .then(() => {
//     //       return tests.Username(username);
//     //     })
//     //     .then(() => {
//     //       return tests.VerifyUsername(username);
//     //     })
//     //     .then(() => {
//     //       return tests.Password(password);
//     //     })
//     //     .then(() => {
//     //       return tests.VerifyPassword(password);
//     //     })
//     //     .then(() => {
//     //       return tests.ClickonLoginButton();
//     //     })
//     //     .then(() => {
//     //       return tests.switchOrganization(orgName);
//     //     });
//     }
//   });
// });

// Cypress.Commands.add("logMemoryUsage", () => {
//   if (typeof process !== "undefined" && process.memoryUsage) {
//     const memoryUsage = process.memoryUsage();
//     // eslint-disable-next-line no-console
//     console.log("Memory Usage:", memoryUsage);
//   } else {
//     // eslint-disable-next-line no-console
//     console.log("Memory Usage not available in this context.");
//   }
// });
