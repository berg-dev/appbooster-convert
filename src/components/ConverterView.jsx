import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  data: PropTypes.array.isRequired,
  currenciesList: PropTypes.array.isRequired,
  rate: PropTypes.number.isRequired,
  multiplier: PropTypes.string.isRequired,
  pairItem: PropTypes.number.isRequired,
  multiplierRate: PropTypes.number,
  isInput: PropTypes.bool,
  onChangeItemInPair: PropTypes.func.isRequired,
  onChangeMultiplier: PropTypes.func,
};

const defaultProps = {
  multiplierRate: 0,
  isInput: false,
  onChangeMultiplier: () => {},
};

class ConverterView extends PureComponent {
  state = {
    isEdit: false,
  };

  toggleEditBox = () => {
    this.setState({ isEdit: !this.state.isEdit });
  };

  handleOnChange = e => {
    const { value } = e.target;
    const resultValue = value.replace(/[^\d]/, '').toString();

    if (resultValue.length > 10) {
      e.preventDefault();
      return;
    }

    this.props.onChangeMultiplier(resultValue);
  };

  handleClickEdit = data => {
    const { onChangeItemInPair, pairItem } = this.props;
    const { flag, ticker, name } = data;

    onChangeItemInPair({ flag, ticker, name }, pairItem);
    this.toggleEditBox();
  };

  render() {
    const { data } = this.props;
    const { isEdit } = this.state;

    if (!data) return null;

    return (
      <div className="ConverterView">
        {this.renderCurrency()}
        {isEdit && this.renderList()}
      </div>
    );
  }

  renderList = () => {
    const { currenciesList } = this.props;

    return (
      <div className="ConverterView__edit-box">
        <button className="ConverterView__edit-close" type="button" onClick={this.toggleEditBox}>
          X
        </button>
        <ul className="ConverterView__edit-list">
          {currenciesList.map(item => (
            <li key={item.ticker} className="ConverterView__edit-item">
              <button
                type="button"
                className="ConverterView__edit-button"
                title={item.name}
                onClick={() => this.handleClickEdit(item)}>
                {item.flag || '?'}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  renderCurrency = () => {
    const { data, rate, isInput, multiplier, multiplierRate, pairItem } = this.props;
    const currency = data[pairItem];
    const intMultiplier = parseInt(multiplier, 10);

    return (
      <React.Fragment>
        <div className="ConverterView__tools">
          <button tabIndex={2} onClick={this.toggleEditBox} className="ConverterView__changer">
            Change
          </button>
        </div>
        <div className="ConverterView__flag">{currency.flag || '?'}</div>
        <div className="ConverterView__name">
          {currency.ticker} - {currency.name}
        </div>
        <div className="ConverterView__rate">
          1 {currency.ticker} = {rate.toFixed(5)} {pairItem === 0 ? data[1].ticker : data[0].ticker}
        </div>
        <div className="ConverterView__field">
          {isInput ? (
            <input
              type="text"
              value={isNaN(multiplier) ? '' : multiplier}
              className="ConverterView__field-input"
              tabIndex={1}
              onChange={this.handleOnChange}
            />
          ) : (
            <div className="ConverterView__field-result">
              {isNaN(intMultiplier) ? 'Введите сумму' : (intMultiplier * multiplierRate).toFixed(2)}
            </div>
          )}
        </div>
      </React.Fragment>
    );
  };
}

ConverterView.propTypes = propTypes;
ConverterView.defaultProps = defaultProps;

export default ConverterView;
