import { Modal, Button } from "antd";

import PropTypes from "prop-types";

import Loader from "./Loader";
import { useDeleteAccount } from "../hooks/useDeleteAccount";

DeleteModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  showRegisterModal: PropTypes.func.isRequired,
};

function DeleteModal({ open, onOk, onCancel, userID }) {
  const { deleteAccountFn, isLoading } = useDeleteAccount();

  return (
    <Modal
      className="custom-modal text-black"
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      title="Delete Account"
      footer={(_, { OkBtn, CancelBtn }) => (
        <>
          <CancelBtn />

          <Button
            className="bg-[red] text-white"
            onClick={() => {
              deleteAccountFn(userID);
              onCancel;
            }}
          >
            {isLoading ? <Loader /> : "Delete"}
          </Button>
        </>
      )}
    >
      <div>
        <h3 className="text-textGrey my-10 font-normal">
          Are you sure you want to delete your account permanently? This action
          cannot be undone.
        </h3>
      </div>
    </Modal>
  );
}

export default DeleteModal;
