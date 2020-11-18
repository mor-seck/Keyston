const Types = require('@keystonejs/fields');
const access = require("../services/services");

module.exports = {
  fields: {
    Nom: {
      type: Types.Text
    },
    Type: {
      type: Types.Relationship,
      ref: 'Type',
      many: false
    },
    chargeUtile: {
      type: Types.Text
    },
    poidsEnCharge: {
      type: Types.Integer
    },
    Taille: {
      type: Types.Integer
    },
    AnneeMiseEnServiceBateau: {
      type: Types.Relationship,
      ref: 'AnneeMiseEnServiceBateau',
      many: false
    },

  },
  labelField: 'Nom',
  access: {
    read: true, //access.userIsAdminOrOwner,
    update: access.userIsAdminOrOwner,
    create: access.userIsAdmin,
    delete: access.userIsAdmin,
    auth: true,
  },
};