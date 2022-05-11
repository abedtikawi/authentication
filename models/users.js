const mongoose = require('mongoose');
const { String, Boolean, Number } = mongoose.SchemaTypes;

const UsersSchema = mongoose.Schema(
  {
    email: { type: String, unique: true },
    password: { type: String },
    name: { type: String },
    surname: { type: String },
    isAvailable: { type: Boolean, default: true },
    loginAttempts: { type: Number, default: 0 },
    isLocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Users', UsersSchema);
