import { NavLink, NavLinkProps } from 'react-router-dom';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './buttons.scss';

interface LinkWithIconProps extends NavLinkProps {
  iconClassName?: string
  icon: IconProp
  title?: string
}

export const LinkWithIcon: React.FC<LinkWithIconProps> = (
  {
    icon,
    title,
    style,
    className,
    iconClassName,
    ...props
  }
) => {
  const finalClassName = className ? `buttonWithIcon ${className}` : 'buttonWithIcon';
  const finalIconClassName = iconClassName ? `icon ${iconClassName}` : 'icon';
  return (
    <NavLink {...props} className={finalClassName}>
      <FontAwesomeIcon icon={icon} className={finalIconClassName}/>
      {title && <span className="buttonText">{title}</span>}
    </NavLink>
  )
}