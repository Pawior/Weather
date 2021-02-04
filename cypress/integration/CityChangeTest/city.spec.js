/// <reference types="Cypress" />
const correctCity = "Poznań";
const wrongCity = "dasgaesd";

before(function () {
  cy.visit("https://pawior.github.io/Weather/");
  cy.get(".pressureP").should("be.visible");
});
beforeEach(() => {
  cy.get(".form-control").as("formInput");
  cy.get(".city").as("cityName");
  cy.get(".btn").as("btn");
});
describe("City Name Test", function () {
  it("Correct", function () {
    cy.get("@formInput").type(correctCity);
    cy.get("@btn").click();
    cy.get("@formInput").clear();
    cy.get("@cityName").contains(correctCity);
  });
  it("Wrong", function () {
    cy.get("@formInput").type(wrongCity);
    cy.get("@btn").click();
    cy.get("@formInput").clear();
    cy.get("@cityName").contains(wrongCity);
  });
});
