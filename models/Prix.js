const Types = require('@keystonejs/fields');
const access = require("../services/services");

module.exports = {
  fields: {
    Prix: {
      type: Types.Integer,
      isRequired: true
    }
  },
  labelField: 'Prix',
  //access.userIsAdminOrOwner,
  access: {
    read: true,
    update: access.userIsAdminOrOwner,
    create: access.userIsAdmin,
    delete: access.userIsAdmin,
    auth: true,
  },
};