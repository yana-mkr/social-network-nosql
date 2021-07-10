const { User } = require('../models');

const userController = {

    getAllUsers(req, res) {
        User.find()
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(user)
            })
    },
    // get all users
    // async getAllUsers(req, res) {
    //     try {
    //         const dbUserData = await User.find({})
    //             .populate({
    //                 path: 'thoughts',
    //                 select: '-__v'
    //             })
    //             .select('-__v');
    //         res.status(200).json(dbUserData)
    //     }
    //     catch (error) {
    //         console.log(error);
    //         res.status(500).json({});
    //     }

    // get one user by id
    getUserById(req, res) {
        console.log(req.params)
        User.findOne({ _id: req.params.id })
            .populate({
                path: 'thoughts',
                select: '-__v',
            })
            .populate({
                path: 'friends'
            })
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: ' No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // create a user
    createUser(req, res) {
        User.create(req.body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    // update user by id
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true, runValidators: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    // delete user
    deleteUser(req, res) {
        console.log(req.params)
        User.findOneAndDelete({ _id: req.params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    addFriend(req, res) {
        console.log(req.params)
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $push: { friends: req.params.friendId } },
            { new: true, runValidators: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' })
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    }
}

module.exports = userController;