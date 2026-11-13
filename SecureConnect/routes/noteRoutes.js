const express = require("express");
const Note = require("../models/Note");
const { protect, authorizeRole } = require("../middleware/auth");

const router = express.Router();

router.post("/", protect, async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                message: "Title and content are required."
            });
        }

        const note = await Note.create({
            title,
            content,
            user: req.user._id
        });

        req.app.get("events").emit("noteCreated", note._id);

        res.status(201).json({
            message: "Note Created Successfully!",
            note
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/", protect, async (req, res) => {
    try {
        const notes = await Note.find({
            user: req.user._id
        });

        res.status(200).json({
            message: "Notes Retrieved Successfully",
            notes
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.put("/:id", protect, async (req, res) => {
    try {
        const note = await Note.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user._id
            },
            {
                title: req.body.title,
                content: req.body.content
            },
            { new: true, runValidators: true }
        );

        if (!note) {
            return res.status(404).json({
                message: "Note not found or access denied."
            });
        }

        res.status(200).json({
            message: "Note Updated Successfully!",
            note
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete("/:id", protect, async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id
        });

        if (!note) {
            return res.status(404).json({
                message: "Note not found or access denied."
            });
        }

        res.status(200).json({
            message: "Note Deleted Successfully!"
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get(
    "/admin/all",
    protect,
    authorizeRole("admin"),
    async (req, res) => {
        try {
            const notes = await Note.find();

            res.status(200).json({
                message: "Admin Access Granted",
                notes
            });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
);

module.exports = router;
