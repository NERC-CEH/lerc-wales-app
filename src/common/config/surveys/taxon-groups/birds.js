/** ****************************************************************************
 * General survey configuration file.
 **************************************************************************** */
const survey = {
  name: 'birds',
  taxonGroups: [73],

  render: [
    {
      id: 'occ:number',
      label: 'Abundance',
      icon: 'number',
      group: ['occ:number', 'occ:number-ranges'],
    },

    'occ:stage',
    'occ:breeding',
    'occ:sex',
    'occ:identifiers',
  ],

  occ: {
    attrs: {
      breeding: {
        id: 823,
        type: 'radio',
        label: 'Breeding',
        info: 'Please pick the breeding details for this record.',
        values: [
          { value: null, isDefault: true, label: 'Not recorded' },

          { isPlaceholder: true, label: 'Non-breeding' },
          { value: '00: Migration, Flying or Summering (M/F/U)', id: 17588 },

          { isPlaceholder: true, label: 'Possible breeding' },
          { value: '01: Nesting habitat (H)', id: 17589 },
          { value: '02: Singing male (S)', id: 17590 },

          { isPlaceholder: true, label: 'Probable breeding' },
          { value: '03: Pair in suitable habitat (P)', id: 17591 },
          { value: '04: Permanent territory (T)', id: 17592 },
          { value: '05: Courtship and display (D)', id: 17593 },
          { value: '06: Visiting probable nest site (N)', id: 17594 },
          { value: '07: Agitated behaviour (A)', id: 17595 },
          { value: '08: Brood patch on incubating adult (I)', id: 17596 },
          { value: '09: Nest building (B)', id: 17597 },

          { isPlaceholder: true, label: 'Confirmed breeding' },
          { value: '10: Distraction display (DD)', id: 17598 },
          { value: '11: Used nest or eggshells (UN)', id: 17599 },
          { value: '12: Recently fledged (FL)', id: 17600 },
          { value: '13: Occupied nest (ON)', id: 17601 },
          { value: '14: Faecal sac or food (FF)', id: 17602 },
          { value: '15: Nest with eggs (NE)', id: 17603 },
          { value: '16: Nest with young (NY)', id: 17604 },
        ],
      },
    },
  },
};

export default survey;
