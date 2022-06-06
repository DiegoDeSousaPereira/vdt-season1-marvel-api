describe('POST /characters', function () {

    before(function () {
        cy.back2ThePast()
        cy.setToken()
    })


    it('deve cadastrar um personagem', function () {
        const character = {
            name: 'ToStarkkyny ',
            alias: 'Homem de ferro',
            team: ['Marvel', 'Vingadores'],
            active: true
        }

        cy.postChracter(character)
        .then(function(response){
            expect(response.status).to.eql(201)
            cy.log(response.body.character_id)
            expect(response.body.character_id.length).to.eql(24)
        })
        
            
    })


    context.only('quando o personagem ja existe', function(){

        const character = {
            
                name: "Charles Xavier",
                alias: "Professor",
                team: ["X-men"],
                active: true
        }

        before(function(){
            cy.request({
                method: 'POST',
                url: 'https://marvel-qa-cademy.herokuapp.com/characters',
                body: character,
                headers: {
                    Authorization: Cypress.env('token')
                },
                failOnStatusCode: false
            }).then(function(response) {
                expect(response.status).to.eql(201)
                cy.log(response.body.character_id)
            })

        })

        it('não deve cadastrar duplicado', function(){

            cy.request({
                method: 'POST',
                url: 'https://marvel-qa-cademy.herokuapp.com/characters',
                body: character,
                headers: {
                    Authorization: Cypress.env('token')
                },
                failOnStatusCode: false

            }).then(function(response) {
                expect(response.status).to.eql(400)
                expect(response.body.error).to.eql('Duplicate character')
            })
        })

            
    })

})


Cypress.Commands.add('postCharacter', function(payLoad){

    cy.request({
        method: 'POST',
        url: 'https://marvel-qa-cademy.herokuapp.com/characters',
        body: payLoad,
        headers: {
            Authorization: Cypress.env('token')
        },
        failOnStatusCode: false
    }).then(function(response){
        return response
    })
})