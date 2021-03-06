/* eslint-disable react/no-did-mount-set-state */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import styled from 'styled-components';
import initStore from '../store';
import Results from '../components/Results';
import Layout from '../components/Layout';
import Description from '../components/Description';

const Content = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
  padding-top: 20px;
`;

@withRedux(initStore, ({ results, loading, details, params, cast }) => ({
  results,
  loading,
  details,
  params,
  cast
}))
export default class Home extends PureComponent {
  static propTypes = {
    results: PropTypes.shape({
      data: PropTypes.array,
      searchTerm: PropTypes.string
    }),
    loading: PropTypes.bool.isRequired,
    details: PropTypes.shape({
      name: PropTypes.string,
      torrentId: PropTypes.string,
      files: PropTypes.shape({
        name: PropTypes.string,
        type: PropTypes.string,
        size: PropTypes.string
      })
    }).isRequired,
    dispatch: PropTypes.func,
    params: PropTypes.shape({
      searchTerm: PropTypes.string
    }).isRequired,
    cast: PropTypes.array
  };

  static defaultProps = {
    results: {},
    dispatch() {}
  };

  getContent() {
    const { results, details, dispatch } = this.props;

    if (this.isMagnetUrl()) {
      return (
        <Content>
          <div className="centered" style={{ width: '90%' }}>
            <h5>{details.name}</h5>
            <Description details={details} dispatch={dispatch} showOnlyDetails />
          </div>
        </Content>
      );
    }

    return (
      <Content>
        {results.data && !!results.data.length && <Results />}
      </Content>
    );
  }

  isMagnetUrl = () =>
    this.props.params.searchTerm &&
    this.props.params.searchTerm.match(/magnet:\?xt=urn:[a-z0-9]+:[a-z0-9]{32}/i) != null;

  render() {
    const { loading, details } = this.props;
    return (
      <Layout loading={loading || (details && details.loading)} cast={this.props.cast}>
        {this.getContent()}
      </Layout>
    );
  }
}
