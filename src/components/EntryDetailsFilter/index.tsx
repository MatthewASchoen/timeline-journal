import { EntryFilter } from '../../types/entry';
import ClearableInput from '../../ui/ClearableInput';
import * as S from './styled';

export type EntryDetailsFilterProps = {
  filter: EntryFilter;
  setFilter: (filter: EntryFilter) => void;
  categories: string[];
  locations: string[];
  highlightColor: string;
  vertical?: boolean;
};

export const EntryDetailsFilter = ({
  filter,
  setFilter,
  categories,
  locations,
  highlightColor,
  vertical,
}: EntryDetailsFilterProps): JSX.Element => (
  <>
    <S.TextFilter
      id="text-filter"
      label="Text includes:"
      value={filter.text}
      setValue={text => setFilter({ ...filter, text })}
      active={!!filter.text}
      highlight={highlightColor}
      inputProps={{
        autoComplete: 'off',
        placeholder: 'Search names and notes',
      }}
      newline={vertical}
    />
    <S.CategoryAndLocation vertical={vertical}>
      <ClearableInput onClear={() => setFilter({ ...filter, category: '' })}>
        <S.SelectFilter
          value={filter.category}
          onChange={e => setFilter({ ...filter, category: e.target.value })}
          active={!!filter.category}
          highlight={highlightColor}
        >
          <option value="">Any Category</option>
          {categories.map(category => (
            <option key={`category-filter-${category}`} value={category}>
              {category}
            </option>
          ))}
        </S.SelectFilter>
      </ClearableInput>
      <ClearableInput onClear={() => setFilter({ ...filter, location: '' })}>
        <S.SelectFilter
          value={filter.location}
          onChange={e => setFilter({ ...filter, location: e.target.value })}
          active={!!filter.location}
          highlight={highlightColor}
        >
          <option value="">Any Location</option>
          {locations.map(location => (
            <option key={`location-filter-${location}`} value={location}>
              {location}
            </option>
          ))}
        </S.SelectFilter>
      </ClearableInput>
    </S.CategoryAndLocation>
  </>
);

export default EntryDetailsFilter;
