import React from "react";
import Dropdown from "react-bootstrap/Dropdown";


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