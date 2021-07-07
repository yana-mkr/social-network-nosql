const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: 'You must provide a username!',
            trim: true,
        },

        email: {
            type: String,
            unique: true,
            required: 'You must provide an email!',
            match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
        },

        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],

        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

UserSchema.virtual('friendCount').get(function () {
    return this.friends.reduce((total, friend) => total + friend.length + 1, 0);
})

const User = model('User', UserSchema);

module.exports = Pizza;