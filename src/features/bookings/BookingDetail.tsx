import styled from 'styled-components';

import BookingDataBox from './BookingDataBox';
import Row from '@/ui/Row';
import Heading from '@/ui/Heading';
import Tag from '@/ui/Tag';
import ButtonGroup from '@/ui/ButtonGroup';
import Button from '@/ui/Button';
import ButtonText from '@/ui/ButtonText';

import { useMoveBack } from '@/hooks/useMoveBack';
import useBooking from './useBooking';
import Spinner from '@/ui/Spinner';
import { useNavigate } from 'react-router-dom';
import { useCheckOut } from '../check-in-out/useCheckOut';
import Modal from '@/ui/Modal';
import useDeleteBooking from './useDeleteBooking';
import ConfirmDelete from '@/ui/ConfirmDelete';
import Empty from '@/ui/Empty';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();
  const { data, isLoading } = useBooking();
  const { checkOut, isCheckingOut } = useCheckOut();
  const { deleteBooking, isDeleting } = useDeleteBooking();

  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;
  if (!data) return <Empty resource="booking" />;

  const { id: bookingId, status } = data;

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status as keyof typeof statusToTagName]}>
            {status.replace('-', ' ')}
          </Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={data} />

      <ButtonGroup>
        {data.status === 'unconfirmed' && (
          <Button
            size="medium"
            variation="primary"
            onClick={() => navigate(`/checkin/${bookingId}`)}
          >
            Check in
          </Button>
        )}
        {status === 'checked-in' && (
          <Button
            onClick={() => checkOut({ bookingId })}
            disabled={isCheckingOut}
            size="medium"
            variation="primary"
          >
            Check out
          </Button>
        )}
        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger" size="medium">
              Delete
            </Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              disabled={isDeleting}
              onConfirm={() =>
                deleteBooking(bookingId, {
                  onSettled: () => navigate(-1),
                })
              }
              resourceName="booking"
            />
          </Modal.Window>
        </Modal>
        <Button variation="secondary" onClick={moveBack} size="medium">
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
