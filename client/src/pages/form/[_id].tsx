import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import AddRecord from '../../../components/AddRecord';

type Location = {
  eventId: string;
  coordinates: [number, number];
};

type ImageData = {
  secure_url: string;
};

const form = () => {
  const router = useRouter();
  const { _id } = router.query as { _id: string };

  const addRecord = async (record: Record<string, any>) => {
    try {
      const response = await fetch('http://localhost:3001/records', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(record),
      });
      const result = await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  const [location, setLocation] = useState<Location>({
    eventId: '',
    coordinates: [0, 0],
  });

  useEffect(() => {
    const postLocation = async () => {
      const locationServer = await addLocation(location);
    };
    if (JSON.stringify(location) !== '{}') postLocation();
  }, [location]);

  const fetchLocation = async () => {
    const res = await fetch(`http://localhost:3001/locations/${_id}`);
    const data = await res.json();

    return data;
  };

  const addLocation = async (location: Location) => {
    try {
      const response = await fetch('http://localhost:3001/locations', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(location),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const startTracking = () => {
    navigator.geolocation.watchPosition(
      (data) => {
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
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
  const [uploadData, setUploadData] = useState<ImageData | undefined>(
    undefined
  );

  const handleOnChange = (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent: ProgressEvent<FileReader>) {
      setImageSrc(onLoadEvent.target?.result as string);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  };

  const addImage = async (image: ImageData, eventId: string) => {
    try {
      const response = await fetch('http://localhost:3001/images', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ image, eventId }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <title>Walky Doggy | walk form</title>
      </Head>
      <p>walk: {_id}</p>
      <div className='addform'>
        <AddRecord onAdd={addRecord} eventId={_id} />
      </div>

      <div className='gpsouter'>
        <div className='gpsbutton'>
          <div>
            <label className='gpslabel'>GPS TRACKING</label>
          </div>
          <button
            id='start'
            className='btn-record'
            onClick={() => startTracking()}
          >
            Start
          </button>
          <button
            id='stop'
            className='btn-record'
            onClick={() => stopTracking()}
          >
            Stop
          </button>
        </div>
      </div>
      <div className='upload-container-outer'>
        <div className='upload-container'>
          <form className='upload-form' method='post'>
            <div>
              <label className='uploadlabel'>Upload Photo</label>
            </div>
            <p>
              <input type='file' name='file' />
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
