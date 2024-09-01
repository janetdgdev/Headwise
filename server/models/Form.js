const mongoose = require("mongoose");

const formSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    fields: [
      {
        id: String,
        type: {
          type: String,
          enum: [
            "text",
            "textarea",
            "number",
            "dropdown",
            "radio",
            "checkbox",
            "date",
            "email",
            "file",
          ],
          required: true,
        },
        label: {
          type: String,
          required: true,
        },
        placeholder: String,
        required: Boolean,
        options: [String],
        validation: mongoose.Schema.Types.Mixed,
      },
    ],
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    shared: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        permission: {
          type: String,
          enum: ["view", "edit", "submit"],
          default: "view",
        },
      },
    ],
    isPublic: {
      type: Boolean,
      default: false,
    },
    shareableLink: String,
  },
  {
    timestamps: true,
  }
);

const Form = mongoose.model("Form", formSchema);

module.exports = Form;
