const Types = require('@keystonejs/fields');
const access = require("../services/services");

module.exports = {
  fields: {
    PrixBateau: {
      type: Types.Integer,
      isRequired: true
    }
  },
  labelField: 'PrixBateau',
  //access.userIsAdminOrOwner,
  access: {
    read: true,
    update: access.userIsAdminOrOwner,
    create: access.userIsAdmin,
    delete: access.userIsAdmin,
    auth: true,
  },
};