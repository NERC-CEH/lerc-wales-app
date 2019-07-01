/** ****************************************************************************
 * Generates species list suggestions.
 **************************************************************************** */
import Backbone from 'backbone';
import _ from 'lodash';
import Log from 'helpers/log';
import searchCommonNames from './commonNamesSearch';
import searchSciNames from './scientificNamesSearch';
import helpers from './searchHelpers';

let species;
let loading = false;
let commonNamePointers;

const MAX = 20;

const API = {
  init() {
    Log('Taxon search engine: initializing.');
    loading = true;
    return import(/* webpackChunkName: "data" */ 'common/data/species.data.json')
      .then(({ default: data }) => {
        species = data;
      })
      .then(() =>
        import(/* webpackChunkName: "data" */ 'common/data/species_names.data.json')
      )
      .then(({ default: data }) => {
        commonNamePointers = data;
      })
      .then(() => {
        loading = false;
        this.trigger('data:loaded');
      });
  },

  /**
   * Returns an array of species in format
  */
  search(searchPhrase, options = {}) {
    // todo Accent Folding: https://alistapart.com/article/accent-folding-for-auto-complete

    let results = [];

    if (!searchPhrase) {
      return Promise.resolve(results);
    }

    // check if data exists
    if (!species) {
      // initialise data load
      if (!loading) {
        return API.init().then(() => API.search(searchPhrase || '', options));
      }

      // wait until loaded
      return new Promise(resolve => {
        // the process has started, wait until done
        this.on('data:loaded', () => {
          API.search(searchPhrase || '', options).then(resolve);
        });
      });
    }

    const maxResults = options.maxResults || MAX;
    const scientificOnly = options.namesFilter === 'scientific';
    const commonNameOnly = options.namesFilter === 'common';
    const informalGroups = options.informalGroups || [];

    // normalize the search phrase
    const normSearchPhrase = searchPhrase.toLowerCase();

    // check if scientific search
    const isScientific = helpers.isPhraseScientific(normSearchPhrase);
    if (isScientific || scientificOnly) {
      // search sci names
      searchSciNames(
        species,
        normSearchPhrase,
        results,
        maxResults,
        null,
        informalGroups
      );
    } else {
      // search common names
      results = searchCommonNames(
        species,
        commonNamePointers,
        normSearchPhrase,
        MAX,
        informalGroups
      );

      // if not enough
      if (results.length <= MAX && !commonNameOnly) {
        // search sci names
        searchSciNames(
          species,
          normSearchPhrase,
          results,
          MAX,
          null,
          informalGroups
        );
      }
    }

    // return results in the order
    return Promise.resolve(results);
  },
};

_.extend(API, Backbone.Events);

export { API as default };
