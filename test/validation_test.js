const assert = require('assert');
const Book = require('../src/books');

describe('Test de validation', () => {
    it('Un titre doit etre requis', (done) => {
        const book1 = new Book({title: undefined});
        const validationResult = book1.validateSync();
        const {message} = validationResult.errors.title;
        assert(message==='Un titre est requis');
        done();
    })
    it('Un livre doit avoir moins de 3000 pages', (done) => {
        const book1 = new Book({title: 'Les fleurs du mal', totalPages:3001});
        book1.validate( (validationResult) => {
            const {message} = validationResult.errors.totalPages;
            assert(message==='Un livre doit avoir moins de 3000 pages');
            done();
        })
    })
});
