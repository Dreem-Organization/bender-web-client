// /* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { light as theme } from 'themeConfig';
import Button from 'components/Button';
import Label from 'components/Label';
import StyledDeleteAccountProfile from './style';

export class DeleteAccountProfile extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      verif: false,
    };
    this.toogleVerif = this.toogleVerif.bind(this);
  }

  toogleVerif() {
    this.setState({
      verif: !this.state.verif,
    });
  }

  render() {
    return (
      <StyledDeleteAccountProfile className="delete-account" {...this.props}>
        {this.state.verif ? (
          <div className="delete-account-sub-container">
            <div>
              <Label content="Are you sure ?" />
            </div>
            <div>
              <Button
                content="YES"
                color="grey"
                onClick={this.props.onDeleteAccount}
              />
              <Button content="NO" onClick={this.toogleVerif} />
            </div>
          </div>
        ) : (
          <Button
            content="DELETE MY ACCOUNT"
            color="negative"
            onClick={this.toogleVerif}
          />
        )}
      </StyledDeleteAccountProfile>
    );
  }
}

DeleteAccountProfile.displayName = 'Validation';
DeleteAccountProfile.propTypes = {
  theme: PropTypes.object,
  onDeleteAccount: PropTypes.func,
};

DeleteAccountProfile.defaultProps = {
  theme,
};

export default DeleteAccountProfile;
