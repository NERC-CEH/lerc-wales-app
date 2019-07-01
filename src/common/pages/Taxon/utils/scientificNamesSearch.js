/** ****************************************************************************
 * Scientific name search.
 **************************************************************************** */
import {
  GENUS_ID_INDEX,
  GENUS_GROUP_INDEX,
  GENUS_TAXON_INDEX,
  GENUS_SPECIES_INDEX,
  GENUS_NAMES_INDEX,
  SPECIES_ID_INDEX,
  SPECIES_TAXON_INDEX,
  SPECIES_NAMES_INDEX,
} from 'common/data/constants.json';
import helpers from './searchHelpers';

function addGenusToResults(results, genus, generaIndex) {
  if (genus[GENUS_ID_INDEX]) {
    // why genus[GENUS_ID_INDEX] see 'sandDustHack' in generator
    results.push({
      array_id: generaIndex,
      warehouse_id: genus[GENUS_ID_INDEX],
      group: genus[GENUS_GROUP_INDEX],
      scientific_name: genus[GENUS_TAXON_INDEX],
      common_names: genus[GENUS_NAMES_INDEX] || [],
    });
  }

  const speciesArray = genus[GENUS_SPECIES_INDEX] || [];

  // eslint-disable-next-line
  speciesArray.forEach((species, speciesIndex) => {
    results.push({
      array_id: generaIndex,
      species_id: speciesIndex,
      warehouse_id: species[SPECIES_ID_INDEX],
      group: genus[GENUS_GROUP_INDEX],
      scientific_name: `${genus[GENUS_TAXON_INDEX]} ${
        species[SPECIES_TAXON_INDEX]
      }`,
      common_names: species[SPECIES_NAMES_INDEX] || [],
    });
  });
}

function addSpeciesToResults(results, genus, generaIndex, otherWordsRegex) {
  const speciesArray = genus[GENUS_SPECIES_INDEX] || [];

  // eslint-disable-next-line
  speciesArray.forEach((species, speciesIndex) => {
    if (otherWordsRegex.test(species[SPECIES_TAXON_INDEX])) {
      results.push({
        array_id: generaIndex,
        species_id: speciesIndex,
        warehouse_id: species[SPECIES_ID_INDEX],
        group: genus[GENUS_GROUP_INDEX],
        scientific_name: `${genus[GENUS_TAXON_INDEX]} ${
          species[SPECIES_TAXON_INDEX]
        }`,
        common_names: species[SPECIES_NAMES_INDEX] || [],
      });
    }
  });
}

function seatchGeneraDictionary(
  results,
  genera,
  maxResults,
  informalGroupsMatch,
  firstWord,
  firstWordRegex,
  otherWordsRegex
) {
  let generaIndex = helpers.findFirstMatching(genera, genera, firstWord);
  if (!generaIndex || generaIndex < 0) {
    return;
  }

  while (generaIndex < genera.length) {
    if (results.length >= maxResults) {
      return;
    }

    const genus = genera[generaIndex];
    const endOfMatchingGenus = !firstWordRegex.test(genus[GENUS_TAXON_INDEX]);
    if (endOfMatchingGenus) {
      return;
    }

    if (informalGroupsMatch(genus)) {
      if (!otherWordsRegex) {
        addGenusToResults(results, genus, generaIndex);
      } else {
        addSpeciesToResults(results, genus, generaIndex, otherWordsRegex);
      }
    }

    generaIndex += 1;
  }
}

/**
 * Search Scientific names
 * @param species
 * @param searchPhrase
 * @returns {Array}
 */
function search(
  genera,
  searchPhrase,
  results = [],
  maxResults,
  hybridRun,
  informalGroups = []
) {
  let {
    firstWord,
    firstWordRegexStr,
    firstWordRegex,
  } = helpers.getFirstWordRegex(searchPhrase);

  let otherWordsRegex = helpers.getOtherWordsRegex(searchPhrase);

  // check if hybrid eg. X Cupressocyparis
  if (!hybridRun && searchPhrase.match(/X\s.*/i)) {
    search(genera, searchPhrase, results, maxResults, true, informalGroups);
  } else if (hybridRun) {
    // run with different first word
    firstWord = helpers.normalizeFirstWord(searchPhrase);
    firstWordRegexStr = helpers.getFirstWordRegexString(firstWord);
    firstWordRegex = new RegExp(firstWordRegexStr, 'i');
    otherWordsRegex = null;
  }

  const informalGroupsMatch = genus =>
    !informalGroups.length ||
    informalGroups.indexOf(genus[GENUS_GROUP_INDEX]) >= 0;

  seatchGeneraDictionary(
    results,
    genera,
    maxResults,
    informalGroupsMatch,
    firstWord,
    firstWordRegex,
    otherWordsRegex
  );

  return results;
}

function searchMulti(
  genera,
  searchPhrase,
  results = [],
  maxResults,
  hybridRun,
  informalGroups = []
) {
  search(genera, searchPhrase, results, maxResults, hybridRun, informalGroups);

  const is5CharacterShortcut = searchPhrase.length === 5;
  if (is5CharacterShortcut && results.length < maxResults) {
    const searchPhraseShortcut = `${searchPhrase.substr(
      0,
      3
    )} ${searchPhrase.substr(3, 4)}`;
    search(
      genera,
      searchPhraseShortcut,
      results,
      maxResults,
      hybridRun,
      informalGroups
    );
  }
}

export { searchMulti as default };
