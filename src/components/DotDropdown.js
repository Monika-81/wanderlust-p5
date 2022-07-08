import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useHistory } from "react-router-dom";


const DotMenu = React.forwardRef(({ onClick }, ref) => (
    <i
      className="fas fa-ellipsis-v"
      ref={ref}
      onClick={(event) => {
        event.preventDefault();
        onClick(event);
      }}
    />
  ));

  export const DotDropdown = ({ handleEdit, handleDelete }) => {
    return (
      <Dropdown>
        <Dropdown.Toggle as={DotMenu} />
        <Dropdown.Menu
          popperConfig={{ strategy: "fixed" }}
        >
          <Dropdown.Item
            onClick={handleEdit}
            aria-label="edit"
          >
            <i className="fas fa-edit" />
          </Dropdown.Item>
          <Dropdown.Item
            onClick={handleDelete}
            aria-label="delete"
          >
            <i className="fas fa-trash-alt" />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  export function EditProfileDropdown({ id }) {
    const history = useHistory();
    return (
      <Dropdown>
        <Dropdown.Toggle as={DotMenu} />
        <Dropdown.Menu
          popperConfig={{ strategy: "fixed" }}
        >
          <Dropdown.Item
            onClick={() => history.push(`/profile/${id}/edit`)}
            aria-label="edit-profile"
          >
            <i className="fas fa-edit" />
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => history.push(`/profiles/${id}/edit/password`)}
            aria-label="edit-password"
          >
            <i className="fas fa-key" />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>


    )
  }