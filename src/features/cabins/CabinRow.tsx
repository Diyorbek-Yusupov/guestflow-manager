import styled from 'styled-components';
import { ICabin } from '@/type';
import { formatCurrency } from '@/utils/helpers';
import CreateCabinForm from '@/features/cabins/CreateCabinForm';
import { useDeleteCabin } from '@/features/cabins/useDeleteCabin';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';

import { useCreateCabin } from './useCreateCabin';
import Modal from '@/ui/Modal';
import ConfirmDelete from '@/ui/ConfirmDelete';
import Table from '@/ui/Table';
import Menus from '@/ui/Menus';

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

interface IPropTypes {
  cabin: ICabin;
}

function CabinRow({ cabin }: IPropTypes) {
  const { id, image, name, regularPrice, maxCapacity, discount, description } =
    cabin;

  const { createCabin } = useCreateCabin();
  const { isDeleting, deleteCabin } = useDeleteCabin();

  const handleDublicate = () => {
    createCabin({
      name: `Copy of ${name}`,
      description,
      discount,
      image,
      maxCapacity,
      regularPrice,
    });
  };

  return (
    <>
      <Table.Row>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guets</div>
        <Price>{formatCurrency(Number(regularPrice))}</Price>
        <Discount>{formatCurrency(Number(discount))}</Discount>
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={id.toString()} />
              <Menus.List id={id.toString()}>
                <Menus.Button
                  icon={<HiSquare2Stack />}
                  onClick={handleDublicate}
                >
                  Dublicate
                </Menus.Button>
                <Modal.Open opens="edit">
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open>

                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>
              <Modal.Window name="edit">
                <CreateCabinForm cabinToEdit={cabin} />
              </Modal.Window>
              <Modal.Window name="delete">
                <ConfirmDelete
                  disabled={isDeleting}
                  onConfirm={() => deleteCabin(id)}
                  resourceName="cabin"
                />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}

export default CabinRow;
