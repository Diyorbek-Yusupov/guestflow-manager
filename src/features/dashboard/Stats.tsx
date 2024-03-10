import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2';
import { IBookingStatistics, IStaysStatistics } from '@/type';
import Stat from './Stat';
import { formatCurrency } from '@/utils/helpers';

interface IStatsProps {
  bookings: IBookingStatistics[];
  confirmedStays: IStaysStatistics[];
  numDays: number;
  cabinsCount: number;
}

function Stats({
  bookings,
  confirmedStays,
  cabinsCount,
  numDays,
}: IStatsProps) {
  const numBookings = bookings.length;
  const numCheckins = confirmedStays.length;
  const sales = bookings.reduce((curr, acc) => curr + acc.totalPrice, 0);
  const occupation =
    confirmedStays.reduce((curr, acc) => curr + acc.numNights, 0) /
    (numDays * cabinsCount);
  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={numCheckins}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + '%'}
      />
    </>
  );
}

export default Stats;
