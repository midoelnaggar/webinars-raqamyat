import { useEffect, useState } from "react"
import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles/globals.scss";
import axios from "axios";
import moment from "moment";



export default function App({ Component, pageProps }) {
  const [webinars, setWebinars] = useState([]);
  const [upcomingWebinars, setUpcomingWebinars] = useState([]);
  const [pastWebinars, setPastWebinars] = useState([]);
  const [featuredWebinar, setFeaturedWebinar] = useState({});

  useEffect(() => {
    const getWebinars = async () => {
      try {
        const res = await axios.get(
          "https://newraq.raqamyat.com/public/api/webinars"
        );
        if (res.status === 200) {
          setWebinars(await res.data?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getWebinars();
  }, []);

  useEffect(() => {
    setUpcomingWebinars(
      webinars?.filter((webinar) => {
        return moment(moment(webinar?.date, "DD-MM-YYYY")).isAfter(moment());
      })
    );
    setPastWebinars(
      webinars?.filter((webinar) => {
        return moment(moment(webinar?.date, "DD-MM-YYYY")).isBefore(moment());
      })
    );
    if (upcomingWebinars?.length > 0) {
      setFeaturedWebinar(upcomingWebinars[0]);
    } else if (pastWebinars?.length > 0) {
      setFeaturedWebinar(pastWebinars[pastWebinars?.length - 1]);
    }
  }, [webinars]);

  
  return (
    <div className="app">
      <Head>
        <title>Raqamyat Webinars</title>
        <meta
          name="description"
          content="If you’re looking for knowledge, then you've arrived at the right place. Here you will find all of our recorded webinars with eCommerce specialists from around the globe to watch whenever you wish."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="outlet">
        <Component webinars={webinars} featuredWebinar={featuredWebinar} pastWebinars={pastWebinars} upcomingWebinars={upcomingWebinars} {...pageProps} />
      </div>
      <Footer />
    </div>
  );
}
