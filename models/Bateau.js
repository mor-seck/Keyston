const Types             = require('@keystonejs/fields');
const access            = require("../services/services");
const ServiceFileUpload = require("../services/ServiceFileUpload");

module.exports = {
  fields: {
    NomDuBateau: {
        type: Types.Text
    },
    Prix: {
      type: Types.Relationship,
      ref : "Prix",
      many: false
    },
    Type: {
      type: Types.Relationship,
      ref : "Type",
      many: false
    },
    TypeDeBateau: {
      type: Types.Relationship,
      ref : "TypeDeBateau",
      many: false
    },
    MarqueBateau: {
      type: Types.Relationship,
      ref : 'MarqueBateau',
      many: false
    },
    TailleBateau: {
      type: Types.Relationship,
      ref : 'TailleBateau',
      many: false
    },
    MoteurBateau: {
      type: Types.Relationship,
      ref : 'MoteurBateau',
      many: false
    },
    AnneeMiseEnService: {
      type: Types.Relationship,
      ref : 'AnneeMiseEnService',
      many: false
    },
    Remarque: {
      type       : Types.Text,
      isMultiline: true
    },
    ImagesBateau: {
      type: Types.Relationship,
      ref : 'ImagesBateau',
      many: true
    },
    Fichier: {
      type      : Types.File,
      adapter   : ServiceFileUpload,
      isRequired: true,
      hooks: {
        beforeChange: async ({ existingItem }) => {
          if (existingItem && existingItem.file) {
            await ServiceFileUpload.delete(existingItem.file);
          }
        },
      }
    }
   
  },
  labelField: 'NomDuBateau',
  access: {
    read  : true, //access.userIsAdminOrOwner,
    update: access.userIsAdminOrOwner,
    create: access.userIsAdmin,
    delete: access.userIsAdmin,
    auth  : true,
  },
  hooks: {
    afterDelete: async ({ existingItem }) => {
      if (existingItem.file) {
        await ServiceFileUpload.delete(existingItem.file);
      }
    },
  },
};