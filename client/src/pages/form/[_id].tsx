import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import AddRecord from '../../components/AddRecord';
import * as ApiService from '../../service/ApiService';

type Location = {
  eventId: string;
  coordinates: [number, number];
};

type ImageData = {
  secure_url: string;
};

const Form = () => {
  const router = useRouter();
  const { _id } = router.query as { _id: string };

  const addRecord = ApiService.addRecord;
  const [location, setLocation] = useState<Location>({
    eventId: '',
    coordinates: [0, 0],
  });

  const addLocation = ApiService.addLocation(location);

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

  useEffect(() => {
    const postLocation = async () => {
      const locationServer = await addLocation;
    };
    if (JSON.stringify(location) !== '{}') postLocation();
  }, [location]);

  return (
    <>
      <Head>
        <title>Walky Doggy | walk form</title>
      </Head>
      <p>walk: {_id}</p>
      <div className='addform' data-testid='add-record'>
        <AddRecord eventId={_id} />
      </div>
    </>
  );
};

export default Form;
