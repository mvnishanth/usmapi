'use strict';
let mongoose = require('mongoose');
const Schema = mongoose.Schema;
let usersSchema = new Schema({

    "email": {
        "type": "string",
        "unique": true,
        "required": true
      },
      "password": {
        "type": "string",
        "required": false
      },
      "phone": {
        "type": "string",
        "required": false
      },
      "name": {
        "type": "string",
        "required": false
      },
      "gender": {
        "type": "string",
        "required": false
      },
      "Designation": {
        "type": "string",
        "required": false
      },

})
const fillData = function (obj) {
    return Object.assign({}, {
      'email': obj.email.toLowerCase(),
      'password': obj.password,
      'phone': obj.phone,
      'name': obj.name,
      'Designation': obj.Designation,
      'gender': obj.gender,
    })
}

const users = mongoose.model('users', usersSchema);
module.exports = { 'model': users, 'fillData': fillData };