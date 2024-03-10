import Button from '@/ui/Button';
import { useCheckOut } from './useCheckOut';

interface ICheckoutButtonProps {
  bookingId: number;
}

function CheckoutButton({ bookingId }: ICheckoutButtonProps) {
  const { isCheckingOut, checkOut } = useCheckOut();
  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkOut({ bookingId })}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
