import { useState } from 'react';
import { useRouter } from 'next/router';
import * as ApiService from '../service/ApiService';
import { updateWalk } from '../Service/api';

type AddRecordProps = {
  eventId: string;
};

const AddRecord = ({ eventId }: AddRecordProps) => {
  const [pee, setPee] = useState(false);
  const [poo, setPoo] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [coordinates, setCoordinates] = useState([]);
  const [uploadData, setUploadData] = useState<ImageData | null>(null);
  const router = useRouter();
  const { _id } = router.query

  const addImage = ApiService.addImage(image);

  const handleOnChange = (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent: ProgressEvent<FileReader>) {
      setImage(onLoadEvent.target?.result as string);
      setUploadData(null);
    };
    reader.readAsDataURL(changeEvent.target.files[0]);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let info = {
      records: {
        pee: pee,
        poo: poo
      },
      image: image
    }
    updateWalk(_id, info)
    setPee(false);
    setPoo(false);
    setImage('');
  };

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <h1 className='submit-form-title'>POO/PEE RECORD</h1>
      <div className='pee-poo'>
        <div className='checkbox-pp submit-form-control'>
          <label className='adjustfont'>PEE</label>
          <input
            className='checkbox'
            type='checkbox'
            name='pee'
            checked={pee}
            onChange={(e) => setPee(e.target.checked)}
          />
        </div>
        <div className='checkbox-pp submit-form-control'>
          <label className='adjustfont'>POO</label>
          <input
            className='checkbox'
            type='checkbox'
            name='poo'
            checked={poo}
            onChange={(e) => setPoo(e.target.checked)}
          />
        </div>
      </div>
      <div className='gps-track'>
        <label className='gpslabel'>GPS TRACKING</label>
        <div className='gps-buttons'>
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
      <div className='upload-image'>
        <label className='uploadlabel' htmlFor='upimage'>
          Upload Photo
        </label>
        <input type='file' name='file' id='upimage' onChange={handleOnChange} />
        <img className='img-preview' src={image} />
        {image && !uploadData && <button>Upload Files</button>}
        {uploadData && (
          <code>
            <pre>{JSON.stringify(uploadData, null, 2)}</pre>
          </code>
        )}
      </div>
      <div className='button-record'>
        <input type='submit' value='Submit' className='btn-record' />
      </div>
    </form>
  );
};

export default AddRecord;
