const assert = require('assert');
const Book = require('../src/books');

describe('Test de delete', () => {
    let book1;
    beforeEach((done) => {
        book1 = new Book({title:'Odysée'});
        book1.save().then(() => {
            done();
        });
    })
    function assertDelete(promise, done){
        promise.then(() => {
            Book.findOne({title: 'Odysée'}).then((book) => {
                assert(book===null);
                done();
            })
        })
    }
    it('suppression de livre par instance', (done) => {
        assertDelete(book1.remove(), done);
    });

    it('suppression de livre par modele', (done) => {
        assertDelete(Book.remove({title:'Odysée'}), done)
    });
    it('Recherche un livre par son titre et remove (findOneAndRemove)', (done) =>{
        assertDelete(Book.findOneAndRemove({title:'Odysée'}), done);
    });
    it('Recherche un livre par son titre et remove (findByIdAndRemove)', (done) =>{
        assertDelete(Book.findByIdAndRemove(book1._id), done);
    });
    
});