const mongoose = require('mongoose');

mongoose.Promise = global.Promise;


before((done) => {
    mongoose.connect('mongodb://localhost/books_test', {
        useMongoClient:true
    });

    mongoose.connection
        .once('open', () => 
        {
            console.log('Connexion est établie'); done()
        })
        .on('error',(error) => {
            console.warn('Erreur durant la connexion', error);
        })
    
})

beforeEach('Supprime les données', (done) =>{
    mongoose.connection.db.dropDatabase().then(() => {
        done();
    })
})
    