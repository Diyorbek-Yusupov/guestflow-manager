import styled from 'styled-components';
import { useRecentBookings } from './useRecentBookings';
import Spinner from '@/ui/Spinner';
import { useRecentStays } from './useRecentStays';
import Stats from './Stats';
import { useCabins } from '@/features/cabins/useCabins';
import SalesChart from './SalesChart';
import DurationChart from './DurationChart';
import TodayActivity from '../check-in-out/TodayActivity';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isLoading, bookings } = useRecentBookings();
  const {
    isLoading: isStaysLoading,
    stays,
    confirmedStays,
    numDays,
  } = useRecentStays();
  const { isLoading: isCabinsLoading, cabins } = useCabins();

  if (isLoading || isStaysLoading || isCabinsLoading) return <Spinner />;

  if (!bookings || !confirmedStays || !cabins) return null;

  console.log('stays', stays);

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinsCount={cabins.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
// 28
