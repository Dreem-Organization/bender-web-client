import React from 'react';
import PropTypes from 'prop-types';
import theme from 'themeConfig';
import Icon from 'components/Icon';
import StyledClipBoardButton from './style';

function ClipBoardButton(props) {
  return (
    <StyledClipBoardButton className="clipboard-button" {...props}>
      <input onFocus={e => e.target.select()} value={props.value} readOnly />
      <div
        onClick={() => {
          const el = document.createElement('textarea');
          el.value = props.value;
          document.body.appendChild(el);
          el.select();
          document.execCommand('copy');
          document.body.removeChild(el);
        }}
        className="clipboard-button-copy"
      >
        <Icon name="file_copy" />
      </div>
    </StyledClipBoardButton>
  );
}

ClipBoardButton.propTypes = {
  theme: PropTypes.object,
  value: PropTypes.string.isRequired,
};

ClipBoardButton.defaultProps = {
  theme,
};

export default ClipBoardButton;
