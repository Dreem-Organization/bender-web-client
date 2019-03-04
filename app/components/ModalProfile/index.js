// /* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { light as theme } from 'themeConfig';
import Title from 'components/Title';
import Label from 'components/Label';
import DeleteAccount from 'components/DeleteAccount';
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
        <button
          className="switch"
          onClick={() => props.onToggleTheme(props.theme)}
        />
      </section>
      <section>
        <Label
          content="Account suppression"
          size="standard"
          type="important"
          theme={props.theme}
        />
        <DeleteAccount onDeleteAccount={props.onDeleteAccount} />
      </section>
    </StyledModalProfile>
  );
}

ModalProfile.propTypes = {
  theme: PropTypes.object,
  user: PropTypes.object,
  onToggleTheme: PropTypes.func,
  onDeleteAccount: PropTypes.func,
};

ModalProfile.defaultProps = {
  theme,
};

export default ModalProfile;
