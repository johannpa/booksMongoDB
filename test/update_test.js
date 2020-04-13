const assert = require('assert');
const Book = require('../src/books');

describe('Test de read', () => {
    let book1;
    let newTitle = 'Game of Thrones';
    beforeEach((done) => {
        book1 = new Book({title:'Moby Dick'});
        book1.save().then(() => {
            done();
        });
    })
    function assertTitle(promise,done){
        promise.then(() => {
            Book.find({}).then((books) => {
                assert(books[0].title===newTitle);
                done();
            })
        })
    }
    it('Update depuis une instance', (done) => {
        book1.set('title',newTitle);
        assertTitle(book1.save(), done);
    });
    it('Update depuis le modele', (done) => {
        assertTitle(Book.update({title:'Moby Dick'}, {title:newTitle}), done);
    });
    it('Recherche un livre par son titre et update (findOneAndUpdate)', (done) =>{
        assertTitle(Book.findOneAndUpdate({title:'Moby Dick'},{title:newTitle}), done);
    });
    it('Recherche un livre par son id et update (findByIdAndUpdate)', (done) =>{
        assertTitle(Book.findByIdAndUpdate(book1._id, {title:newTitle}), done);
    });
    it('Recherche un livre et incremente son nombre de pages', (done) =>{
        Book.update({title:'Moby Dick'},{$inc : {totalPages:3}})
        .then(() => Book.findOne({title:'Moby Dick'}) )
        .then((book) => {
            assert(book.totalPages===3);
            done();
        })
    });

    
});