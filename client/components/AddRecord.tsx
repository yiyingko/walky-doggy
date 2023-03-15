import { useState } from 'react';
import * as ApiService from '../src/service/ApiService';

type AddRecordProps = {
  eventId: string;
};

const AddRecord = ({ eventId }: AddRecordProps) => {
  const [pee, setPee] = useState(false);
  const [poo, setPoo] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    ApiService.addRecord({ eventId, pee, poo });
    setPee(false);
    setPoo(false);
  };

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className='submit-form-title'>
        <h1>POO/PEE RECORD</h1>
      </div>
      <div>
        <div>
          <div className='submit-form-control'>
            <label className='adjustfont'>PEE</label>
            <input
              type='checkbox'
              name='pee'
              checked={pee}
              onChange={(e) => setPee(e.target.checked)}
            />
          </div>
          <div>
            <div className='submit-form-control'>
              <label>POO</label>
              <input
                type='checkbox'
                name='poo'
                checked={poo}
                onChange={(e) => setPoo(e.target.checked)}
              />
            </div>
          </div>
        </div>
        <div className='submit-div'>
          <input type='submit' value='Submit' className='btn-record' />
        </div>
      </div>
    </form>
  );
};

export default AddRecord;
