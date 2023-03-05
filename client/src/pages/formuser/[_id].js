import { useRouter } from 'next/router'
import Head from 'next/head';

const formuser = () => {
  
    const router = useRouter();
    console.log("router.query: " + JSON.stringify(router.query));
    const { _id } = router.query

  //  const [events, setEvents] = useState(() =>[]);
  
    // useEffect(() => {
    //   const getEvents = async () => {
    //     const eventsServer = await fetchWalk();
    //     setEvents(eventsServer);
    //   };
    //   getEvents();
    // }, []);

    // const fetchWalk = async (_id) => {
    //   await fetch(`http://localhost:3001/events/${_id}`, {
    //     method: "GET",
    //   }).then(()=> {
    //     console.log("get event: " + JSON.stringify(fetchWalk));
    //     setEvents(events.filter((event) => event._id !== _id));
    //   });
    // }

    return (
      <>
        <Head>
          <title>Walky Doggy | walk form</title>
        </Head>
  
        <div>my account USER</div>
        <p>walk: {_id}</p>
        
      </>
    );
  };
  
  export default formuser;
  