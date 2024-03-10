import Select from '@/ui/Select';
import { useSearchParams } from 'react-router-dom';

interface ISortByProps {
  options: { value: string; label: string }[];
}

function SortBy({ options }: ISortByProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set('sortBy', e.target.value);
    setSearchParams(searchParams);
  };
  const sortBy = searchParams.get('sortBy') || options[0].value;
  return (
    <Select
      options={options}
      type="white"
      onChange={handleChange}
      value={sortBy}
    />
  );
}

export default SortBy;
