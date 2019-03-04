const mongoose = require('mongoose');

function CommentModule(db) {
    const commentSchema = new mongoose.Schema({
        timeStamp: String,
        postedBy: String,
        body: String
    });
    const CommentModel = mongoose.model('Comment', commentSchema);

    this.createComment = (newCommentData, callback) => {
        let newCommentModel = new CommentModel({
            timeStamp: newCommentData.timeStamp,
            postedBy: newCommentData.postedBy,
            body: newCommentData.body
        });
        newCommentModel.save((err, doc) => {
            if (err) console.log(err);
            if (doc) callback(doc);
        });
    }

    this.getComments = (callback) => {
        CommentModel.find({}, (err, docs) => {
            if (err) console.log(err);
            if (docs) callback(docs);
        });
    }

    this.getComment = (id, callback) => {
        CommentModel.find({_id: id}, (err, docs) => {
            if (err) console.log(err);
            if (docs) callback(docs);
        });
    }

    this.updateComment = (newCommentData, callback) => {
        CommentModel.updateOne(
            {_id: newCommentData._id}, 
            {timeStamp: newCommentData.timeStamp, postedBy: newCommentData.postedBy, body: newCommentData.body},
            (err, res) => {
                if (err) console.log(err);
                if (res) callback(res);
            }
        );
    }

    this.deleteComment = (id, callback) => {
        CommentModel.deleteOne({_id: id}, (err) => {
            if (err) console.log(err);
            callback();
        });
    }
}
module.exports = CommentModule;
