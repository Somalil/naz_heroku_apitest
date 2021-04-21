const { BASE_URL } = require('./constants');
const expect = require('chai').expect;
const supertest = require('supertest');
const faker = require('faker');
const { cardGetAll } = require('./helpers');
const request = supertest(BASE_URL);
let card;
let cardId;

describe('CREATE CARD', async () => {

    it('create card', async () => {
        let response = await cardGetAll()
        let length = response.body.length

        card = {
            name: faker.name.firstName() + ' ' + faker.name.lastName(),
            status: faker.random.arrayElement(['todo', 'done', 'review']),
            description: faker.random.words(5),
            priority: faker.datatype.number(5)
        }

        await request.post('/card').send(card)
        let newResponse = await cardGetAll()
        let newLength = newResponse.body.length
        expect(newLength).eq(length + 1)
    })

    it('verify that the new card exist', async () => {
        let response = await cardGetAll()
        let body = response.body
        let isExist = false
        body.forEach(el => {
            if(el.name === card.name
                && el.status === card.status
                && el.description === card.description
                && el.priority === card.priority) {
                isExist = true
                cardId = el._id
            }
        })
        expect(isExist).eq(true)
    })

    it('delete card', async () => {
        let response = await request.delete('/card/' + cardId)
        expect(response.body).eq('Card deleted')
    })

})