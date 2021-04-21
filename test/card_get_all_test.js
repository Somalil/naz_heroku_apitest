const {cardDeleteAll, cardGetAll, cardGetBody} = require("./helpers");
const {BASE_URL} = require('./constants');
const expect = require('chai').expect;
const supertest = require('supertest');
const faker = require('faker');
const request = supertest(BASE_URL);
let response;
let cardsId = [];

describe('GET ALL CARDS', () => {

    before ( async () => {
      response = await cardGetAll();
    });

    it('should return 200 response', () => {
        expect(response.status).eq(200)
    });

    it('should return body type array', () => {
        expect(response.body).to.be.an('array');
    });

    it('should have properties', () => {
        let isError = false;
        response.body.forEach(el => {
            if (!(el.hasOwnProperty('priority')
                && el.hasOwnProperty('description')
                && el.hasOwnProperty('name'))) {
                isError = true
            }
        });
        expect(isError).eq(false);
    });

})











// describe('GET ALL CARDS', () => {
//     before(async () => {
//         response = await request.get('/card');
//         const cards = response.body;
//
//         //console.log(cards);
//         cards
//             .map(el => el._id)
//             .forEach(el => {
//             request.delete(`/card/${el}`)
//                 .then(res => {
//                     response = res;
//                 })
//                 .catch(err => console.log(err));
//         });
//     });
//
//     it('should return 200 response', () => {
//         request.get('/card').expect(200);
//     });
//
//     it('should return body type array', () => {
//         expect(response.body).to.be.an('array');
//     });
//
//     it('should return 200 response 2', () => {
//         let isError = false;
//         response.body.forEach(el => {
//             if (!(el.hasOwnProperty('priority')
//                 && el.hasOwnProperty('description')
//                 && el.hasOwnProperty('name'))) { isError = true }
//         });
//         expect(isError).eq(false);
//     });
// });
// describe('Create new card', () => {
//
//     it('Create new card', async () => {
//         let arrLength = response.body.length;
//         let newCard = {
//             description: 'with my id',
//             priority: 2,
//             status: 'to do',
//             name: 'AP privet',
//         };
//         await request
//             .post('/card')
//             .send(newCard)
//             //.set('Accept', 'application/json');
//         let responseNew;
//         await request
//             .get('/card')
//             .then(res => {
//                 responseNew = res;
//             });
//         console.log(responseNew.body)
//         expect(responseNew.body.length).equal(arrLength + 1);
//     });
// });
