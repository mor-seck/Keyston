const Types = require('@keystonejs/fields');
const access = require("../services/services");
const { Select } = require('@keystonejs/fields');

module.exports = {
  
  fields: {
    Nom: {
      type: Types.Text
    },
    Puissance: {
      type: Types.Integer,
    },
    Arbre: {
      type: Select, options: 'S,L,X,U',
    },
    Marque: {
      type: Types.Relationship,
      ref: "MarqueMoteur",
      many: false
    },
    TypeDeRelevage: {
      type: Select, options: "Manuel, Assiste, Electrohydrolique",
    },
    EtatDuMoteur: {
      type: Types.Relationship,
      ref: "TypeDeBateau",
      many: false
    },
    TypeDeMoteur: {
      type: Select, options: "Thermique, Electrique, Electrique_de_Peche",
    },
    NombreHeureDeMarche: {
      type: Types.Integer,
    },
    AnneeMiseEnService: {
      type: Types.Relationship,
      ref: 'AnneeMiseEnService',
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
