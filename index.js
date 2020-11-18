const { Keystone }                 = require('@keystonejs/keystone');
const { PasswordAuthStrategy }     = require('@keystonejs/auth-password');
const { Text, Checkbox, Password } = require('@keystonejs/fields');
const { GraphQLApp }               = require('@keystonejs/app-graphql');
const { AdminUIApp }               = require('@keystonejs/app-admin-ui');
const initialiseData               = require('./initial-data');
const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');
const PROJECT_NAME                 = 'LeporiMarine';
const adapterConfig                = { mongoUri: 'mongodb://localhost/lepori-marine' };

//models require
const MarqueBateau             = require('./models/MarqueBateau');
const TypeDeBateau             = require('./models/TypeDeBateau');
const Type                     = require('./models/Type');
const PrixBateau               = require('./models/PrixBateau');
const TailleBateau             = require('./models/TailleBateau');
const ImagesBateau             = require('./models/ImagesBateau');
const AnneeMiseEnServiceBateau = require('./models/AnneeMiseEnServiceBateau');
const Bateau                   = require('./models/Bateau');
const MoteurBateau             = require('./models/MoteurBateau');
const Moteur                   = require('./models/Moteur');
const Remorque                 = require('./models/Remorque');
const MarqueMoteur             = require('./models/MarqueMoteur');


const keystone = new Keystone({
  adapter: new Adapter(adapterConfig),
  onConnect: process.env.CREATE_TABLES !== 'true' && initialiseData,
});

// Access control functions
const userIsAdmin = ({ authentication: { item: user } }) => Boolean(user && user.isAdmin);
const userOwnsItem = ({ authentication: { item: user } }) => {
  if (!user) {
    return false;
  }

  // Instead of a boolean, you can return a GraphQL query:
  // https://www.keystonejs.com/api/access-control#graphqlwhere
  return { id: user.id };
};

const userIsAdminOrOwner = auth => {
  const isAdmin = access.userIsAdmin(auth);
  const isOwner = access.userOwnsItem(auth);
  return isAdmin ? isAdmin : isOwner;
};

const access = { userIsAdmin, userOwnsItem, userIsAdminOrOwner };

keystone.createList('User', {
  fields: {
    name: { type: Text },
    email: {
      type: Text,
      isUnique: true,
    },
    isAdmin: {
      type: Checkbox,
      // Field-level access controls
      // Here, we set more restrictive field access so a non-admin cannot make themselves admin.
      access: {
        update: access.userIsAdmin,
      },
    },
    password: {
      type: Password,
    },
  },
  // List-level access controls
  access: {
    read: access.userIsAdminOrOwner,
    update: access.userIsAdminOrOwner,
    create: access.userIsAdmin,
    delete: access.userIsAdmin,
    auth: true,
  },
});

keystone.createList('MarqueBateau', MarqueBateau);
keystone.createList('TypeDeBateau', TypeDeBateau);
keystone.createList('Type', Type);
keystone.createList('PrixBateau', PrixBateau);
keystone.createList('TailleBateau', TailleBateau);
keystone.createList('ImagesBateau', ImagesBateau);
keystone.createList('AnneeMiseEnServiceBateau', AnneeMiseEnServiceBateau);
keystone.createList('Bateau', Bateau);
keystone.createList('MoteurBateau', MoteurBateau);
keystone.createList('Moteur', Moteur);
keystone.createList('Remorque', Remorque);
keystone.createList('MarqueMoteur', MarqueMoteur);




const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({
      name: PROJECT_NAME,
      enableDefaultRoute: true,
      authStrategy,
    }),
  ],
};
