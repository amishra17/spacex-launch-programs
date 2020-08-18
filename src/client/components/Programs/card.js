import React from 'react';

const Card = props => {
    const { mission_name, mission_id, launch_year, launch_success, land_success, mission_patch_small } = props
    return(
        <div className="card">
            <img className="card-img-top" src={mission_patch_small} alt={`${mission_name} Patch`} />
            <div className="card-body">
                <div className="row">
                    <div className="col-12 value">{mission_name}</div>
                </div>
                <div className="row">
                    <div className="col-12 label">Mission Ids:</div>
                    <div className="col-12 value">
                        <ul>
                            {
                                mission_id.map(id => (
                                    <li key={id}>{id}</li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6 label">Launch Year :</div>
                    <div className="col-6 value">{launch_year}</div>
                </div>
                <div className="row">
                    <div className="col-6 label">Launch Success: </div>
                    <div className="col-6 value">{launch_success}</div>
                </div>
                <div className="row">
                    <div className="col-6 label">Land Success: </div>
                    <div className="col-6 value">{land_success}</div>
                </div>
            </div>
        </div>
    );
}

export default Card;

