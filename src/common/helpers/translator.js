/* eslint-disable camelcase */
import appModel from 'app_model';
import en from '../translations/en.pot';
import cy from '../translations/cy.po';

const dictionary = {
  en,
  cy,
};

function translate(key) {
  const language = appModel.get('language').toLowerCase();

  const translation = dictionary[language][key];
  if (!translation) {
    window.dic = window.dic || [];
    if (!window.dic.includes(key)) {
      window.dic.push(key);
      console.log(`!new: ${key}`); // todo: remove
      // all='';dic.forEach(word => {all+=`\nmsgid "${word}"\nmsgstr "${word}"\n`})
    }
    return key;
  }

  if (!translation) {
    return key;
  }

  return translation;
}

window.t = translate;

export default translate;
