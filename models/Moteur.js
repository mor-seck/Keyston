const Types = require('@keystonejs/fields');
const access = require("../services/services");
const { Select } = require('@keystonejs/fields');

module.exports = {
  fields: {
    Nom: {
      type: Types.Text,
    },
    puissance: {
      type: Types.Integer,
      isRequired: true
    },
    Arbre: {
      type: Select, options: 'S,L,X,U',
    },
    Marque: {
      type: Types.Relationship,
      ref: 'MarqueMoteur',
      many: false
    },
    typeDeRelevage: {
      type: Select, options: 'Manuel,Assiste,Electrohydrolique'
    },
    type: {
      type: Select, options: 'NEUF, OCCASION'
    },

    typeDeMoteur: {
      type: Select, options: 'Thermique,Electrique,Electrique_de_Peche'
    },
    nombreHeureDeMarche: {
      type: Types.Integer,
      isRequired: true
    },
    AnneeMiseEnService: {
      type: Types.Relationship,
      ref: 'AnneeMiseEnService',
      many: false
    },
  },
  labelField: 'Nom',
  //access.userIsAdminOrOwner,
  access: {
    read: true,
    update: access.userIsAdminOrOwner,
    create: access.userIsAdmin,
    delete: access.userIsAdmin,
    auth: true,
  },
};
