import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../../ui/loading/Loading";
import Table from "../../ui/table/Table";
import Button from "../../ui/button/Button";
import ActionModal from "../ActionModal";
import ActionButtons from "../ActionButtons";

import { getCookie } from "../../../utils/cookies";
import {
  createDepartment,
  deleteDepartment,
  updateDepartment,
} from "../../../store/reducers/organizationSlice";

const DepartmentsDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState("");
  const [organizationSelected, setOrganizationSelected] = useState({});
  const { departments } = useSelector((state) => state.organization);
  const dispatch = useDispatch();

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

  const handleAction = async (data) => {
    if (modalOpen === "Edit") {
      //Send request for editing
      try {
        const token = getCookie("token");
        await dispatch(
          updateDepartment(organizationSelected.id, data, setLoading, token)
        );
        alert("Department Updated Successfully");
        setModalOpen("");
      } catch (error) {
        alert(error.message);
        console.error(error);
      }
    } else if (modalOpen === "Add new") {
      //Send request for adding new one
      try {
        const token = getCookie("token");
        await dispatch(createDepartment(data, setLoading, token));
        alert("Department created Successfully");
        setModalOpen("");
      } catch (error) {
        alert(error.message);
        console.error(error);
      }
    } else {
      //Send request for deliting
      try {
        const token = getCookie("token");
        await dispatch(
          deleteDepartment(organizationSelected.id, setLoading, token)
        );
        alert("Department deleted Successfully");
        setModalOpen("");
      } catch (error) {
        alert(error.message);
        console.error(error);
      }
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
              organizationType={"Department"}
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
            Add Department
          </Button>
          <Table columns={columns} data={departments} />
        </>
      )}
    </>
  );
};

export default DepartmentsDashboard;
