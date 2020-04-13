const mongoose = require('mongoose');
const BookSchema = require('./books').schema;
const blogBook = require('./blogBooks');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:String,
    books:[BookSchema],
    blogBooks:[{
        type: Schema.Types.ObjectId,
        ref: 'blogBook'
    }]
});

UserSchema.virtual('countBooks').get(function(){
    return this.books.length;
})

UserSchema.pre('remove', function (next) {
    blogBook.remove({_id : {$in : this.blogBooks}}).then(() => {
        next();
    })
})
const User = mongoose.model('user', UserSchema);

module.exports = User;