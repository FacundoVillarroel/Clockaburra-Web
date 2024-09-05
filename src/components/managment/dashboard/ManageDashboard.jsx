import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Loading from "../../ui/loading/Loading";
import Table from "../../ui/table/Table";
import Button from "../../ui/button/Button";
import ActionModal from "../ActionModal";
import ActionButtons from "../ActionButtons";

import { getCookie } from "../../../utils/cookies";

const ManageDashboard = ({
  data,
  entityType,
  createAction,
  updateAction,
  deleteAction,
}) => {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState("");
  const [organizationSelected, setOrganizationSelected] = useState({});
  const dispatch = useDispatch();

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Description", accessor: "description" },
    {
      header: "Actions",
      accessor: "id",
      render: (value, row) => (
        <ActionButtons
          organization={row}
          setOrganization={setOrganizationSelected}
          setModalOpen={setModalOpen}
        />
      ),
    },
  ];

  const handleAction = async (formData) => {
    const token = getCookie("token");

    try {
      if (modalOpen === "Edit") {
        await dispatch(
          updateAction(organizationSelected.id, formData, setLoading, token)
        );
        alert(`${entityType} Updated Successfully`);
      } else if (modalOpen === "Add new") {
        await dispatch(createAction(formData, setLoading, token));
        alert(`${entityType} Created Successfully`);
      } else {
        await dispatch(
          deleteAction(organizationSelected.id, setLoading, token)
        );
        alert(`${entityType} Deleted Successfully`);
      }
      setModalOpen("");
    } catch (error) {
      alert(error.message);
      console.error(error);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {modalOpen && (
            <ActionModal
              organization={organizationSelected}
              actionType={modalOpen}
              organizationType={entityType}
              handleAction={handleAction}
              handleClose={() => setModalOpen("")}
            />
          )}
          <Button
            margin={"0rem 0rem 2rem 0rem"}
            onClick={() => {
              setModalOpen("Add new");
              setOrganizationSelected({});
            }}
          >
            Add {entityType}
          </Button>
          <Table columns={columns} data={data} />
        </>
      )}
    </>
  );
};

export default ManageDashboard;
