import React from 'react';
import './Filter.css';

const years = [ 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020 ]
const Filter = props => {
    const { filterChangeHandler, launchYear, launchSuccess, landSuccess } = props;
    return (
        <div className="filter container">
            <h4>Filters</h4>
            <div className="filter-type">
                Launch Year
                <hr />  
            </div>
            <div className="row">
                {
                    years.map(year => (
                        <div className="col-6 filter-btn-col" key={year}>
                            <button className={`btn filter-btn ${year === launchYear ? 'selected' : '' }`}
                                onClick = {() => filterChangeHandler('launchYear', year)}
                            >
                                {year}
                            </button>
                        </div>
                    ))
                }
            </div>
            <div className="filter-type">
                Successful Launch
                <hr />     
            </div>
            <div className="row">
                <div className="col-6 filter-btn-col">
                    <button className={`btn filter-btn ${launchSuccess === true ? 'selected' : '' }`}
                        onClick = {() => filterChangeHandler('launchSuccess', true)}
                    >
                        True
                    </button>
                </div>
                <div className="col-6 filter-btn-col">
                    <button className={`btn filter-btn ${launchSuccess === false ? 'selected' : '' }`}
                        onClick = {() => filterChangeHandler('launchSuccess', false)}
                    >
                        False
                    </button>
                </div>
            </div>
            <div className="filter-type">
                Successful Landing
                <hr /> 
            </div>
            <div className="row">
                <div className="col-6 filter-btn-col">
                    <button className={`btn filter-btn ${landSuccess === true ? 'selected' : '' }`}
                        onClick = {() => filterChangeHandler('landSuccess', true)}
                    >
                        True
                    </button>
                </div>
                <div className="col-6 filter-btn-col">
                    <button className={`btn filter-btn ${landSuccess === false ? 'selected' : '' }`}
                        onClick = {() => filterChangeHandler('landSuccess', false)}
                    >
                        False
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Filter;