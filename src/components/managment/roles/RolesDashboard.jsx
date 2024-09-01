import React, { useState } from "react";

import Loading from "../../ui/loading/Loading";
import Table from "../../ui/table/Table";
import Button from "../../ui/button/Button";
import ActionModal from "../ActionModal";
import ActionButtons from "../ActionButtons";

import { getCookie } from "../../../utils/cookies";

const RolesDashboard = ({ roles = [] }) => {
  const [loading, setLoading] = useState(false);
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

  const fetchNew = async (newRole) => {
    try {
      setLoading(true);
      const token = getCookie("token");
      const response = await fetch(`/api/role`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newRole),
      });
      const roleCreated = await response.json();
      if (!response.ok) {
        throw new Error(roleCreated.message);
      }
      alert("Role created Successfully");
      setLoading(false);
      roles.push({
        id: roleCreated.id,
        name: roleCreated.data.name,
        description: roleCreated.data.description,
      });
      setModalOpen("");
    } catch (error) {
      alert(error.message);
      setLoading(false);
      console.error(error);
    }
  };

  const fetchUpdate = async (roleUpdate) => {
    try {
      setLoading(true);
      const token = getCookie("token");
      const response = await fetch(`/api/role/${organizationSelected.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(roleUpdate),
      });
      const roleUpdated = await response.json();
      if (!response.ok) {
        throw new Error(roleUpdated.message);
      }
      alert("Role Updated Successfully");
      setLoading(false);
      // Find the index of the role to modify
      const index = roles.findIndex(
        (role) => role.id === organizationSelected.id
      );
      // Modify the role if it is found
      if (index !== -1) {
        roles[index] = { ...roles[index], ...roleUpdate };
      }
      setModalOpen("");
    } catch (error) {
      alert(error.message);
      setLoading(false);
      console.error(error);
    }
  };

  const fetchDelete = async () => {
    try {
      setLoading(true);
      const token = getCookie("token");
      const response = await fetch(`/api/role/${organizationSelected.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const roleDeleted = await response.json();
      if (!response.ok) {
        throw new Error(roleDeleted.message);
      }
      alert("Role deleted Successfully");
      setLoading(false);
      // Find the index of the role to remove
      const index = roles.findIndex(
        (role) => role.id === organizationSelected.id
      );
      // Remove the role if it is found
      if (index !== -1) {
        roles.splice(index, 1);
      }
      setModalOpen("");
    } catch (error) {
      alert(error.message);
      setLoading(false);
      console.error(error);
    }
  };

  const handleAction = (data) => {
    if (modalOpen === "Edit") {
      fetchUpdate(data);
    } else if (modalOpen === "Add new") {
      fetchNew(data);
    } else {
      fetchDelete();
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
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
        </>
      )}
    </>
  );
};

export default RolesDashboard;
