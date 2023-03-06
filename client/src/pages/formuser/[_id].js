import { useRouter } from "next/router";
import Head from "next/head";
import { useState, useEffect } from "react";

const formuser = () => {
    const router = useRouter();
    const { _id } = router.query;

    const [images, setImages] = useState(() =>[]);

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

  return (
    <>
      <Head>
        <title>Walky Doggy | view walk</title>
      </Head>
      <div>view walk </div>

      {images.map(image => {
              return (
                <li key={image.id}>
                  <img src={image.url} width="200" height="120"/>
                </li>
              )
            })}
    </>
  );
};

export default formuser;
