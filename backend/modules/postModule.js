const mongoose = require('mongoose');

function PostModule(db) {
    const PostSchema = new mongoose.Schema({
        timeStamp: String,
        title: String,
        body: String,
        comments: [String]
    });
    const PostModel = mongoose.model('PostModel', PostSchema);
    
    this.createPost = (newPostData, callback) => {
        let newPostModel = new PostModel({
            timeStamp: newPostData.timeStamp,
            title: newPostData.title,
            body: newPostData.body,
            comments: newPostData.comments
        });
        newPostModel.save((err, doc) => {
            if (err) {
                console.log(err);
                callback(false);
            }
            if (doc) {
                callback(true);
            }
        });
    }

    this.getPosts = (callback) => {
        PostModel.find({}, (err, docs) => {
            if (err) console.log(err);
            if (docs) callback(docs);
        });
    }

    this.getPost = (id, callback) => {
        PostModel.find({_id: id}, (err, docs) => {
            if (err) console.log(err);
            if (docs) callback(docs);
        });
    }

    this.updatePost = (newPostData, callback) => {
        PostModel.updateOne(
            {_id: newPostData._id}, 
            {
                timeStamp: newPostData.timeStamp, 
                title: newPostData.title, 
                body: newPostData.body, 
                comments: newPostData.comments
            }, (err, res) => {
                if (err) console.log(err);
                if (res) callback(res);
            }
        );
    }

    this.deletePost = (id, callback) => {
        PostModel.deleteOne({_id: id}, (err) => {
            if (err) console.log(err);
            callback();
        });
    }
}
module.exports = PostModule;