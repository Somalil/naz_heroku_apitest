const {BASE_URL} = require('./constants');
const expect = require('chai').expect;
const supertest = require('supertest');
const faker = require('faker');
const request = supertest(BASE_URL);
const {cardDeleteAll, cardGetAll, cardGetBody, cardCreateOne} = require('./helpers');
let response;
let cardsId = [];
let lastCard;
describe('DELETE LAST CARD', () => {

    before (async () => {
        let body = await cardGetBody()
        if (body.length === 0) {
            console.log('Body is empty and created one test card')
            await cardCreateOne()
            body = await cardGetBody()
        }
        lastCard = body[body.length-1]
        body.forEach(el => {
            cardsId.push(el._id)
        })
    })

    it('should delete last card', async () => {
        response = await request.delete(`/card/${cardsId[cardsId.length-1]}`)
        expect(response.body).eq('Card deleted')
    })

    it('should restore last card if it is not test card', () => {
        if(lastCard.name === 'test' && lastCard.status === 'test' && lastCard.description === 'test') {
            console.log('Card not restored, because it is a test card')
        }else{ request.post('/card')
                .send(lastCard)
                .then(res => {response = res})
            expect(response.status).eq(200)
        }
    })

})
