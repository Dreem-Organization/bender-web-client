// /* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { light as theme } from 'themeConfig';
import Title from 'components/Title';
import Label from 'components/Label';
import StyledModalProfile from './style';

function ModalProfile(props) {
  return (
    <StyledModalProfile className="modal-create-experiment" {...props}>
      <Title content="Profile" theme={props.theme} />
      <section>
        <Label
          content="Username"
          type="important"
          size="standard"
          theme={props.theme}
        />
        <Label content={props.user.username} size="small" theme={props.theme} />
      </section>
      <section>
        <Label
          content="Mail"
          size="standard"
          type="important"
          theme={props.theme}
        />
        <Label content={props.user.email} size="small" theme={props.theme} />
      </section>
      <section>
        <Label
          content="Night mode"
          size="standard"
          type="important"
          theme={props.theme}
        />
        <button onClick={() => props.onToggleTheme(props.theme)} />
      </section>
    </StyledModalProfile>
  );
}

ModalProfile.propTypes = {
  theme: PropTypes.object,
  user: PropTypes.object,
  onToggleTheme: PropTypes.func,
};

ModalProfile.defaultProps = {
  theme,
};

export default ModalProfile;
