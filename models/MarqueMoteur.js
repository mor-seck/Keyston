const Types = require('@keystonejs/fields');
const access = require("../services/services");

module.exports = {
  fields: {
    Marque: {
      type: Types.Text,
      isRequired: true
    }
  },
  labelField: 'Marque',
  //access.userIsAdminOrOwner,
  access: {
    read: true,
    update: access.userIsAdminOrOwner,
    create: access.userIsAdmin,
    delete: access.userIsAdmin,
    auth: true,
  },
};