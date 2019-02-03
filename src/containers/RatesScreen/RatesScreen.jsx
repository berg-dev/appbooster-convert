import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as currenciesActions from '../../store/currencies/actions';
import * as currenciesSelectors from '../../store/currencies/reducer';
import Header from '../../components/Header/Header';
import RatesList from '../../components/RatesList/RatesList';
import './RatesScreen.css';

class RatesScreen extends Component {
  componentDidMount() {}

  handlerBaseCurrencyUpdate = ticker => {
    this.props.dispatch(currenciesActions.updateBaseCurrency(ticker));
  };

  handlerFavoritesAction = (ticker, method) => {
    this.props.dispatch(currenciesActions.favoritesAction(ticker, method));
  };

  render() {
    const { list } = this.props;

    return (
      <Fragment>
        <Header
          link={{ url: '/convert', text: '/to Convert' }}
          title="Exchange rates"
          baseCurrencyUpdater={this.handlerBaseCurrencyUpdate}
        />
        <section className="RatesScreen">
          <div className="container">
            <main>
              <RatesList list={list} favoritesAction={this.handlerFavoritesAction} />
            </main>
          </div>
        </section>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    list: currenciesSelectors.getSortedByFavoritesList(state),
  };
}

export default connect(mapStateToProps)(RatesScreen);
