import React from 'react';
import PropTypes from 'prop-types';
import theme from 'themeConfig';
import Title from 'components/Title';
import Label from 'components/Label';
import AlgoTile from 'components/AlgoTile';
import Button from 'components/Button';
import StyledAlgos from './style';

function Algos(props) {
  return (
    <StyledAlgos className="algos" {...props}>
      <div className="algos-head">
        <Title content="Algos" size={2} />
      </div>
      <div className="algo-list">
        {Object.values(props.algos.list).map(a => (
          <AlgoTile
            key={a.id}
            algo={a}
            onRemoveAlgo={props.onRemoveAlgo}
            onUpdateAlgo={props.openUpdateAlgoModal}
          />
        ))}
        {Object.keys(props.algos.list).length ? (
          ''
        ) : (
          <div className="algo-list-empty">
            <Label content="No algo yet, create one !" type="important" />
          </div>
        )}
      </div>
      <div className="algos-create-container">
        <Button
          className="spec"
          type="round"
          icon="add_circle_outline"
          color="positive"
          onClick={props.openAlgoModal}
        />
      </div>
    </StyledAlgos>
  );
}

Algos.propTypes = {
  theme: PropTypes.object,
  algos: PropTypes.object.isRequired,
  onRemoveAlgo: PropTypes.func.isRequired,
  openUpdateAlgoModal: PropTypes.func.isRequired,
  openAlgoModal: PropTypes.func.isRequired,
};

Algos.defaultProps = {
  theme,
};

export default Algos;
