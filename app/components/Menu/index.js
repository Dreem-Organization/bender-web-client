import React from 'react';
import PropTypes from 'prop-types';
import { light as theme } from 'themeConfig';
import animated from 'images/animation.gif';
import logo from 'images/logo.png';
import Image from 'components/Image';
import Button from 'components/Button';
import StyledMenu from './style';

function Menu(props) {
  return (
    <StyledMenu className="menu" {...props}>
      <div className="menu-logo-container">
        <Image
          className="image animated"
          src={animated}
          width="40px"
          height="40px"
          theme={props.theme}
        />
        <Image
          className="image fixed"
          src={logo}
          width="40px"
          height="40px"
          theme={props.theme}
        />
      </div>
      <Button
        type="round"
        icon="settings"
        onClick={props.onOpenProfile}
        content="PROFILE"
        theme={props.theme}
      />
      <Button
        type="round"
        icon="description"
        onClick={() =>
          window.open(
            'https://bender-optimizer.readthedocs.io/en/latest/',
            '_blank',
          )
        }
        content="DOCS"
        theme={props.theme}
      />
      <Button
        type="round"
        icon="power_settings_new"
        onClick={props.onLogout}
        content="LOGOUT"
        theme={props.theme}
      />
      <Button
        type="round"
        icon="bug_report"
        onClick={props.onOpenContact}
        content="BUG"
        theme={props.theme}
      />
      <Button
        type="round"
        icon="contact_support"
        onClick={props.onOpenContact}
        content="CONTACT"
        theme={props.theme}
      />
      <span
        className={props.visible ? 'hide' : 'hide hidden'}
        onClick={props.toggle}
      />
    </StyledMenu>
  );
}

Menu.propTypes = {
  theme: PropTypes.object,
  onLogout: PropTypes.func,
  visible: PropTypes.bool,
  toggle: PropTypes.func,
  fetching: PropTypes.array,
  onOpenProfile: PropTypes.func,
  onOpenContact: PropTypes.func,
};

Menu.defaultProps = {
  theme,
  visible: true,
  toggle: null,
};

export default Menu;
