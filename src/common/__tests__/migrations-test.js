import { SampleCollection } from '@flumens';
import config from 'common/config';
import migrationManager, {
  getSampleTaxa,
  migrateSampleTree,
  migratePlantGridRefSystems,
  migrateOldPlantFungiAbundanceAttrs,
} from 'common/migrations';
import Sample from 'models/sample';
import { samplesStore } from 'models/store';

it('migrates legacy LERC records using survey 511', async () => {
  const sample = new Sample({
    data: { surveyId: 511, recorder: 'Test Recorder' },
    occurrences: [{ data: { number: 3, stage: 'Adult' } }],
  });
  const originalVersion = config.version;
  const originalMigrationVersion = localStorage.getItem(
    '_lastAppMigratedVersion'
  );
  config.version = '6.5.4';
  localStorage.setItem('_lastAppMigratedVersion', '6.3.0');

  jest
    .spyOn(SampleCollection.prototype, 'fetch')
    .mockImplementation(async function () {
      this.data.push(sample);
    });
  const save = jest.spyOn(sample, 'save').mockResolvedValue();
  jest.spyOn(samplesStore, 'findAll').mockResolvedValue([]);

  await migrationManager.run();

  const [occurrence] = sample.occurrences;
  const migratedData = {
    recorder: sample.data['smpAttr:127'],
    number: occurrence.data['occAttr:16'],
    stage: occurrence.data['occAttr:106'],
  };
  const wasSaved = save.mock.calls.length;

  jest.restoreAllMocks();
  config.version = originalVersion;
  localStorage.setItem('_lastAppMigratedVersion', originalMigrationVersion);

  expect(sample.getSurvey().id).toBe(511);
  expect(migratedData).toEqual({
    recorder: 'Test Recorder',
    number: 3,
    stage: '1950',
  });
  expect(wasSaved).toBe(1);
});

it('resolves legacy LERC survey metadata', () => {
  const sample = new Sample({ metadata: { survey: 'default' } });

  expect(sample.getSurvey().id).toBe(511);
  expect(sample.data.surveyId).toBe(511);
});

it('gets taxa from the taxon group with a legacy metadata fallback', () => {
  const sample = {
    occurrences: [{ data: { taxon: { group: 1 } } }],
    metadata: { taxa: 'legacy' },
    getSurvey: () => ({ taxa: 'birds' }),
  };

  expect(getSampleTaxa(sample)).toBe('birds');

  sample.occurrences = [];
  expect(getSampleTaxa(sample)).toBe('legacy');
});

it('preserves legacy plant abundance attributes separately', () => {
  [
    ['number', 12, 'occAttr:16', 12],
    ['numberDAFOR', 'Frequent', 'occAttr:2', '3'],
    ['number-ranges', '6-20', 'occAttr:523', '667'],
  ].forEach(([oldKey, oldValue, newKey, newValue]) => {
    const occurrence = { data: { [oldKey]: oldValue }, metadata: {} };

    migrateOldPlantFungiAbundanceAttrs(occurrence);

    expect(occurrence.data).toEqual({ [newKey]: newValue });
    expect(occurrence.metadata._migrated).toEqual({ [oldKey]: oldValue });
  });
});

it('sets Plant grid reference systems across the sample tree', () => {
  const child = {
    data: {
      enteredSrefSystem: 'OSIE',
      location: { gridref: 'SU1234' },
    },
    samples: [],
  };
  const sample = {
    data: {
      enteredSrefSystem: 'OSGB',
      location: { gridref: 'H3382' },
    },
    samples: [child],
  };

  migratePlantGridRefSystems(sample);

  expect(sample.data.enteredSrefSystem).toBe('OSIE');
  expect(child.data.enteredSrefSystem).toBe('OSGB');
});

it('moves legacy sample fields across the sample tree', () => {
  const child = {
    data: {
      date: '2026-08-29T08:23:59.139Z',
      location: { name: 'Child', geocoded: { center: [1, 2] } },
    },
    metadata: {},
    samples: [],
  };
  const sample = {
    data: {
      date: '2026-08-30T08:23:59.139Z',
      location: { name: 'Parent', geocoded: { center: [3, 4] } },
    },
    metadata: {},
    samples: [child],
  };

  migrateSampleTree(sample);

  expect(sample.data).toEqual({
    date: '2026-08-30',
    location: {},
    locationName: 'Parent',
  });
  expect(sample.metadata.geocoded).toEqual({ center: [3, 4] });
  expect(sample.metadata._migrated).toEqual({
    date: '2026-08-30T08:23:59.139Z',
    'location.name': 'Parent',
    'location.geocoded': { center: [3, 4] },
  });
  expect(child.data).toEqual({
    date: '2026-08-29',
    location: {},
    locationName: 'Child',
  });
  expect(child.metadata.geocoded).toEqual({ center: [1, 2] });
  expect(child.metadata._migrated).toEqual({
    date: '2026-08-29T08:23:59.139Z',
    'location.name': 'Child',
    'location.geocoded': { center: [1, 2] },
  });
});
