import {
  IBooking,
  IBookingPayload,
  IBookingStatistics,
  IStaysStatistics,
  ITodayActivity,
} from '@/type';
import { getToday } from '@/utils/helpers';
import supabase from './supabase';
import { PAGE_SIZE } from '@/utils/constants';

interface IFilter {
  field: string;
  value: string;
  method?: string;
}

interface ISortBy {
  field: string;
  direction: string;
}

type GetBookings = {
  filter: null | IFilter;
  sortBy?: ISortBy;
  page?: number;
};

export async function getBookings({ filter, sortBy, page }: GetBookings) {
  let query = supabase
    .from('bookings')
    .select<'*, cabins(name), guests(fullName, email)', IBooking>(
      '*, cabins(name), guests(fullName, email)',
      { count: 'exact' }
    );

  if (filter !== null)
    switch (filter.method) {
      case 'gte':
        query = query.gte(filter.field, filter.value);
        break;
      default:
        query = query.eq(filter.field, filter.value);
    }

  if (sortBy) {
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === 'asc',
    });
  }

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error('Bookings cannot be loaded');
  }

  return { data, count };
}

export async function getBooking(id: number) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, cabins(*), guests(*)')
    .eq('id', id)
    .single<IBooking>();

  if (error) {
    console.error(error);
    throw new Error('Booking not found');
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date: string) {
  const { data, error } = await supabase
    .from('bookings')
    .select<string, IBookingStatistics>('created_at, totalPrice, extrasPrice')
    .gte('created_at', date)
    .lte('created_at', getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date: string) {
  const { data, error } = await supabase
    .from('bookings')
    .select<string, IStaysStatistics>(
      'created_at, totalPrice, extrasPrice, status, numNights, guests(fullName)'
    )
    .gte('startDate', date)
    .lte('startDate', getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from('bookings')
    .select<string, ITodayActivity>(
      '*, guests(fullName, nationality, countryFlag)'
    )
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order('created_at');

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }
  return data;
}

export async function updateBooking(id: number, obj: IBookingPayload) {
  const { data, error } = await supabase
    .from('bookings')
    .update(obj)
    .eq('id', id)
    .select()
    .single<IBooking>();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }
  return data;
}

export async function deleteBooking(id: number) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from('bookings').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Booking could not be deleted');
  }
  return data;
}
