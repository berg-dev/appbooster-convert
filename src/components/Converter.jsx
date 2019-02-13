import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ConverterView from './ConverterView';

const propTypes = {
  pair: PropTypes.array.isRequired,
  currenciesList: PropTypes.object.isRequired,
  rate: PropTypes.object.isRequired,
  changeItemInPair: PropTypes.func.isRequired,
};

class Converter extends Component {
  state = {
    multiplier: '1',
  };

  handleOnChangeMultiplier = value => {
    this.setState({ multiplier: value });
  };

  handleOnChangeItemInPair = (data, ind) => {
    this.props.changeItemInPair(data, ind);
  };

  render() {
    const { pair, currenciesList, rate } = this.props;
    const { multiplier } = this.state;

    if (!pair[0] || !pair[1]) return null;

    return (
      <div className="Converter">
        <ConverterView
          data={pair}
          pairItem={0}
          currenciesList={currenciesList}
          multiplier={multiplier}
          rate={rate.base}
          isInput={true}
          onChangeMultiplier={this.handleOnChangeMultiplier}
          onChangeItemInPair={this.handleOnChangeItemInPair}
        />
        <hr className="Converter__separator" />
        <ConverterView
          data={pair}
          pairItem={1}
          currenciesList={currenciesList}
          multiplier={multiplier}
          rate={rate.inverse}
          multiplierRate={rate.base}
          onChangeItemInPair={this.handleOnChangeItemInPair}
        />
      </div>
    );
  }
}

Converter.propTypes = propTypes;

export default Converter;
