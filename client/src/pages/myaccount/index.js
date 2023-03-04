import Head from 'next/head'
import Link from 'next/link';


const myaccount = () => {
  return (
    <>
      <Head>
        <title>Walky Doggy | My Account</title>
      </Head>

      <div>my account </div>
      <Link href="/myaccount/bookawalk">Book a walk</Link>
      <Link href="/myaccount/viewwalks">View My Walk History</Link>


    </>
  );
};

export default myaccount;
