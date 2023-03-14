import { useRouter } from "next/router";
import Head from "next/head";
import { useState ,useEffect} from "react";
import AddRecord from "../../../components/AddRecord";


const form = () => {
  const router = useRouter();
  const { _id } = router.query;

  const fetchRecord = async () => {
    const res = await fetch(`http://localhost:3001/records/${_id}`);
    const data = await res.json();

    return data;
  };

  const addRecord = async (record) => {
    fetch("http://localhost:3001/records", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(record),
    }).then((result) => console.log("savedRecords: " + JSON.stringify(result)));
  };

  const [location, setLocation] = useState({});

  useEffect(() => {
    console.log("useEffect Location: " + JSON.stringify(location));
    const postLocation = async () => {
      const locationServer = await addLocation(location);
    };
    if(JSON.stringify(location) !== "{}") postLocation();
  }, [location]);

  const fetchLocation = async () => {
    const res = await fetch(`http://localhost:3001/locations/${_id}`);
    const data = await res.json();

    return data;
  };
  

  const addLocation = async (location) => {
    fetch("http://localhost:3001/locations", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(location),
    }).then((result) =>
      console.log("savedLocation: " + JSON.stringify(result))
    );
  };


  const startTracking = () => {
    navigator.geolocation.watchPosition(
      (data) => {
        console.log("New Data" + JSON.stringify(data));
        setLocation({
          eventId: _id,
          coordinates: [data.coords.longitude, data.coords.latitude],
        });
      },
      (error) => console.log(error),
      {
        enableHighAccuracy: true,
      }
    );
  };

  const stopTracking = () => {
    return;
  };

  /* img uploader */
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();

  const handleOnChange = (changeEvent) => {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "file"
    );

    const formData = new FormData();

    for (const file of fileInput.files) {
      formData.append("file", file);
    }

    formData.append("upload_preset", "walk-history");

    const data = await fetch( 
     // `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      

      {
        method: "POST",
        body: formData,
      }
    ).then((res) => res.json());

    setImageSrc(data.secure_url);
    setUploadData(data);
    console.log("event: " + _id);
    addImage(data, _id);
  };

  const addImage = async (data, id) => {
    fetch("http://localhost:3001/images", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ eventId: id, url: data.secure_url }),
    }).then((res) => console.log("res: " + JSON.stringify(res)));
  };

  return (
    <>
      <Head>
        <title>Walky Doggy | walk form</title>
      </Head>
      <p>walk: {_id}</p>
      <div className="addform">
        <AddRecord onAdd={addRecord} eventId={_id} />
      </div>

      <div className="gpsouter">
        <div className="gpsbutton">
          <div>
            <label className="gpslabel">GPS TRACKING</label>
          </div>
          <button
            id="start"
            className="btn-record"
            onClick={() => startTracking()}
          >
            Start
          </button>
          <button
            id="stop"
            className="btn-record"
            onClick={() => stopTracking()}
          >
            Stop
          </button>
        </div>
      </div>
      <div className="upload-container-outer">
        <div className="upload-container">
          <form
            className="upload-form"
            method="post"
            onChange={handleOnChange}
            onSubmit={handleOnSubmit}
          >
            <div>
              <label className="uploadlabel">Upload Photo</label>
            </div>
            <p>
              <input type="file" name="file" />
            </p>

            <img src={imageSrc} />

            {imageSrc && !uploadData && (
              <p>
                <button>Upload Files</button>
              </p>
            )}

            {uploadData && (
              <code>
                <pre>{JSON.stringify(uploadData, null, 2)}</pre>
              </code>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default form;
