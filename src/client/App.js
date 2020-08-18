import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';
import Filter from './components/Filter';
import Programs from './components/Programs';
import './App.css'

export default props => {
    const [ launchYear, setLaunchYear ] = useState(props.launchYear || null);
    const [ launchSuccess, setLaunchSuccess ] = useState(true);
    const [ landSuccess, setLandSuccess ] = useState(null);
    const [programList, setProgramList ] = useState(props.programList || []);
    const [ fetchList, setFetchList ] = useState(false);
    const [ loader, setLoader ] = useState(false);
    
    useEffect(() => {
        const api = `https://api.spaceXdata.com/v3/launches`;
        const params = {
            limit: 100,
            launch_success: launchSuccess
        }
        if(launchYear) params.launch_year  = launchYear;
        if(landSuccess) params.land_success  = landSuccess;

        if(!fetchList) return;
        setLoader(true)
        axios.get(api, {
            params: {
                ...params
            }
        }).then(
            response => {
                const programs = response.data.map(item => ({
                    mission_name : item.mission_name,
                    mission_id : item.mission_id,
                    launch_success: item.launch_success && item.launch_success.toString(),
                    land_success : item.rocket?.first_stage?.cores?.[0]?.land_success && item.rocket.first_stage.cores[0].land_success.toString(),
                    mission_patch_small : item.links?.mission_patch_small,
                    launch_year : item.launch_year
                }))
                setProgramList(programs);
                setLoader(false)
            }
        )
        setFetchList(false);
    });

    const filterChangeHandler = (type, value) => {
        switch(type) {
            case 'launchYear':
                if(launchYear !== value) {
                    setLaunchYear(value)
                    setFetchList(true);
                }
                break;
            case 'launchSuccess':
                if(launchSuccess !== value) {
                    setLaunchSuccess(value);
                    setFetchList(true);
                }
                break;
            case 'landSuccess':
                if(landSuccess !== value) {
                    setLandSuccess(value);
                    setFetchList(true)
                }
                break;
        }
    }

    const renderProgramListHTML = () => {
        const node = document.querySelector('.programs')
        return node && node.innerHTML;
    }
    return(
        <div className="container-fluid">
            <div className="row">
                <Header />
            </div>
            <div className="row">
                <div className="col-md-3">
                    <Filter 
                        filterChangeHandler = {filterChangeHandler}
                        launchYear = {launchYear}
                        launchSuccess = {launchSuccess}
                        landSuccess = {landSuccess}
                    />
                    </div>
                <div className="col-md-8">
                    {
                        loader ? 
                        <div className="loader">
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="spinner-border text-success" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        </div>
                        :
                        programList.length > 0 ? 
                            <Programs programList={programList}/> :
                            <div dangerouslySetInnerHTML={{ __html: renderProgramListHTML()}}></div>
                    }
                </div>
            </div>
            <div className="row">
                <Footer />
            </div>
        </div>
    )
}