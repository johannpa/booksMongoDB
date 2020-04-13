const assert = require('assert');
const Book = require('../src/books');

describe('Test de create', () => {
    it('Sauvegarde d un livre', (done) => {
        const book1 = new Book({title: "Harry Potter"});
        book1.save().then(() => {
            assert(!book1.isNew);
            done();
        });
    })
});
