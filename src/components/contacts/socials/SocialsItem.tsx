import React from 'react';
import { NavLink } from 'react-router-dom';
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen';
import { useDeleteContactMutation } from '../../../store/services/contactsService';
import { IContact } from '../../../models/IContact';
import './socials.scss';
import { DeleteButton } from '../../commons/buttons/DeleteButtonWithText';
import { LinkWithIcon } from '../../commons/buttons/LinkWithIcon';

export const SocialsItem: React.FC<IContact> = ({ _id, icon, name, href }) => {
  const [deleteContactMutation] = useDeleteContactMutation();

  const deleteContact = () => deleteContactMutation({ id: _id });
  return (
    <div className="socialItem">
      <h6 className="itemTitle">{name}:</h6>
      <NavLink to={href} className="w-50">{href}</NavLink>
      <LinkWithIcon
        to={`/contacts/social/${_id}?title=${name}&href=${href}`}
        icon={faPen}
        className="itemEditLink"
        iconClassName="editLinkIcon"
      />
      <DeleteButton
        icon
        className="itemDeleteButton"
        onClick={deleteContact}
      />
    </div>
  )
}