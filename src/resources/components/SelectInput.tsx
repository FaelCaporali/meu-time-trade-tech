import React, { useEffect } from 'react'
import { Container, FormLabel, FormSelect } from 'react-bootstrap'
import translator from '../../helpers/translator.json'
import { TSelectInputProps } from '../../types/components/SelectInput';

function SelectInput(props: TSelectInputProps) {
  const [value, setValue] = React.useState<undefined | string | number>(undefined);

  useEffect(() => {
    props.onChange(value);
  }, [value]);


  return (
    <Container>
      <FormLabel htmlFor={`select-${props.field}`}>
            Selecione {translator.inputFields[props.field]}
        <FormSelect
          value={value}
          onChange={(e) => setValue(e.target.value)}
          id={`select-${props.field}`}
          disabled={props.disabled}
          name={props.field}
        >
          {
            props.options.map((option) => (
              <option key={`option-${props.field}-${option}`} value={option}>
                {option}
              </option>
            ))
          }
        </FormSelect>
      </FormLabel>
    </Container>
  )
}

export default SelectInput