/* eslint-disable camelcase */
import en from './interface/en.pot';
import cy from './interface/cy.po';

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
console.log(rawToKeyVal(en));

export default {
  en: {
    interface: rawToKeyVal(en),
  },
  cy: {
    interface: rawToKeyVal(cy),
  },
};
