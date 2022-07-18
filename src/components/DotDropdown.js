import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";


// Dropdown menu that allows the user to edit content
const DotMenu = React.forwardRef(({ onClick }, ref) => (
  <i
    className="fas fa-ellipsis"
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
      <Dropdown.Menu popperConfig={{ strategy: "fixed" }}>
        <Dropdown.Item 
          onClick={handleEdit} 
          aria-label="edit"
        >
          <i className="fas fa-edit" /> Edit
        </Dropdown.Item>
        <Dropdown.Item 
          onClick={handleDelete} 
          aria-label="delete"
        >
          <i className="fas fa-trash-alt" /> Delete
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
      <Dropdown.Menu popperConfig={{ strategy: "fixed" }}>
        <Dropdown.Item
          onClick={() => history.push(`/profile/${id}/edit`)}
          aria-label="edit-profile"
        >
          <i className="fas fa-edit" /> Edit profile
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => history.push(`/profile/${id}/edit/password`)}
          aria-label="edit-password"
        >
          <i className="fas fa-key" /> Change password
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}


//Added proptypes and display name after ESlint testing
DotMenu.displayName= 'DotMenu';

DotMenu.propTypes = {
  onClick: PropTypes.func.isRequired
};

DotDropdown.propTypes = {
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

EditProfileDropdown.protoTypes = {
  id: PropTypes.object.isRequired
}