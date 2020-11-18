const Types = require('@keystonejs/fields');
const access = require("../services/services");

module.exports = {
  fields: {
    NomMoteur: {
      type: Types.Text,
      isRequired: true
    }
  },
  labelField: 'NomMoteur',
  //access.userIsAdminOrOwner,
  access: {
    read: true,
    update: access.userIsAdminOrOwner,
    create: access.userIsAdmin,
    delete: access.userIsAdmin,
    auth: true,
  },
};