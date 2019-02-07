import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrenciesList } from '../selectors/CommonSelectors';
// import * as currenciesActions from '../../store/currencies/actions';
import RatesList from '../components/RatesList/RatesList';
// import './RatesScreen.css';

const propTypes = {
  currenciesList: PropTypes.object.isRequired,
};

class RatesContainer extends Component {
  componentDidMount() {}

  handlerFavoritesAction = (ticker, method) => {
    // this.props.dispatch(currenciesActions.favoritesAction(ticker, method));
  };

  render() {
    const { currenciesList } = this.props;

    return (
      <section className="RatesScreen">
        <div className="container">
          <main>
            <RatesList list={currenciesList} favoritesAction={this.handlerFavoritesAction} />
          </main>
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    currenciesList: getCurrenciesList(state),
  };
}

RatesContainer.propTypes = propTypes;

export default connect(mapStateToProps)(RatesContainer);
