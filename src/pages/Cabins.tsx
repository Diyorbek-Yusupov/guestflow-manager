import Heading from '@/ui/Heading';
import Row from '@/ui/Row';
import CabinTable from '@/features/cabins/CabinTable';
import AddCabin from '@/features/cabins/AddCabin';
import CabinsTableOperatons from '@/features/cabins/CabinsTableOperations';

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinsTableOperatons />
      </Row>
      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
