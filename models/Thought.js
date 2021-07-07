const { Schema, model, Types } = require('mongoose');

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            validate: [({ length }) => length === (1, 280), 'Enter 1 - 280 characters']
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
        },

        username: {
            type: String,
            required: 'You must enter your username!'
        },

        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.reduce((total, reaction) => total + reaction.length + 1, 0);
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
