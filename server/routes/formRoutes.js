const express = require("express");
const router = express.Router();
const Form = require("../models/Form");
const { v4: uuidv4 } = require("uuid");
const { isAuthenticated } = require("../middleware/auth");

// Get all forms created by the user
router.get("/", isAuthenticated, async (req, res) => {
  try {
    const forms = await Form.find({ creator: req.session.userId });
    res.json(forms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get shared forms
router.get("/shared", isAuthenticated, async (req, res) => {
  try {
    const sharedForms = await Form.find({
      "shared.user": req.session.userId,
    });
    res.json(sharedForms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific form
router.get("/:id", async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);

    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    // Check if the form is public
    if (form.isPublic) {
      return res.json(form);
    }

    // Check if user is authenticated
    if (!req.session.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Check if user is the creator or has access
    const isCreator = form.creator.toString() === req.session.userId;
    const hasAccess = form.shared.some(
      (share) => share.user.toString() === req.session.userId
    );

    if (!isCreator && !hasAccess) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(form);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new form
router.post("/", isAuthenticated, async (req, res) => {
  try {
    const { title, description, fields } = req.body;

    const form = new Form({
      title,
      description,
      fields,
      creator: req.session.userId,
      shareableLink: `${req.protocol}://${req.get("host")}/form/${uuidv4()}`,
    });

    const savedForm = await form.save();
    res.status(201).json(savedForm);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a form
router.put("/:id", isAuthenticated, async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);

    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    // Check if user is the creator or has edit permission
    const isCreator = form.creator.toString() === req.session.userId;
    const hasEditAccess = form.shared.some(
      (share) =>
        share.user.toString() === req.session.userId &&
        share.permission === "edit"
    );

    if (!isCreator && !hasEditAccess) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Update fields
    const { title, description, fields, isPublic } = req.body;

    form.title = title || form.title;
    form.description =
      description !== undefined ? description : form.description;
    form.fields = fields || form.fields;

    if (isCreator && isPublic !== undefined) {
      form.isPublic = isPublic;
    }

    const updatedForm = await form.save();
    res.json(updatedForm);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Share a form with another user
router.post("/:id/share", isAuthenticated, async (req, res) => {
  try {
    const { email, permission } = req.body;

    const form = await Form.findById(req.params.id);

    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    // Check if user is the creator
    if (form.creator.toString() !== req.session.userId) {
      return res
        .status(403)
        .json({ message: "Only the creator can share this form" });
    }

    // Find the user to share with
    const User = require("../models/User");
    const userToShare = await User.findOne({ email });

    if (!userToShare) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if already shared with this user
    const alreadyShared = form.shared.some(
      (share) => share.user.toString() === userToShare._id.toString()
    );

    if (alreadyShared) {
      // Update permission if already shared
      form.shared = form.shared.map((share) => {
        if (share.user.toString() === userToShare._id.toString()) {
          return { ...share, permission };
        }
        return share;
      });
    } else {
      // Add new share
      form.shared.push({
        user: userToShare._id,
        permission,
      });
    }

    await form.save();
    res.json({ message: "Form shared successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a form
router.delete("/:id", isAuthenticated, async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);

    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    // Check if user is the creator
    if (form.creator.toString() !== req.session.userId) {
      return res
        .status(403)
        .json({ message: "Only the creator can delete this form" });
    }

    await form.remove();
    res.json({ message: "Form deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
