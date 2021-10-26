/// <reference types="cypress" />


const { timeout } = require("async")

describe('API testing', () => {

  Cypress.config('baseUrl', 'https://reqres.in/api')
  it('GET-READ', () => {
    cy.request('GET', '/users?page=2').then((response) => {
      expect(response).to.have.property('status', 200)
      expect(response.body.data[0].first_name).equal('Michael')
      expect(response.body.data[0].email).equal('michael.lawson@reqres.in')
      expect(response.body.data[0].id).equal(7)
      expect(response.body).to.not.be.null
      expect(response.body.data).to.have.length(6)
    })


  })

  it('POST-CREATE', () => {

    const user = {
      "name": "Gulberk Demir",
      "job": "New QA Engineer"
    }
    cy.request('POST', '/users', user).then(
      (response) => {
        expect(response.status).equal(201)  //201 means created
        expect(response.body).to.have.property("name", "Gulberk Demir")
        expect(response.body).to.have.property("job", "New QA Engineer")
      }
    )
    cy.request('POST','/users',user).its('body').should('include',{name:'Gulberk Demir'})
  })

  it('PUT-UPDATE', () => {
    var user1 = {
      "name": "testnametestname",
      "job": "testjobtest"
  }
    cy.request('PUT', '/api/users/2', user1).then((response) => {
      expect(response.status).equal(200) //200 means success
      expect(response.body.name).equal(user1.name)
      expect(response.body.job).equal(user1.job)
    })

   
  })

  it('DELETE',()=>{
    var user1 = {
        "name": "Fatma",
        "job": "DevOps"
    }

    cy.request('DELETE','/users/2',user1).then((response)=>{
        expect(response.status).equal(204) //204 NO CONTENT

    })

    

 
})

it('DELAYED RESPONSE', () => {

  cy.intercept('GET','https://reqres.in/api/users').as('getUsers')
  cy.request('https://reqres.in/api/users?delay=3',{timeout:20000}) // It waits max 20 seconds




 
})

it('LOGIN',()=>{
  cy.request({

    method: "POST",
    url: "/api/login",
    body: { email:"eve.holt@reqres.i",password: "cityslicka"},
  }).then((response)=>{

    cy.log(response.status)
    
  expect(response.status).equal(201)
 
})
})


  

 

})






