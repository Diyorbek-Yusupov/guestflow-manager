interface IEmptyProps {
  resource: string;
}

function Empty({ resource }: IEmptyProps) {
  return <p>No {resource} could be found.</p>;
}

export default Empty;
