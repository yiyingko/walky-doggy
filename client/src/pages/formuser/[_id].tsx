import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import Image from 'next/image';
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl';
import { clearStorage } from 'mapbox-gl';
import * as ApiService from '../../service/ApiService';
import { getWalk } from '../../Service/api';

type Image = {
  _id: string;
  url: string;
};

type Record = {
  poo: boolean;
  pee: boolean;
};

const Formuser = () => {
  const router = useRouter();
  const { _id } = router.query;
  const [records, setRecords] = useState<Record[]>([]);
  const [images, setImages] = useState(() => []);
  const [event, setEvent] = useState();

  const fetchEventRecords = async () => {
    const res = await fetch(`http://localhost:3001/records/${_id}`);
    const data = await res.json();
    return data;
  };

  /* getting image*/

  useEffect(() => {
    const getImages = async () => {
      const eventImages = await fetchEventImages;
      setImages(eventImages);
    };
    getImages();
  }, []);

  const fetchEventImages = ApiService.getImage(images);

  /**fetch location */
  // const [coordinates, setCoordinates] = useState({});

  // useEffect(() => {
  // 	const getCoordinates = async () => {
  // 		const coordinatesServer = await fetchCoordinates;
  // 		setCoordinates(coordinatesServer);
  // 	};
  // 	getCoordinates();
  // }, []);

  // const fetchCoordinates = ApiService.getCoordinates(_id);

  // const mapContainer = useRef(null);
  // const map = useRef(null);
  // const [lng, setLng] = useState(0);
  // const [lat, setLat] = useState(51.4774);
  // const [zoom, setZoom] = useState(14);

  /*getting record*/
  useEffect(() => {
    const getRecords = async () => {
      const eventRecords = await fetchEventRecords();
      setRecords(eventRecords);
    };
    getRecords();
  }, []);

  //   useEffect(() => {
  //     if (map.current) return; // initialize map only once
  //     map.current = new mapboxgl.Map({
  //       container: mapContainer.current,
  //       style: 'mapbox://styles/mapbox/streets-v12',
  //       center: [lng, lat],
  //       zoom: zoom
  //     });

  //   map.current.on("load", () => {
  //     map.current.addSource("route", {
  //       type: "geojson",
  //       data: {
  //         type: "Feature",
  //         properties: {},
  //         geometry: {
  //           type: "LineString",
  //           coordinates: coordinates,
  //         },
  //       },
  //     });
  //     map.current.addLayer({
  //       id: "route",
  //       type: "line",
  //       source: "route",
  //       layout: {
  //         "line-join": "round",
  //         "line-cap": "round",
  //       },
  //       paint: {
  //         "line-color": "#888",
  //         "line-width": 8,
  //       },
  //     });
  //   });
  // });

  return (
    <>
      <Head>
        <title>Walky Doggy | view walk</title>
      </Head>
      <p>walk: {_id}</p>
      <h1 className={styles.title}>Walk Record</h1>

      <div className='record-div-outer'>
        <div className='record-div'>
          <label>POO: {records[0]?.poo.toString()} </label>
          <label>PEE: {records[0]?.pee.toString()} </label>
        </div>
      </div>

      {/* <div className="walk-path-outer">
				<div className="walk-path">
					<div>
						<h2 className="h2-walk">Walk Path</h2>
						<div>
							<div ref={mapContainer} className="map-container" />
						</div>
					</div>
					<Image src="/mock-gps-path.png" width="420" height="280" />
				</div>
			</div> */}

      <div className='imgs-container'>
        {images &&
          images.map((image: Image) => (
            <img key={image._id} src={image.url} width='237.6' height='336.8' />
          ))}
      </div>
    </>
  );
};

export default Formuser;
