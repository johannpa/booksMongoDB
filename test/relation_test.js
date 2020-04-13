const assert = require('assert');
const User = require('../src/users');

describe('Test de relation', () => {
    it('Test la taille de la liste de livre d un user', (done) => {
        const user1 = new User({
            name: 'Pierro',
            books: [{title:'Le seigneur des anneaux'},{title:'Les raisins de la colère'}]
        })

        user1.save().then(() => User.findOne({name:'Pierro'}) )
        .then((user) => {
            assert(user.books.length===2);
            done();
        })
    })

    it('Ajout de livre à un user', (done) => {
        const user1 = new User({
            name: 'Pierro'
        })

        user1.books.push({title:'Le seigneur des anneaux'});

        user1.save().then(() => User.findOne({name:'Pierro'}) )
        .then((user) => {
            assert(user.books.length===1);
            done();
        })
    })

    it('Suppression de livre d un user', (done) => {
        const user1 = new User({
            name: 'Pierro',
            books: [{title:'Le seigneur des anneaux'},{title:'Les raisins de la colère'}]
        })

        user1.books[0].remove();

        user1.save().then(() => User.findOne({name:'Pierro'}) )
        .then((user) => {
            assert(user.books.length===1);
            done();
        })
    })
});
