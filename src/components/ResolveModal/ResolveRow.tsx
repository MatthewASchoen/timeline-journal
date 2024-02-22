import { Entry } from '../../types/entry';
import { whenString } from '../../types/when';
import { RadioLabel } from '../../ui/InputLabel';
import { capitalize } from '../../utility/string-stuff';
import * as S from './styled';

const getStringValue = (entry: Partial<Entry>, key: keyof Entry): string => {
  switch (key) {
    case 'name':
    case 'category':
    case 'location':
    case 'notes':
      return entry[key] || '';
    case 'start':
    case 'end':
      const when = entry[key];
      if (!when) return entry.ongoing ? 'None (Ongoing)' : '';
      return whenString(when);
    case 'anniversary':
    case 'ongoing':
      return entry[key] ? 'Yes' : 'No';
  }
};

type ResolveRowProps = {
  entryKey: keyof Entry;
  entry1: Entry;
  entry2: Entry;
  combo: Entry;
  setValue: (part: Partial<Entry>) => void;
};

const ResolveRow = ({
  entryKey,
  entry1,
  entry2,
  combo,
  setValue,
}: ResolveRowProps): JSX.Element => {
  const v1 = getStringValue(entry1, entryKey);
  const v2 = getStringValue(entry2, entryKey);
  const comboVal = getStringValue(combo, entryKey);

  const changeVal = (entry: Entry) =>
    setValue(
      entryKey === 'end'
        ? { end: entry.end, ongoing: entry.ongoing }
        : { [entryKey]: entry[entryKey] }
    );
  return (
    <>
      <S.GridCell>
        <span>{capitalize(entryKey)}</span>
      </S.GridCell>
      {v1 === v2 ? (
        <S.DoubleGridCell empty={!comboVal}>
          <span>{comboVal || 'None'}</span>
        </S.DoubleGridCell>
      ) : (
        <>
          <S.GridCell empty={!v1}>
            <RadioLabel
              id={`entry1-${entryKey}`}
              label={v1 || 'None'}
              onChange={() => changeVal(entry1)}
              checked={v1 === comboVal}
            />
          </S.GridCell>
          <S.GridCell empty={!v2}>
            <RadioLabel
              id={`entry2-${entryKey}`}
              label={v2 || 'None'}
              onChange={() => changeVal(entry2)}
              checked={v2 === comboVal}
            />
          </S.GridCell>
        </>
      )}
    </>
  );
};

export default ResolveRow;
