import {
  addNamespace as ionic,
  en as ionicEnglish,
  namespace as ionicNamespace,
} from '@flumens/ionic/locales';
import {
  addNamespace as tailwind,
  en as tailwindEnglish,
  namespace as tailwindNamespace,
} from '@flumens/tailwind/locales';
import cy from './interface/cy.po';
import en from './interface/en.pot';

// Adding some context, reference and other in po files:

// #: Some reference!!
// msgctxt "this is my context!!!!"
// msgid "Select your country"
// msgid_plural "plural!!!"
// msgstr[0] "Selecciona tu pais"
// msgstr[1] ""

const rawToKeyVal = lang =>
  Object.entries(lang).reduce((agg, pair) => {
    const [key, translation] = pair;
    if (!key) {
      return agg;
    }

    const [, val, ...pluralVals] = translation;
    if (!val) {
      return agg;
    }

    if (pluralVals.length) {
      pluralVals.forEach((plural, index) => {
        agg[`${key}_${index + 1}`] = plural; // eslint-disable-line no-param-reassign
      });
    }

    agg[key] = val; // eslint-disable-line no-param-reassign
    return agg;
  }, {});

const welsh = rawToKeyVal(cy);

// Reuse existing Welsh translations for the packages' new namespaced keys.
const translateNamespace = dictionary =>
  Object.fromEntries(
    Object.entries(dictionary).map(([section, terms]) => [
      section,
      Object.fromEntries(
        Object.entries(terms).map(([key, english]) => [
          key,
          welsh[english] || english,
        ])
      ),
    ])
  );

const resources = ionic(
  tailwind({
    en: {
      interface: rawToKeyVal(en),
    },
    cy: {
      interface: welsh,
    },
  })
);

resources.cy[ionicNamespace] = translateNamespace(ionicEnglish);
resources.cy[tailwindNamespace] = translateNamespace(tailwindEnglish);

export default resources;
