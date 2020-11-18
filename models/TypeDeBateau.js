const Types = require('@keystonejs/fields');
const access = require("../services/services");

module.exports = {
  fields: {
    TypeDeBateau: {
      type: Types.Text,
      isRequired: true
    }
  },
  labelField: 'TypeDeBateau',
  //access.userIsAdminOrOwner,
  access: {
    read: true,
    update: access.userIsAdminOrOwner,
    create: access.userIsAdmin,
    delete: access.userIsAdmin,
    auth: true,
  },
};