import React from 'react';
import PropTypes from 'prop-types';
import Card from './card';
import './Programs.css';

const Programs = props => {
    return (
        <div className="container programs">
            {
                props.programList.map(program => (
                    <Card { ...program } key={program.mission_name}/>
                ))
            }
        </div>
    )
}


Programs.propTypes = {
    programList: PropTypes.arrayOf(Object)
}

Programs.defaultProps = {
    programList: [
        {
            mission_name: 'RatSat',
            mission_id: [],
            launch_year: '2008',
            launch_success: true,
            land_success: true,
            mission_patch_small: 'https://images2.imgbox.com/a7/b4/bcMrHMey_o.png'
        }
    ]
}
export default Programs