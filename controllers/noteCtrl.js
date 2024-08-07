const Notes = require("../models/notesModels")

const notesCtrl = {

    getNotes: async (req, res) => {

        try {

            const notes = await Notes.find({ user_id: req.user.id })
            res.json(notes)
        }
        catch (error) {
            return res.status(500).json({ msg: error.message })
        }

    },
    createNote: async (req, res) => {
        try {

            const { title, content, date } = req.body;
            const newNotes = new Notes({
                title,
                content,
                date,
                user_id: req.user.id,
                name: req.user.name,
            })

            await newNotes.save();
            res.json({ msg: "Created Notes Successfully !!!" })
        }
        catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    deleteNote: async (req, res) => {
        try {

            await Notes.findByIdAndDelete(req.params.id);
            res.json({ msg: "Note Deleted" })
        }
        catch (err) {
            return res.josn({ msg: err.message })
        }
    },
    updateNote: async (req, res) => {
        try {

            const { title, content, date } = req.body;
            await Notes.findByIdAndUpdate({ _id: req.params.id }, { title, content, date })
            return res.json({ msg: "Updated Scuccesfully" })

        }
        catch (err) {
            return res.json({ msg: err.message })
        }
    },
    getNote: async (req, res) => {
        try {

            const note = await Notes.findById(req.params.id);
            return res.json(note);

        }
        catch (err) {
            return res.josn({ msg: err.message })
        }
    },


}
module.exports = notesCtrl;