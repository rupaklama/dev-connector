const mongoose = require('mongoose');
// Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node
// It manages relationships between data, provides schema validation
// Mongoose provides a straight-forward, schema-based solution to model your application data.
// It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.

// pull one property out of mongoose object
// const Schema = mongoose.Schema
const { Schema } = mongoose;

// Using Schema object to create different properties for this new collection.
// Schema Object will describe what each individual record with all db properties.
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// telling mongoose to create new model class instance - user
// first arg - name of the collection & second arg - name of the the Schema
module.exports = User = mongoose.model('user', UserSchema);
