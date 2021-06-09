import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchStart, fetchSuccess, fetchFail, getPerson }  from './../actions';

const Country = (props) => {
  const { country, isFetching, error } = props;
  useEffect(() => {
    props.dispatch(getPerson());
  }, []);

  const handleClick = () => {
    props.dispatch(getCountry());
  }

  if (error) {
    return <h2>We got an error: {error}</h2>;
  }

  if (isFetching) {
    return <h2>Fetching country for ya!</h2>;
  }

  return (
    <>
      <div>
        <h2>Country: {country.name}</h2>
        <img src={country.flag}/>
      </div>
      <button onClick={handleClick}>Get new country</button>
    </>
  );
};

const mapStateToProps = state => {
  return {
    country: state.country,
    isFetching: state.isFetching,
    error: state.error
  };
};

export default connect(mapStateToProps)(Country);