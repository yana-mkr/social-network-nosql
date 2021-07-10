const { Thought, User } = require('../models');

const thoughtController = {

    getAllThoughts(req, res) {
        Thought.find()
            .sort({ createdAt: - 1 })
            .then((dbThoughtData) => {
                res.json(dbThoughtData)
            })
            .catch(err => res.json(err));
    },

    getThoughtById(req, res) {
        console.log(req.params)
        Thought.findOne({ _id: req.params.thoughtId })
            .then((dbThoughtData) => {
                res.json(dbThoughtData)
            })
            .catch(err => res.json(err));
    },

    // add thought to user
    addThought(req, res) {
        Thought.create(req.body)
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { new: true, runValidators: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },

    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { new: true, runValidators: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },

    removeThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then(deletedThought => {
                if (!deletedThought) {
                    return res.status(404).json({ message: 'No thought with this id!' });
                }
                // return User.findOneAndUpdate(
                //     { thoughts: req.params.thoughtId },
                //     { $pull: { thoughts: req.params.thoughtId } },
                //     { new: true }
                // );
                res.json(deletedThought);
            })
            // .then(dbUserData => {
            //     if (!dbUserData) {
            //         res.status(404).json({ message: 'No user found with that id!' });
            //         return;
            //     }
            //     res.json(dbUserData);
            // })
            .catch(err => res.json(err));
    },

    removeReaction(req, res) {
        console.log(req.params)
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        )
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    }
};

module.exports = thoughtController;

