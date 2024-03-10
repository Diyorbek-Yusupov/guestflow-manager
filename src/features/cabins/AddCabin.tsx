import Button from '@/ui/Button';
import CreateCabinForm from './CreateCabinForm';
import Modal from '@/ui/Modal';

function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button size="large" variation="primary">
          Add new cabin
        </Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}

// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
//   return (
//     <>
//       <Button
//         onClick={() => setIsOpenModal((prev) => !prev)}
//         size="large"
//         variation="primary"
//       >
//         Add new cabin
//       </Button>

//       {/* {showForm && <CreateCabinForm />} */}
//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
//         </Modal>
//       )}
//     </>
//   );
// }

export default AddCabin;
