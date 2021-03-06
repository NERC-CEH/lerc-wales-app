const numRanges = {
  '1': 665,
  '2-5': 666,
  '6-20': 667,
  '21-100': 668,
  '101-500': 669,
  '500+': 670,
  Present: 671,
};

export default {
  name: 'dragonflies',
  taxonGroups: [107],

  render: [
    'smp:site',
    'occ:adCount',
    'occ:coCount',
    'occ:ovCount',
    'occ:scCount',
    'occ:laCount',
    'occ:exCount',
    'occ:emCount',
    // 'smp:siteOther',
  ],

  attrs: {
    site: {
      type: 'radio',
      id: 59,
      label: 'Site type',
      icon: 'land',
      default: 'Not selected',
      values: {
        Lake: 672,
        Reservoir: 673,
        'Mill lodge': 674,
        'Large pond': 675,
        'Small pond': 676,
        'Garden pond': 677,
        River: 678,
        Stream: 679,
        Ditch: 680,
        Canal: 681,
        'Other (please specify in comments)': 682,
      },
    },
    siteOther: {
      type: 'text',
      id: 60,
      label: 'Other Site Type',
    },
  },
  occ: {
    attrs: {
      number: null, // override incrementShortcut

      adCount: {
        type: 'radio',
        id: 34,
        label: 'Adults',
        icon: 'number',
        info: 'How many individuals of this type?',
        default: '',
        values: numRanges,
      },
      coCount: {
        type: 'radio',
        id: 35,
        label: 'Cop. pairs',
        icon: 'number',
        info: 'How many individuals of this type?',
        default: '',
        values: numRanges,
      },
      ovCount: {
        type: 'radio',
        id: 36,
        label: 'Ovip. females',
        icon: 'number',
        info: 'How many individuals of this type?',
        default: '',
        values: numRanges,
      },
      scCount: {
        type: 'radio',
        id: 842,
        label: 'Ovip. scars',
        icon: 'number',
        info: 'This attribute should be recorded for Willow Emerald only.',
        default: '',
        values: numRanges,
      },
      laCount: {
        type: 'radio',
        id: 37,
        label: 'Larvae',
        icon: 'number',
        info: 'How many individuals of this type?',
        default: '',
        values: numRanges,
      },
      exCount: {
        type: 'radio',
        id: 38,
        label: 'Exuviae',
        icon: 'number',
        info: 'How many individuals of this type?',
        default: '',
        values: numRanges,
      },
      emCount: {
        type: 'radio',
        id: 39,
        label: 'Emergents',
        icon: 'number',
        info: 'How many individuals of this type?',
        default: '',
        values: numRanges,
      },
    },
    verify(attrs) {
      if (!attrs.taxon) {
        return { taxon: "can't be blank" };
      }
      return null;
    },
  },
};
