import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  data: PropTypes.shape({}).isRequired,
  currenciesList: PropTypes.object.isRequired,
};

class ConverterView extends PureComponent {
  state = {
    isEdit: false,
  };

  handleEditClick = () => {
    this.setState({ isEdit: !this.state.isEdit });
  };

  render() {
    const { isEdit } = this.state;

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
      <div className="ConverterView__list">
        {currenciesList.map(item => (
          <div key={item.ticker}>{item.flag}</div>
        ))}
      </div>
    );
  };

  renderCurrency = () => {
    const { data } = this.props;

    return (
      <React.Fragment>
        <div className="ConverterView__tools">
          <button tabIndex={2} onClick={this.handleEditClick}>
            e
          </button>
          <button tabIndex={2}>f</button>
        </div>
        <div className="ConverterView__flag">{data.get('flag')}</div>
        <div className="ConverterView__name">
          {data.get('ticker')} - {data.get('name')}
        </div>
        <div className="ConverterView__rate">
          1 {data.get('ticker')} = 0.776791 {data.get('ticker')}
        </div>
        <div className="ConverterView__field">
          <input type="text" value={1} className="ConverterView__field-input" tabIndex={1} />
        </div>
      </React.Fragment>
    );
  };
}

ConverterView.propTypes = propTypes;

export default ConverterView;
