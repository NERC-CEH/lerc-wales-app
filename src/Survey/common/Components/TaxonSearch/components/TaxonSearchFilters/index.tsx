import { useState } from 'react';
import { Trans as T } from 'react-i18next';
import appModel from 'models/app';
import HeaderButton from 'Survey/common/Components/HeaderButton';
import FiltersModal from './FiltersModal';
import './styles.scss';

const Header = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  const onSearchNamesFilterSelect = (filter: '' | 'scientific' | 'common') => {
    if (filter === appModel.attrs.searchNamesOnly) {
      return;
    }
    appModel.attrs.searchNamesOnly = filter;
    appModel.save();
  };

  const isFiltering =
    appModel.attrs.searchNamesOnly || appModel.attrs.taxonGroupFilters.length;

  const filtersCount =
    (appModel.attrs.searchNamesOnly ? 1 : 0) +
    appModel.attrs.taxonGroupFilters.length;

  const onSearchTaxaFilterSelect = (filters: string[]) => {
    appModel.attrs.taxonGroupFilters = filters.map((s: string) =>
      parseInt(s, 10)
    );
    appModel.save();
  };

  return (
    <>
      <FiltersModal
        onSearchTaxaFilterSelect={onSearchTaxaFilterSelect}
        onSearchNamesFilterSelect={onSearchNamesFilterSelect}
        toggleModal={toggleModal}
        showModal={showModal}
      />
      <HeaderButton
        onClick={toggleModal}
        className="filter-button"
        color={isFiltering ? 'warning' : undefined}
        fill="outline"
        skipTranslation
      >
        <T>Filters</T> {!!isFiltering && <b>({filtersCount})</b>}
      </HeaderButton>
    </>
  );
};

export default Header;
