import React from 'react';
import PropTypes from 'prop-types';
import theme from 'themeConfig';
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
        />
        <Image className="image fixed" src={logo} width="40px" height="40px" />
      </div>
      <Button
        type="round"
        icon="settings"
        onClick={() => {}}
        content="PROFILE"
      />
      <Button
        type="round"
        icon="power_settings_new"
        onClick={props.onLogout}
        content="LOGOUT"
      />
      <Button type="round" icon="bug_report" onClick={() => {}} content="BUG" />
      <Button
        type="round"
        icon="contact_support"
        onClick={() => {}}
        content="CONTACT"
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
};

Menu.defaultProps = {
  theme,
  visible: true,
  toggle: null,
};

export default Menu;
