const sex = {
  Male: 1947,
  Female: 1948,
  Mixed: 3482,
};

const stage = {
  Adults: 3929,
  Larvae: 3931,
  Eggs: 3932,
  Pupae: 3930,
  'Larval webs': 14079,
};

const count = {
  '1': 2402,
  '2-9': 2404,
  '10-29': 2406,
  '30-99': 2408,
  '100+': 2410,
};

export default {
  name: 'butterflies',
  taxonGroups: [104],
  editForm: ['occ:number', 'occ:stage', 'occ:sex'],

  attrs: {
    smp: {},
    occ: {
      sex: {
        type: 'radio',
        id: 105,
        label: 'Sex',
        icon: 'gender',
        info: 'Please indicate the sex of the organism.',
        default: 'Not Recorded',
        values: sex,
      },
      stage: {
        type: 'radio',
        id: 293,
        label: 'Stage',
        icon: 'stage',
        info: 'Please pick the life stage.',
        default: 'Not Recorded',
        values: stage,
      },
      number: {
        id: 16,
        info: 'How many individuals of this type?',
        label: 'Abundance',
        icon: 'number',
      },
      'number-ranges': {
        type: 'radio',
        id: 203,
        label: 'Abundance',
        icon: 'number',
        default: 'Not Recorded',
        values: count,
      },
    },
  },
};
