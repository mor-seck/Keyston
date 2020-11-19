const Types = require('@keystonejs/fields');
const access = require("../services/services");

module.exports = {
  fields: {
    MarqueElectronique: {
      type: Types.Text,
      isRequired: true
    }
  },
  labelField: 'MarqueElectronique',
  //access.userIsAdminOrOwner,
  access: {
    read: true,
    update: access.userIsAdminOrOwner,
    create: access.userIsAdmin,
    delete: access.userIsAdmin,
    auth: true,
  },
};