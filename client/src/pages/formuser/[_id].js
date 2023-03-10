import { useRouter } from "next/router";
import Head from "next/head";
//import { useState, useEffect,useRef } from "react";
import styles from "@/styles/Home.module.css";
import Image from "next/image";
//import mapboxgl from "mapbox-gl";
//import "./mapbox-gl/dist/mapbox-gl.css";
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
//import { env } from "eslint-config-next";




const formuser = () => {
  const router = useRouter();
  const { _id } = router.query;
  const [records, setRecords] = useState([]);
  const [images, setImages] = useState(() => []);

  

  /*getting record*/
  useEffect(() => {
    const getRecords = async () => {
      const eventRecords = await fetchEventRecords();
      setRecords(eventRecords);
    };
    getRecords();
  }, []);

  const fetchEventRecords = async () => {
    const res = await fetch(`http://localhost:3001/records/${_id}`);
    const data = await res.json();

    return data;
  };

  /* getting image*/

  useEffect(() => {
    const getImages = async () => {
      const eventImages = await fetchEventImages();
      setImages(eventImages);
    };
    getImages();
  }, []);
  
  const fetchEventImages = async () => {
    const res = await fetch(`http://localhost:3001/images/${_id}`);
    const data = await res.json();

    return data;
  };

/**fetch location */
const [coordinates, setCoordinates] = useState({});

useEffect(() => {
  const getCoordinates = async () => {
    const coordinatesServer = await fetchCoordinates();
    setCoordinates(coordinatesServer);
  };
  getCoordinates();
}, []);


const fetchCoordinates = async () => {
console.log("before fetch coords: " + _id);
  const res = await fetch(`http://localhost:3001/locations/${_id}`);
  const data = await res.json();
console.log("coordinates " + JSON.stringify(data))
  return data;
};


    /**display gps walkpath */
  // const coordinates = [
  //   [-0.006940,51.479661],
  //   [-0.0068414,51.479601],
  //   [-0.007063,51.479270],
  //   [-0.007278,51.478596],
  //   [-0.006362,51.478533],
  //   [-0.005235,51.478453],
  //   [-0.003830,51.477852],
  //   [-0.001695,51.476990],
  //   [0.000011,51.476275],
  //   [0.000593,51.476169],
  //   [0.002692,51.476795],
  //   [0.004257,51.477416],
  //   [0.004622,51.479577],
  //   [0.001167,51.480064],
  //   [-0.001102,51.480077],
  //   [-0.002100,51.481236],
  //   [-0.003505,51.480725],
  //   [-0.006667,51.479657],
  // ];

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(0);
    const [lat, setLat] = useState(51.4774);
    const [zoom, setZoom] = useState(14);


    useEffect(() => {
      if (map.current) return; // initialize map only once
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [lng, lat],
        zoom: zoom
      });


    map.current.on("load", () => {
      map.current.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: coordinates,
          },
        },
      });
      map.current.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#888",
          "line-width": 8,
        },
      });
    });
  });

  return (
    <>
      <Head>
        <title>Walky Doggy | view walk</title>
      </Head>
      <p>walk: {_id}</p>
      <h1 className={styles.title}>Walk Record</h1>

      <div className="record-div-outer">
        <div className="record-div">
        <label>POO: {records[0]?.poo.toString()} </label>
        <label>PEE: {records[0]?.pee.toString()} </label>
        </div>
      </div>

      <div className="walk-path-outer">
        
        <div className="walk-path">
        

          <div>
            <h2 className="h2-walk">Walk Path</h2>
            <div>
              <div ref={mapContainer} className="map-container" />
          </div>


          </div>
          {/* <Image src="/mock-gps-path.png" width="420" height="280" /> */}
        </div>
      </div>

      <div className="imgs-container">
        {images.map((image) => {
          return (
            <div>
              <ul>
                <li key={image._id}>
                  <img src={image.url} width="237.6" height="336.8" />
                </li>
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default formuser;
