import { shouldRunTest } from "../../pages/generic_method/runalltest.js";
import tests from "../imports/imports.js";
import config from "../../configuration/config.json";
const { username, password } = config;

describe(" designer menu & insert Tab", () => {
  beforeEach(() => {
    cy.loginWithSession(username, password, "DCR Solutions Test");
  });
  describe("0066: Verify the File Menu buttons functionality", () => {
    it("Verify the open tab functionality", function () {
      return tests
        .open_the_graph("graph_id_10")
        .then(() => {
          console.log("0066A");
          return tests.Click_On_File_tab();
          
        })
        .then(() => {
          console.log("0066B");
          return tests.click_on_open_menu();
        })
        .then(() => {
  return cy.contains('.modal-header', 'Open Process', { timeout: 120000 })
    .should('be.visible')
    .within(() => {
      cy.get('button.close').click({ force: true });
    });
});
      //cy.get('#openGraphs').click();
    });
    it("Verify the Save as tab functionality", function () {
      return tests
        .open_the_graph("graph_id_10")
        .then(() => {
          console.log("0066C");
          return tests.Click_On_File_tab();
        })
        .then(() => {
          console.log("0066D");
          return tests.click_on_Save_DCR_Process_As();
        })
        .then(() => {
          console.log("0066E");
          return tests.enter_text("#saveAsGraphTitle", "Test Save As");
        })
        .then(() => {
          console.log("0066F");
          return tests.click_on_Save_DCR_Process_As_button();
        });
    });
    it("Verify the Export as Xml tab functionality", function () {
      return tests
        .open_the_graph("graph_id_10")
        .then(() => {
          console.log("0066G");
          return tests.Click_On_File_tab();
        })
        .then(() => {
          console.log("0066H");
          return tests.Click_on_Export_as_xml();
        });
    });

    it("Verify the Export as SVG tab functionality", function () {
      return tests
        .open_the_graph("graph_id_10")
        .then(() => {
          console.log("0066I");
          return tests.Click_On_File_tab();
        })
        .then(() => {
          console.log("0066J");
          return tests.Click_on_Export_as_SVG();
        });
    });
    it("Verify the Export as png tab functionality", function () {
      return tests
        .open_the_graph("graph_id_10")
        .then(() => {
          console.log("0066K");
          return tests.Click_On_File_tab();
        })
        .then(() => {
          console.log("0066L");
          return tests.Click_on_Export_as_PNG();
        });
    });
    it("Verify the Show Revison History tab functionality", function () {
      return tests
        .open_the_graph("graph_id_10")
        .then(() => {
          console.log("0066M");
          return tests.Click_On_File_tab();
        })
        .then(() => {
          console.log("0066N");
          return tests.Click_on_show_Revision_History();
        });
    });
    it("Verify the Export as png tab functionality", function () {
      return tests
        .open_the_graph("graph_id_10")
        .then(() => {
          console.log("0066O");
          return tests.Click_On_File_tab();
        })
        .then(() => {
          console.log("0066P");
          return tests.Click_on_show_Revision_Details();
        });
    });
  });

  describe("0067: Verify the Insert Menu buttons functionaltiy.", () => {
    it("Verify the New activity tab functionality", function () {
      return tests
        .open_the_graph("graph_id_10")
        .then(() => {
          return tests.Click_On_Insert_tab();
        })
        .then(() => {
          return tests.Click_On_New_activity();
        });
    });
    it("Verify the New Sub graph tab functionality", function () {
      return tests
        .open_the_graph("graph_id_10")
        .then(() => {
          return tests.Click_On_Insert_tab();
        })
        .then(() => {
          return tests.Click_On_New_Sub_graph();
        });
    });
    it("Verify the Add New fragmentaion tab functionality", function () {
      return tests
        .open_the_graph("graph_id_10")
        .then(() => {
          return tests.Click_On_Insert_tab();
        })
        .then(() => {
          return tests.Click_On_Add_New_fragmentaion();
        });
    });
  });
});
