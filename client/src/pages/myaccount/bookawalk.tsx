import Head from 'next/head';
import AddEvent from '../../../components/AddEvent';

const Bookawalk = () => {
  return (
    <>
      <Head>
        <title>Walky Doggy | book a walk</title>
      </Head>
      <div className='container'>
        <AddEvent />
      </div>
    </>
  );
};

export default Bookawalk;
