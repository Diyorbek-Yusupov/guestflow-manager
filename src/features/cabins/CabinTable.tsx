import { useSearchParams } from 'react-router-dom';
import CabinRow from './CabinRow';
import Spinner from '@/ui/Spinner';

import { useCabins } from './useCabins';
import Table from '@/ui/Table';
import Menus from '@/ui/Menus';
import Empty from '@/ui/Empty';

interface ICabin {
  id: number;
  created_at: string;
  description: string;
  discount: string;
  image: string;
  maxCapacity: string;
  name: string;
  regularPrice: string;
}

function CabinTable() {
  const { isLoading, cabins = [] } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resource="Cabins" />;
  // filter
  const filterValue = searchParams.get('discount') || 'all';
  let filteredCabins: ICabin[] = [];

  if (filterValue === 'all') filteredCabins = cabins;
  else if (filterValue === 'no-discount')
    filteredCabins = cabins.filter((cabin) => Number(cabin.discount) === 0);
  else if (filterValue === 'with-discount')
    filteredCabins = cabins.filter((cabin) => Number(cabin.discount) > 0);

  // sort
  const sortBy = searchParams.get('sortBy') || 'startDate-asc';
  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1;

  const sortedCabins = filteredCabins.sort((a, b) => {
    const aField = a[field as keyof ICabin];
    const bField = b[field as keyof ICabin];

    const aNumber = typeof aField === 'number' ? aField : parseFloat(aField);
    const bNumber = typeof bField === 'number' ? bField : parseFloat(bField);
    return (aNumber - bNumber) * modifier;
  });

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div role="cell"></div>
          <div role="cell">Cabin</div>
          <div role="cell">Capacity</div>
          <div role="cell">Price</div>
          <div role="cell">Discount</div>
          <div role="cell"></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;

// 29:4
