import searchEngine from '../taxon_search_engine';

(process.env.SAUCE_LABS ? describe.skip : describe)(
  'Taxon Search Engine',
  () => {
    describe('search', () => {
      it('should return a Promise', () => {
        const promise = searchEngine.search('blackbird');
        expect(promise).to.be.a('Promise');
        return promise;
      });

      it('should resolve to an array', () =>
        searchEngine.search('blackbird').then(results => {
          expect(results).to.be.an('array');
          expect(results.length).to.equal(8);
        }));

      it('should include full species description', () =>
        searchEngine.search('blackbird').then(results => {
          const result = results[0];

          expect(result).to.be.an('object');
          expect(result).to.have.keys(
            'array_id',
            'species_id',
            'found_in_name',
            'warehouse_id',
            'group',
            'scientific_name',
            'common_names',
          );
        }));

      it('should accept both capitalized and lowercase strings', () =>
        searchEngine
          .search('blackbird')
          .then(results =>
            searchEngine
              .search('Blackbird')
              .then(results2 => expect(results).to.deep.equal(results2))
          ));

      it('should treat non alpha numeric characters as spaces', () => {
        // TODO: check "Wakely's Dowd"
        const searchNonAlpha1 = () =>
          searchEngine
            .search('Isle-of-Man Cabbage')
            .then(results =>
              searchEngine
                .search('Isle of Man Cabbage')
                .then(resultsDash => expect(results).to.deep.equal(resultsDash))
            );

        const searchNonAlpha2 = () =>
          searchEngine
            .search('Perfoliate (Cotswold) Pennycress')
            .then(results =>
              searchEngine
                .search('Perfoliate Cotswold Pennycress')
                .then(resultsBracket =>
                  expect(results).to.deep.equal(resultsBracket)
                )
            );

        return searchNonAlpha1().then(searchNonAlpha2);
      });

      it('should accept hybrids', () =>
        searchEngine
          .search('Caryopteris incana x mongholica =')
          .then(results => {
            expect(results).to.be.an('array');
            expect(results.length).to.equal(1);
          })
          .then(() =>
            searchEngine
              .search('X Cupressocyparis')
              .then(cupressocyparisResults => {
                expect(cupressocyparisResults).to.be.an('array');
                expect(cupressocyparisResults.length).to.equal(1);
              })
          ));

      it('should find genus common names', () =>
        searchEngine
          .search('Willow')
          .then(results => {
            expect(results).to.be.an('array');
            let found = false;
            results.forEach(result => {
              if (
                result.common_names[0] === 'Willow' ||
                result.common_names[1] === 'Willow'
              ) {
                found = true;
              }
            });
            expect(found).to.be.true;
          })
          .then(() =>
            searchEngine.search('Jumping spiders').then(spidersResults => {
              expect(spidersResults).to.be.an('array');
              expect(spidersResults.length).to.equal(1);
            })
          ));

      it('should work with selected taxa', () => {
        const searchLatin = () =>
          searchEngine.search('Phytomyza ilicis').then(results => {
            expect(results).to.not.be.empty;
            const result = results[0];

            expect(result.warehouse_id).to.be.equal(229548);
            expect(result.scientific_name).to.be.equal('Phytomyza ilicis');
          });

        const searchCommonName = () =>
          searchEngine.search('Giant Blackberry').then(results => {
            expect(results).to.not.be.empty;
            const result = results[0];

            expect(result.warehouse_id).to.be.equal(208098);
            expect(result.common_names[0]).to.be.equal('Giant Blackberry');
            expect(result.scientific_name).to.be.equal('Rubus armeniacus');
          });

        const searchGenus = () =>
          searchEngine.search('Rotaliella').then(results => {
            expect(results).to.not.be.empty;
            const result = results[0];

            expect(result.warehouse_id).to.be.equal(213771);
            expect(result.scientific_name).to.be.equal('Rotaliella');
          });

        const searchSpecCase1 = () =>
          searchEngine.search('cockle').then(results => {
            expect(results).to.not.be.empty;
            let found = false;
            results.forEach(species => {
              if (species.common_names[0] === 'Heart Cockle') {
                found = true;
              }
            });
            expect(found).to.be.true;
          });

        const searchSpecCase2 = () =>
          searchEngine.search('blackthorn').then(results => {
            expect(results).to.not.be.empty;
            // eslint-disable-next-line
            let found = false;
            results.forEach(species => {
              if (species.common_names[0] === 'Blackthorn') {
                found = true;
              }
            });
            expect(found).to.be.true;
          });

        return searchLatin()
          .then(searchCommonName)
          .then(searchGenus)
          .then(searchSpecCase1)
          .then(searchSpecCase2);
      });

      it('should allow searching only common names', () =>
        searchEngine
          .search('puffin', { namesFilter: 'common' })
          .then(results => {
            const containsPuffinus = results.find(
              res => res.scientific_name === 'Puffinus'
            );
            expect(containsPuffinus).to.be.an('undefined');
          }));

      it('should allow searching only scientific names', () =>
        searchEngine
          .search('puffin', { namesFilter: 'scientific' })
          .then(results => {
            const containsPuffinus = results.find(
              res => res.common_name === 'Tufted Puffin'
            );
            expect(containsPuffinus).to.be.an('undefined');
          }));

      it('should allow searching Recorder style (5 characters) ', () =>
        searchEngine.search('pufpu').then(results => {
          const containsPuffinus = results.find(
            res => res.scientific_name === 'Puffinus puffinus'
          );
          expect(containsPuffinus).to.be.an('object');
        }));

      describe('genus', () => {
        it('should add all species belonging to it', () =>
          searchEngine.search('Puffinus').then(results => {
            expect(results.length).to.be.equal(9);
            const genus = results[0];
            expect(genus.warehouse_id).to.be.equal(141974);
            expect(genus.scientific_name).to.be.equal('Puffinus');

            const puffinusAsimilis = results[1];
            expect(puffinusAsimilis.warehouse_id).to.be.equal(160697);
            expect(puffinusAsimilis.scientific_name).to.be.equal(
              'Puffinus assimilis'
            );
          }));
      });

      describe('common names', () => {
        it('should look into middle names', () =>
          searchEngine.search('woodpecker').then(results => {
            expect(results).to.be.an('array');
            expect(results.length > 0).to.be.true;
          }));
      });
    });
  }
);
