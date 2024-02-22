import { useMemo, useState } from 'react';
import * as S from './styled';
import { ClickySpan } from '../../ui/ClickySpan';
import { Text } from '../../ui/Info';
import { PulseyText } from '../../ui/Info/PulseyText';
import { CalendarPicker } from '../../components/Calendar';
import { newWhen, whenString } from '../../types/when';
import { colorSamples } from '../../ui/colors';
import { Button, ButtonTray } from '../../ui/Button';
import LabelTextbox from '../../ui/LabelTextbox';
import { CheckboxLabel, RadioLabel } from '../../ui/InputLabel';

type ColorSwatchProps = {
  title: string;
  colors: [string, string][];
  onClick: (name: string, color: string) => void;
  selected: string;
};

const ColorSwatch = ({
  title,
  colors,
  onClick,
  selected,
}: ColorSwatchProps): JSX.Element => (
  <S.SwatchContainer>
    <Text b>{title}</Text>
    <S.FlexBox>
      {colors.map(([name, color]) => (
        <S.SwatchBox
          color={color}
          key={`${title}-${name}-swatch`}
          onClick={() => onClick(`${title} - ${name}`, color)}
          title={name}
          selected={color === selected}
        />
      ))}
    </S.FlexBox>
  </S.SwatchContainer>
);

export const ColorSampler = ({
  goBack,
}: {
  goBack: () => void;
}): JSX.Element => {
  const [selected, setSelected] = useState({ name: '', color: '' });
  const copyColor = () => navigator.clipboard.writeText(selected.color);
  const [customColors, setCustomColors] = useState<string[]>([]);

  const [year, setYear] = useState(() => newWhen().year);
  const [when, setWhen] = useState(() => newWhen());

  const [customColor, setCustomColor] = useState(selected.color);

  const [checkChecked, setCheckChecked] = useState(true);
  const [radioChecked, setRadioChecked] = useState(true);

  // Debounce this shit
  const setCustomDebounced = useMemo(() => {
    let timer: number | undefined;
    return (color: string): void => {
      clearTimeout(timer);
      setCustomColor(color);
      timer = window.setTimeout(
        () => setSelected({ name: color && 'Custom', color }),
        500
      );
    };
  }, []);

  const onClickSwatch = (name: string, color: string) =>
    setSelected({ name, color });

  return (
    <S.PageContainer>
      <S.SwatchGroup label="Colors">
        <div>
          {colorSamples.map(([title, colors]) => (
            <ColorSwatch
              key={`swatch-${title}`}
              title={title}
              colors={Object.entries(colors)}
              onClick={onClickSwatch}
              selected={selected.color}
            />
          ))}
          <LabelTextbox
            id="custom-color"
            label="Custom:"
            value={customColor}
            setValue={setCustomDebounced}
            newline
          />
          <div>
            <Button
              onClick={() => {
                if (customColors.includes(customColor)) return;
                const newColors = [...customColors, customColor];
                if (newColors.length > 6) newColors.shift();
                setCustomColors(newColors);
              }}
              disabled={!customColor}
            >
              Save Custom Color
            </Button>
          </div>

          {customColors.length > 0 && (
            <ColorSwatch
              title="Custom"
              colors={customColors.map(color => [color, color])}
              onClick={onClickSwatch}
              selected={selected.color}
            />
          )}
          <ButtonTray>
            <Button onClick={goBack}>Go back</Button>
          </ButtonTray>
        </div>
      </S.SwatchGroup>
      <S.ExampleGroup label="Examples">
        <div>
          <S.FlexBox>
            <h1>Selected Color: {selected.name || 'None'}</h1>
          </S.FlexBox>
          {selected.color && (
            <S.FlexBox>
              <S.SwatchBox
                color={selected.color}
                onClick={copyColor}
                title="Click to copy"
              />
              <ClickySpan onClick={copyColor} title="Click to copy" linkLike>
                {selected.color}
              </ClickySpan>
              <Text>- Click to Copy</Text>
            </S.FlexBox>
          )}
          <S.FlexBox>
            <Text color={selected.color}>Plain</Text>
            <Text color={selected.color} b>
              Bold
            </Text>
            <Text color={selected.color} i>
              Italic
            </Text>
            <Text color={selected.color} u>
              Underlined
            </Text>
            <PulseyText color={selected.color}>Pulsing</PulseyText>
          </S.FlexBox>
          <S.FlexBox>
            <Text back={selected.color}>Plain</Text>
            <Text back={selected.color} b>
              Bold
            </Text>
            <Text back={selected.color} i>
              Italic
            </Text>
            <Text back={selected.color} u>
              Underlined
            </Text>
            <PulseyText back={selected.color}>Pulsing</PulseyText>
          </S.FlexBox>
          <S.FlexBox>
            <Text color={selected.color} b>
              Start:
            </Text>
            <Text>The best event</Text>
          </S.FlexBox>
          <S.FlexBox>
            <Text color={selected.color} b>
              End:
            </Text>
            <Text>The worst event</Text>
          </S.FlexBox>
          <S.FlexBox>
            <Text color={selected.color} b>
              10 Years:
            </Text>
            <Text>Happy Anniversary!</Text>
          </S.FlexBox>
          <S.FlexBox>
            <Button highlight={selected}>Button</Button>
            <Button highlight={{ color: selected.color, glow: selected.color }}>
              Glowing Button
            </Button>
            <Button
              highlight={{ color: selected.color, glow: selected.color }}
              pulse
            >
              Pulsing Button
            </Button>
          </S.FlexBox>
          <S.FlexBox>
            <CheckboxLabel
              id="color-check"
              label="Checkbox"
              checked={checkChecked}
              color={selected.color}
              onChange={() => setCheckChecked(!checkChecked)}
            />
            <RadioLabel
              id="color-radio"
              label="Radio Button"
              checked={radioChecked}
              color={selected.color}
              onChange={() => setRadioChecked(!radioChecked)}
            />
          </S.FlexBox>
        </div>
        <div>
          <CalendarPicker
            id="color-test-calendar"
            year={year}
            setYear={setYear}
            value1={when}
            onClick={setWhen}
            highlightColor={selected.color}
            buttons={
              <Text color={selected.color} b>
                Selected: {whenString(when)}
              </Text>
            }
          />
        </div>
      </S.ExampleGroup>
    </S.PageContainer>
  );
};
