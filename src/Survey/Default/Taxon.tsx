import { FC, useContext } from 'react';
import { observer } from 'mobx-react';
import { Page, Header, Main } from '@flumens';
import TaxonSearch, {
  TaxonSearchFilters,
} from 'Survey/common/Components/TaxonSearch';
import Sample from 'models/sample';
import appModel from 'models/app';
import savedSamples from 'models/savedSamples';
import Occurrence from 'models/occurrence';
import { useRouteMatch } from 'react-router';
import surveyConfig from 'Survey/Default/config';
import { NavContext } from '@ionic/react';

const getNewSample = async (taxon: any) => {
  const newSample = await surveyConfig.create(Sample, Occurrence, { taxon });
  newSample.save();
  savedSamples.push(newSample);
  return newSample;
};

const Taxon: FC = () => {
  const { navigate } = useContext(NavContext);
  const match = useRouteMatch();

  const onSpeciesSelected = async (taxon: any) => {
    const newSample = await getNewSample(taxon);
    const url = match.url.replace('/new', '');
    navigate(`${url}/${newSample.cid}`, undefined, 'replace');
  };

  const { searchNamesOnly, taxonGroupFilters: selectedFilters } =
    appModel.attrs;

  return (
    <Page id="taxon">
      <Header title="Species" rightSlot={<TaxonSearchFilters />} />
      <Main>
        <TaxonSearch
          onSpeciesSelected={onSpeciesSelected}
          namesFilter={searchNamesOnly}
          informalGroups={selectedFilters}
        />
      </Main>
    </Page>
  );
};

export default observer(Taxon);
