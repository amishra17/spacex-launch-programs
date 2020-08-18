import fs from 'fs';
import path from 'path';

import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';

import axios from 'axios';

require("@babel/register");

import App from '../client/App';

const PORT = process.env.PORT || 8000;
const app = express();

app.get('/', (req, res) => {
    const { launchYear, launchSuccess, landSuccess } = req.query;
    const api = `https://api.spaceXdata.com/v3/launches`;
    const params = {
        limit: 100,
        launch_success: launchSuccess || true
    }
    if(launchYear) params.launch_year  = launchYear;
    if(landSuccess) params.land_success  = landSuccess;

    axios.get(api, {
      params: {
          ...params
      },
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
          const app = ReactDOMServer.renderToString(<App programList={programs}/>);
  
          const indexFile = path.resolve(__dirname, '../..', 'dist/index.html');
          fs.readFile(indexFile, 'utf8', (err, data) => {
            if (err) {
              console.error('Something went wrong:', err);
              return res.status(500).send('Oops, better luck next time!');
            }
        
            return res.send(
              data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
            );
          });
      }
  ).catch(err => {
        console.error('Something went wrong:', err);
        return res.status(500).send('Oops, better luck next time!');
    })
  });
  
  app.use(express.static(path.resolve(__dirname, '../..', 'dist/static')))
  
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });