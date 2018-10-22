import React from 'react';
import PropTypes from 'prop-types';
import theme from 'themeConfig';
import logo from 'images/bender-logo.svg';
import Image from 'components/Image';
import Button from 'components/Button';
import StyledMenu from './style';

function Menu(props) {
  return (
    <StyledMenu className="menu" {...props}>
      <Image src={logo} width="40px" />
      <Button type="round" icon="settings" onClick={() => {}} />
      <Button type="round" icon="power_settings_new" onClick={props.onLogout} />
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
};

Menu.defaultProps = {
  theme,
  visible: true,
  toggle: null,
};

export default Menu;
