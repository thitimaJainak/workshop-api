const request = require("supertest")
const app = require('../server')

const harry = {
    id: 12,
    name: 'Harry Potter',
    email: 'harry@potter.com',
    phone: '123-456-7890',
    url: 'www.google.com',
    notes: 'Dumbledore is the best wizard'
}

describe('GET /contacts', () => {
    it('should return list of contacts', (done) => {
        request(app).get('/contacts')
            .expect(200)
            .then((res) => {
                let contacts = res.body
                expect(contacts instanceof Array).toBeTruthy()
                let contact = contacts[0]
                expect(contact.id).toBeDefined()
                expect(contact.name).toBeTruthy()
                expect(contact.email).toBeTruthy()
                expect(contact.phone).toBeTruthy()
                expect(contact.url).toBeTruthy()
                expect(contact.notes).toBeTruthy()
                done()
            })
    })
})

describe('GET /contacts/:id', () => {
    it('should return only one contact', (done) => {
        const id = 0
        request(app).get(`/contacts/${id}`)
            .expect(200)
            .then((res) => {
                let contact = res.body
                expect(contact.id).toBeDefined()
                expect(contact.name).toBeTruthy()
                expect(contact.email).toBeTruthy()
                expect(contact.phone).toBeTruthy()
                expect(contact.url).toBeTruthy()
                expect(contact.notes).toBeTruthy()
                expect(contact.id).toEqual(id)
                done()
            })
    })
})

describe('POST /contacts', () => {
    it('should created contact', (done) => {
        request(app).post('/contacts')
            .send(harry)
            .expect(201)
            .then((res) => {
                let contact = res.body
                expect(contact instanceof Object).toBeTruthy()
                expect(contact).toEqual(harry)
                expect(contact.id).toBeTruthy()
                expect(contact.name).toEqual('Harry Potter')
                done()
            })
    })
})

describe('PUT /contacts/:id', () => {
    it('should edited contact', (done) => {
        request(app).put(`/contacts/12`)
            .send(harry)
            .expect(200)
            .then(() => {
                request(app).get(`/contacts`)
                    .then((res) => {
                        let contacts = res.body
                        expect(contacts).toBeTruthy()
                        let contact = contacts[12]
                        expect(contact).toEqual(harry)
                        expect(contact.name).toEqual('Harry Potter')
                        expect(contact.notes).toEqual('Dumbledore is the best wizard')
                        done()
                    })
            })
    })
})

describe('DELETE /contacts/:id', () => {
    it('should deleted contact', (done) => {
        const id = 0;
        request(app).delete(`/contacts/12`)
            .expect(204)
            .then(() => {
                request(app).get(`/contacts`)
                    .then((res) => {
                        let contact = res.body
                        expect(contact.id).not.toEqual(id)
                        done()
                    })
            })
    })
})
