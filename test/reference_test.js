const assert = require('assert');
const mongoose = require('mongoose');
const User = require('../src/users');
const BlogBook = require('../src/blogBooks');
const Comment = require('../src/comments');

describe('Test de references', () => {
    let user, blogBook, comment;

    beforeEach( (done) => {
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
            done();
        })
    })
    it("Test le titre du livre d'un user", (done) => {
        User.findOne({name:'Robin'}).populate('blogBooks').then((user) => {
            assert(user.blogBooks[0].title==="Les fourmis");
            done();
        })
    })
    it("Test pour retrouver le commentaire d'un user", (done) => {
        User.findOne({name:'Robin'}).populate({
            path: 'blogBooks',
            populate: {
                path:'comments',
                model: 'comment'
            }
        }).then((user) => {
            assert(user.blogBooks[0].comments[0].content==="j'adore les fourmis");
            done();
        })
    })
});