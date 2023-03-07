import { useState } from "react";


const AddRecord = ({ onAdd, eventId }) => {
  const [pee, setPee] = useState(false);
  const [poo, setPoo] = useState(false);
  //const [reminder,setReminder] = useState(false)


  const onSubmit = (e) => {
    console.log("_id: " + eventId);
    e.preventDefault();
    onAdd({ "eventId": eventId,pee,poo });
    setPee(false);
    setPoo(false);
    //setReminder(false)
  };

  return (
   
     <form className="add-form" onSubmit={onSubmit}>


      {/* <div className="form-control" type='checkbox' checked={reminder} value={reminder} onChange={(e)=>setReminder(e.currentTarget.checked)}>
        <label>Set Reminder</label>
        <input type="checkbox" />
      </div>
      <input type="submit" value='Submit' className="btn-block"/> */}


      <div className="form-title">
        <h1>POO/PEE RECORD</h1>
      </div>
      <div className="form-control">
        <label>PEE</label>
        <input
          type="checkbox"
          name="pee"
          value= {pee}
          onChange={(e) => setPee(e.target.checked)}
        />  
      </div>
    
      <div className="form-control">
        <label>POO</label>
        <input 
          type="checkbox"
          name="poo"
          value={poo}
          onChange={(e) => setPoo(e.target.checked)}
        />
      </div>
      <input type="submit" value="Submit" className="btn-block" />
    </form> 
    
  );
};

export default AddRecord;
