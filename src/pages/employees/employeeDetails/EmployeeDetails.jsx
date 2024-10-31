import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../components/ui/loading/Loading";
import { LuPenSquare, LuTrash2, LuXCircle } from "react-icons/lu";
import { DateTime } from "luxon";
import { useSelector } from "react-redux";

import Card from "../../../components/ui/card/Card";
import logo from "../../../assets/logoClockaburra.png";

import { getCookie } from "../../../utils/cookies";
import {
  RootContainer,
  EmployeeHeader,
  EmployeeImageContainer,
  EmployeeBody,
  EmployeeForm,
  Label,
  Input,
  EditButton,
  SubmitButtonContainer,
  DeleteButton,
  ResendButtonContainer,
  Info,
  Select,
} from "./EmployeeDetails.styles";

import DeleteUserModal from "../../../components/deleteUserModal/DeleteUserModal";
import Button from "../../../components/ui/button/Button";
import UpdateEmployeeModal from "../../../components/updateEmployeeModal/UpdateEmployeeModal";
import Colors from "../../../constants/Colors";

const EmployeeDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [employee, setEmployee] = useState({});
  const [employeeUpdate, setEmployeeUpdate] = useState({});
  const [modalOpen, setModalOpen] = useState("");
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  const { departments, roles } = useSelector((state) => state.organization);

  let rolesOptions = [{ label: "", value: "" }];
  if (roles.length) {
    rolesOptions = roles.map((role) => ({
      label: role.name,
      value: role.name,
    }));
  }
  let departmentsOptions = [{ label: "", value: "" }];
  if (departments.length) {
    departmentsOptions = departments.map((department) => ({
      label: department.name,
      value: department.name,
    }));
  }

  const fetchUser = useCallback(async () => {
    try {
      const token = getCookie("token");
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const user = await response.json();
      setEmployee(user.user);
      setEmployeeUpdate(user.user);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("EmployeeDetail", error);
      navigate("/employees/list");
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleDelete = async () => {
    try {
      setModalOpen(false);
      setLoading(true);
      const token = getCookie("token");
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/users/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const user = await response.json();

      if (user.deleted) {
        alert(`user: ${id}, Deleted succesfully`);
        navigate("/employees/list");
      } else {
        alert(`Error deleting user: ${id}`);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("EmployeeDetails", error);
    }
  };

  const onDelete = () => {
    setModalOpen("delete");
  };

  const handleClose = () => {
    setModalOpen("");
  };

  const handleResendLink = async () => {
    try {
      setLoading(true);
      const token = getCookie("token");
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/users/resend-validation-link/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: employee.name,
            role: employee.role,
          }),
        }
      );
      const result = await response.json();
      if (result.ok) {
        alert("Validation link sent to user email successfully");
      } else {
        alert(
          "There was a problem sending the validation link, please try again later."
        );
      }
      setLoading(false);
    } catch (error) {
      console.error("EmployeeDetails: ", error);
      alert(
        "There was a problem sending the validation link, please try again later."
      );
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    if (name === "hourlyRate") {
      setEmployeeUpdate({
        ...employeeUpdate,
        [name]: parseFloat(value),
      });
    } else {
      setEmployeeUpdate({
        ...employeeUpdate,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isNaN(employee.hourlyRate)) {
      return alert("Must enter a valid number in Hourly Rate");
    }
    const startDateObj = DateTime.fromISO(employee.startDate);
    if (startDateObj.toISO() == null) {
      return alert("Must enter a valid Start Day");
    }
    setModalOpen("saveChanges");
  };

  const handleSaveEmployee = async (handleLoading) => {
    const startDateObj = DateTime.fromISO(employee.startDate);
    const updatedEmployee = {
      ...employeeUpdate,
      startDate: startDateObj.toISO(),
    };
    try {
      handleLoading(true);
      const token = getCookie("token");
      console.log("update", updatedEmployee);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/users/${employee.email}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedEmployee),
        }
      );

      const result = await response.json();
      handleLoading(false);
      setModalOpen(false);
      if (result.updated) {
        alert("User updated successfully");
      } else {
        alert("Error updating user information. please try again later.");
      }
    } catch (error) {
      console.error("EmployeeDetails", error);
    }
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <RootContainer>
          <EmployeeHeader>
            <EmployeeImageContainer image_url={employee.imageUrl || logo} />
            <Info>
              {employee.name} {employee.surname}
            </Info>
            <EditButton
              onClick={() => {
                setEditMode((oldValue) => !oldValue);
              }}
            >
              {editMode ? (
                <LuXCircle color={Colors.accent} fontSize={30} />
              ) : (
                <LuPenSquare color={Colors.accent} fontSize={30} />
              )}
            </EditButton>
            <DeleteButton onClick={onDelete}>
              <LuTrash2 color="red" fontSize={30} />
            </DeleteButton>
          </EmployeeHeader>
          {editMode ? (
            <EmployeeForm onSubmit={handleSubmit}>
              <Card box_shadow={"0 2px 5px rgba(17,31,77,1)"}>
                <strong>Email:</strong> {employee.email}
              </Card>
              <Card box_shadow={"0 2px 5px rgba(17,31,77,1)"}>
                <Label htmlFor="startDate">Start day: </Label>
                <Input
                  type="date"
                  value={employeeUpdate.startDate?.split("T")[0]}
                  name="startDate"
                  onChange={handleChange}
                />
              </Card>
              <Card box_shadow={"0 2px 5px rgba(17,31,77,1)"}>
                <Label htmlFor="address">Address: </Label>
                <Input
                  type="text"
                  value={employeeUpdate.address}
                  name="address"
                  onChange={handleChange}
                />
              </Card>
              <Card box_shadow={"0 2px 5px rgba(17,31,77,1)"}>
                <Label htmlFor="phoneNumber">Phone Number: </Label>
                <Input
                  type="tel"
                  value={employeeUpdate.phoneNumber}
                  name="phoneNumber"
                  onChange={handleChange}
                />
              </Card>
              <Card box_shadow={"0 2px 5px rgba(17,31,77,1)"}>
                <Label htmlFor="role">Role: </Label>
                <Select
                  name="role"
                  value={employeeUpdate.role}
                  onChange={handleChange}
                >
                  {
                    //generates options list
                    rolesOptions.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    ))
                  }
                </Select>
              </Card>
              <Card box_shadow={"0 2px 5px rgba(17,31,77,1)"}>
                <Label htmlFor="hourlyRate">Hourly Rate: </Label>
                <Input
                  type="number"
                  value={employeeUpdate.hourlyRate}
                  name="hourlyRate"
                  onChange={handleChange}
                />
              </Card>
              <Card box_shadow={"0 2px 5px rgba(17,31,77,1)"}>
                <Label htmlFor="department">Department: </Label>
                <Select
                  name="department"
                  value={employeeUpdate.department}
                  onChange={handleChange}
                >
                  {
                    //generates options list
                    departmentsOptions.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    ))
                  }
                </Select>
              </Card>
              <Card box_shadow={"0 2px 5px rgba(17,31,77,1)"}>
                <strong>Complete Registration:</strong>
                {employeeUpdate.isRegistered ? "Yes" : "No"}
              </Card>
              <SubmitButtonContainer>
                <Button type="submit">Save Changes</Button>
              </SubmitButtonContainer>
            </EmployeeForm>
          ) : (
            <EmployeeBody>
              <Card box_shadow={"0 2px 5px rgba(17,31,77,1)"}>
                <strong>Email:</strong> {employee.email}
              </Card>
              <Card box_shadow={"0 2px 5px rgba(17,31,77,1)"}>
                <strong>Start Day:</strong> {employee.startDate?.split("T")[0]}
              </Card>
              <Card box_shadow={"0 2px 5px rgba(17,31,77,1)"}>
                <strong>Address:</strong> {employee.address}
              </Card>
              <Card box_shadow={"0 2px 5px rgba(17,31,77,1)"}>
                <strong>Phone Number:</strong> {employee.phoneNumber}
              </Card>
              <Card box_shadow={"0 2px 5px rgba(17,31,77,1)"}>
                <strong>Role:</strong> {employee.role}
              </Card>
              <Card box_shadow={"0 2px 5px rgba(17,31,77,1)"}>
                <strong>Hourly Rate:</strong> {employee.hourlyRate}
              </Card>
              <Card box_shadow={"0 2px 5px rgba(17,31,77,1)"}>
                <strong>Department:</strong>
                {employee.department}
              </Card>
              <Card box_shadow={"0 2px 5px rgba(17,31,77,1)"}>
                <strong>Complete Registration:</strong>
                {employee.isRegistered ? "Yes" : "No"}
              </Card>
            </EmployeeBody>
          )}
          {!employee.isRegistered && (
            <ResendButtonContainer>
              <Button onClick={handleResendLink}>
                Resend registration link
              </Button>
            </ResendButtonContainer>
          )}
          {modalOpen === "delete" && (
            <DeleteUserModal
              id={id}
              handleClose={handleClose}
              handleDelete={handleDelete}
            />
          )}
          {modalOpen === "saveChanges" && (
            <UpdateEmployeeModal
              handleSaveEmployee={handleSaveEmployee}
              setModalOpen={setModalOpen}
            />
          )}
        </RootContainer>
      )}
    </div>
  );
};

export default EmployeeDetails;
