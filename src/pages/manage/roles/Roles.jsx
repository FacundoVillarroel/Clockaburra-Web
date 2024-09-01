import React, { useState } from "react";

import Table from "../../../components/ui/table/Table";
import Button from "../../../components/ui/button/Button";
import ActionButtons from "../../../components/managment/ActionButtons";
import ActionModal from "../../../components/managment/ActionModal";

const roles = [
  { id: 1, name: "admin", description: "Administrator" },
  { id: 2, name: "User", description: "Usuario" },
];

const Roles = () => {
  const [modalOpen, setModalOpen] = useState("");
  const [organizationSelected, setOrganizationSelected] = useState({});

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Description", accessor: "description" },
    {
      header: "Actions",
      accessor: "id",
      render: (value, row) => {
        return (
          <ActionButtons
            organization={row}
            setOrganization={setOrganizationSelected}
            setModalOpen={setModalOpen}
          />
        );
      },
    },
  ];

  const handleAction = (data) => {
    if (modalOpen === "Edit" || modalOpen === "Add new") {
      // fetch Api
      console.log(modalOpen, data);
    } else {
      // fetch Api
      console.log(modalOpen, organizationSelected);
    }
  };

  return (
    <div>
      {modalOpen ? (
        <ActionModal
          organization={organizationSelected}
          actionType={modalOpen}
          organizationType={"Role"}
          handleAction={handleAction}
          handleClose={() => {
            setModalOpen("");
          }}
        />
      ) : (
        ""
      )}
      <Button
        margin={"0rem 0rem 2rem 0rem"}
        onClick={() => {
          setModalOpen("Add new");
          setOrganizationSelected({});
        }}
      >
        Add Role
      </Button>
      <Table columns={columns} data={roles} />
    </div>
  );
};

export default Roles;
