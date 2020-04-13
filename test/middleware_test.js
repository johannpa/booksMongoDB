const assert = require('assert');
const mongoose = require('mongoose');
const User = require('../src/users');
const BlogBook = require('../src/blogBooks');
const Comment = require('../src/comments');

describe('Test de middleware', () =>{

    it("Test que les livres sont supprimés si le user est suprimé", (done) => {
        user = new User({
            name: 'Robin'
        });
        blogBook = new BlogBook({
            title:'Les fourmis',
            summary: 'Les fourmis : Un livre qui concerne les fourmis'
        });
        comment = new Comment({
            content: "j'adore les fourmis"
        })

        user.blogBooks.push(blogBook);
        blogBook.comments.push(comment);
        comment.user = user;

        Promise.all([user.save(), blogBook.save(), comment.save()]).then(() => {
            user.remove().then(() => {
                BlogBook.count().then((count) => {
                    assert(count===0);
                    done();
                })
            })
        })
    })
})
