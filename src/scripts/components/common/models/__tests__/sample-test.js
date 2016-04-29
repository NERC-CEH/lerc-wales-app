import Sample from '../sample';
import Occurrence from '../occurrence';
import DateHelp from 'helpers/date';

describe('Sample', () => {
  it('should have current date by default', () => {
    const sample = new Sample();
    const date = sample.get('date');

    expect(DateHelp.print(date)).to.be.equal(DateHelp.print(new Date()));
  });

  describe('validation', () => {
    it('should return true if not saved', () => {
      const sample = new Sample();
      expect(sample.validate).to.be.a('function');
      sample.clear();

      const notSaved = sample.validate({});
      expect(notSaved).to.be.true;
    });

    it('should return sample and occurrence objects with invalids', () => {
      const sample = new Sample();
      expect(sample.validate).to.be.a('function');
      sample.metadata.saved = true;
      sample.clear();

      let invalids = sample.validate({});
      expect(invalids).to.be.an('object')
        .and.have.property('sample')
        .and.have.property('occurrences');

      // sample
      expect(invalids.sample).to.have.property('date');
      expect(invalids.sample).to.have.property('location');
      expect(invalids.sample).to.have.property('location name');
      expect(invalids.sample).to.have.property('location_type');
      expect(invalids.sample).to.have.property('occurrences');

      // occurrence
      expect(invalids.occurrences)
        .to.be.an('object')
        .and.to.be.empty;

      const occurrence = new Occurrence();
      sample.addOccurrence(occurrence);
      invalids = sample.validate();
      expect(invalids.occurrences).to.not.be.empty;
      expect(invalids.occurrences).to.have.property(occurrence.cid);
    });
  });

  describe('GPS extension', () => {
    it('has GPS functions', () => {
      const sample = new Sample();
      expect(sample.startGPS).to.be.a('function');
      expect(sample.stopGPS).to.be.a('function');
      expect(sample.isGPSRunning).to.be.a('function');
    });
  });
});
