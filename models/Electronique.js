const Types  = require('@keystonejs/fields');
const access = require("../services/services");

module.exports = {
  fields: {
    Nom: {
      type: Types.Text
    },
    MarqueElectronique: {
      type: Types.Relationship,
      ref : "MarqueElectronique",
      many: false
    },

    Type: {
      type: Types.Relationship,
      ref : "TypeDeBateau",
      many: false
    },
    Taille: {
      type: Types.Integer,
    },

    AnneeMiseEnService: {
      type: Types.Relationship,
      ref : 'AnneeMiseEnService',
      many: false
    },

  },

  labelField: 'Nom',
  access: {
    read  : true, //access.userIsAdminOrOwner,
    update: access.userIsAdminOrOwner,
    create: access.userIsAdmin,
    delete: access.userIsAdmin,
    auth  : true,
  },
};