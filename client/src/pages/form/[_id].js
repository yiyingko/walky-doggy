import { useRouter } from "next/router";
import Head from "next/head";
import { useState } from "react";
import AddRecord from "../../../components/AddRecord";

const form = () => {
  const router = useRouter();
  const { _id } = router.query;

/**record */
const [record, setRecord] = useState(false);

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
    }).then(result => console.log("savedRecords: " + JSON.stringify(result)));
  
  };


/* collect geo location data*/
  
  const coordinates =[];
  const startTracking = ()=> {

    navigator.geolocation.watchPosition(
      data=>{
        console.log(data);
        coordinates.push([data.coords.longitude,data.coords.latitude]);
        window.localStorage.setItem("coordinates",JSON.stringify(coordinates));
      },
      error => console.log(error),{
        enableHighAccuracy: true
      }
    );
  }

  const stopTracking = ()=>{
    return;
  }

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
    const fileInput = Array.from(form.elements).find(({ name }) => name === "file");

    const formData = new FormData();

    for (const file of fileInput.files) {formData.append("file", file);}

    formData.append("upload_preset", "walk-history");

    const data = await fetch(
      "https://api.cloudinary.com/v1_1/dk8ihjq0m/image/upload",

      {
        method: "POST",
        body: formData,
      }
    ).then((res) => res.json());

    setImageSrc(data.secure_url);
    setUploadData(data);
    console.log("event: " + _id);
    addImage(data,_id);
  };

  const addImage = async (data,id) => {
    fetch("http://localhost:3001/images", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({eventId: id, url: data.secure_url}),
    }).then((res) => console.log("res: " + JSON.stringify(res)));
  };


  return (
    <>
      <Head>
        <title>Walky Doggy | walk form</title>
      </Head>

      <div>my account </div>
      <p>walk: {_id}</p>

      <AddRecord onAdd={addRecord} eventId={_id} />
      
      <button id="start" onClick={() => startTracking()}>Start</button>
      <button id="stop" onClick={() => stopTracking()}>Stop</button>
     
      <div className="upload-container">
      <form
        className="upload-form"
        method="post"
        onChange={handleOnChange}
        onSubmit={handleOnSubmit}
      >
        <label>Upload Photo</label>
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
    </>
  );
};

export default form;
