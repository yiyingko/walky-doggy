import { useRouter } from "next/router";
import Head from "next/head";
import { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const formuser = () => {
  const router = useRouter();
  const { _id } = router.query;
  const [records, setRecords] = useState([]);
  const [images, setImages] = useState(() => []);

  /*getting record*/

  // const getRecords = async () => {
  //   const eventRecords = await fetchEventRecords().then((res)=> setRecords(res));
  // setRecords(eventRecords);
  // console.log("from server: " + JSON.stringify(eventRecords));
  // console.log(eventRecords);
  // };
  const fetchEventRecords = async () => {
    const res = await fetch(
      `http://localhost:3001/records/64067493de0dec5a40643aa7`
    )
      .then((res) => res.json())
      .then((res) => setRecords(res));
  };

  useEffect(() => {
    fetchEventRecords();
    // getRecords().then(data => console.log("record: " + JSON.stringify(records)));
    // getRecords();
  }, []);

  console.log(records, "records");
  console.log(records[0]?.poo);

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

  //   //   /**display gps walkpath */
  //   const coordinates = [
  //     [-122.483696, 37.833818],
  //     [-122.483482, 37.833174],
  //     [-122.483396, 37.8327],
  //     [-122.483568, 37.832056],
  //     [-122.48404, 37.831141],
  //     [-122.48404, 37.830497],
  //     [-122.483482, 37.82992],
  //     [-122.483568, 37.829548],
  //     [-122.48507, 37.829446],
  //     [-122.4861, 37.828802],
  //     [-122.486958, 37.82931],
  //     [-122.487001, 37.830802],
  //   ];

  //   //  /**dont forget to put it to env!!!!!!!! */

  //   mapboxgl.accessToken =
  //     "pk.eyJ1IjoieWl5aW5na28iLCJhIjoiY2xld3h3aGJ5MGl6ZDN5czhzaW5pb3RrZyJ9.rWPT9Mi9zowm8bMrTx0ktg";
  //   const map = new mapboxgl.Map({
  //     container: "map",
  //     style: "mapbox://styles/mapbox/streets-v12",
  //     center: [-122.483568, 37.829548],
  //     zoom: 14,
  //   });

  //   map.on("load", () => {
  //     map.addSource("route", {
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
  //     map.addLayer({
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

  return (
    <>
      <Head>
        <title>Walky Doggy | view walk</title>
        {/* <script src="https://api.mapbox.com/mapbox-gl-js/v2.9.1/mapbox-gl.js"></script>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.9.1/mapbox-gl.css"
          rel="stylesheet" */}
        {/* /> */}
      </Head>
      <div>view walk </div>
      <label>POO: {records[0]?.poo.toString()} </label>
      <label>PEE: {records[0]?.pee.toString()} </label>

      <div id="map"></div>

      {images.map((image) => {
        return (
          <li key={image._id}>
            <img src={image.url} width="200" height="120" />
          </li>
        );
      })}
    </>
  );
};

export default formuser;
