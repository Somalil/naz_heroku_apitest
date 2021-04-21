const {BASE_URL} = require('./constants');
const supertest = require('supertest');
const request = supertest(BASE_URL);

async function cardDeleteAll(){
    const cards = (await request.get('/card')).body

    cards
        .map(card => card._id)
        .forEach(el => {
            request.delete(`/card/${el}`)
                .then(res => {
                    console.log(res.body);
                })
                .catch(err => console.log(err));
        })
}

function cardGetAll(){
    return request.get('/card')
}

async function cardGetBody(){
    let response
    await request.get('/card')
        .then(res => {
            response = res.body
        })
    return response
}

async function cardCreateOne(){
    const card = {name: 'test', status: 'test', description: 'test'}
    await request.post('/card').send(card)
}

module.exports = {cardDeleteAll, cardGetAll, cardGetBody, cardCreateOne}
