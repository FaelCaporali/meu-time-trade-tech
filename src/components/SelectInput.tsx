import React from 'react'
import { TSelectInputProps } from '../types/components/SelectInput'
import { Container, FormLabel, FormSelect } from 'react-bootstrap'
import translator from '../helpers/translator.json'

function SelectInput(props: TSelectInputProps) {
  const [value, setValue] = React.useState<undefined | string>(undefined);

  return (
    <Container>
        <FormLabel htmlFor={props.field}>
            Selecione o {translator.inputFields[props.field]}:
            <FormSelect
                value={value}
                onChange={(e) => setValue(e.target.value)}
                id={`select-${props.field}`}
                disabled={props.disabled}
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