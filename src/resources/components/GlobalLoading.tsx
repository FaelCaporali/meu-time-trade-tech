import { Placeholder } from 'react-bootstrap';

function Loading() {
  return (
    <Placeholder as="p" animation="wave" bg="dark" size="xs">
      <Placeholder xs={12} />
    </Placeholder>
  )
}

export default Loading