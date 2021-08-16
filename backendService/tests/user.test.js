const app = require('../app');
const supertest = require('supertest');
const { response, request } = require('../app');
const User = require('../models/userModel');

jest.setTimeout(10000);

beforeAll(async () => {
    await User.deleteMany(); // delete already existing documents
});

let id = '';

test('should post insert a new user', async () => {
    await supertest(app).post('/user/add').send({

        name: " testName",
        email: " test.email",
        password: "test.password",
        gender: " test.gender",
        type: " test.type",
        phoneNumber: 123456789
    }).expect(200).then((response) => {
        id = response.body._id;
    });
});

test('should get all users', async () => {
    await supertest(app).get('/user').expect(200).then(response => {
        if (response.body[0].name !== 'test1' || response.body[0].email !== '{type : String, required : true}'
            || response.body[0].password !== '{type : String, required : true}' || response.body[0].gender !== '{type : String, required : true}'
            || response.body[0].type !== '{type : String, required : true}' || response.body[0].phoneNumber !== 123456) {
            throw new Error('Failed Test');
        }
    }).catch(err => console.log(err));
})

test('should update user by id', async () => {
    await supertest(app).post(`/user/update/${id}`).send({
        name: "testUpdated",
        email: 'testMail',
        password: 'testPassword',
        gender: 'testGender',
        type: 'testType',
        phoneNumber: 123456789

    }).expect(200)
        .then((response) => {
            if (response.body != "testUpdated has been updated")
                throw new Error("Failed test");
        })
})

test('should delete user by id', async () => {
    await supertest(app).delete(`/user/${id}`).expect(200);
});

