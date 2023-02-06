import { createRoot } from "react-dom/client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar } from "react-calendar";
import DateRangeIcon from "@mui/icons-material/DateRange";
import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles/globals.scss";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/router";
import { SnackbarProvider } from "notistack";
import useWindowSize from "../hooks/useWindowSize";

export default function App({ Component, pageProps }) {
  const [upcomingWebinars, setUpcomingWebinars] = useState([]);
  const [pastWebinars, setPastWebinars] = useState([]);
  const [liveWebinars, setLiveWebinars] = useState([]);
  const [featuredWebinar, setFeaturedWebinar] = useState({});
  const [openCalendar, setOpenCalendar] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const router = useRouter();

  const width = useWindowSize();

  useEffect(() => {
    const getUpcomingWebinars = async () => {
      try {
        const res = await axios.get(
          "https://newraq.raqamyat.com/public/api/webinars",
          {
            params: {
              type: "upcomming",
            },
          }
        );
        if (res.status === 200) {
          setUpcomingWebinars(await res.data?.data?.data);
          if (res.data?.data?.current_page < res.data?.data?.last_page) {
            for (let i = 2; i <= res.data?.data?.last_page; i++) {
              const res2 = await axios.get(
                "https://newraq.raqamyat.com/public/api/webinars",
                {
                  params: {
                    page: i,
                    type: "upcomming",
                  },
                }
              );
              if (res2?.status === 200) {
                const toBeAddedWebinars = await res2?.data?.data?.data;
                setUpcomingWebinars((prev) => [...prev, ...toBeAddedWebinars]);
              }
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    const getPastWebinars = async () => {
      try {
        const res = await axios.get(
          "https://newraq.raqamyat.com/public/api/webinars",
          {
            params: {
              type: "past",
            },
          }
        );
        if (res.status === 200) {
          setPastWebinars(await res.data?.data?.data);
          if (res.data?.data?.current_page < res.data?.data?.last_page) {
            for (let i = 2; i <= res.data?.data?.last_page; i++) {
              const res2 = await axios.get(
                "https://newraq.raqamyat.com/public/api/webinars",
                {
                  params: {
                    page: i,
                    type: "past",
                  },
                }
              );
              if (res2?.status === 200) {
                const toBeAddedWebinars = await res2?.data?.data?.data;
                setPastWebinars((prev) => [...prev, ...toBeAddedWebinars]);
              }
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUpcomingWebinars();
    getPastWebinars();
  }, []);

  useEffect(() => {
    const live = upcomingWebinars?.filter((webinar) => {
      return moment().isBetween(
        moment(webinar?.date, "DD-MM-YYYY hh:mm:ss"),
        moment(webinar?.date, "DD-MM-YYYY hh:mm:ss").add(1, "h"),
        "h"
      );
    });
    if (live?.length > 0) {
      setLiveWebinars(live);
    }
    setUpcomingWebinars(
      upcomingWebinars?.filter((webinar) => {
        return !moment().isBetween(
          moment(webinar?.date, "DD-MM-YYYY hh:mm:ss"),
          moment(webinar?.date, "DD-MM-YYYY hh:mm:ss").add(1, "h"),
          "h"
        );
      })
    );
  }, [upcomingWebinars]);

  useEffect(() => {
    
  }, [liveWebinars]);

  useEffect(() => {
    const live = pastWebinars?.filter((webinar) => {
      return moment().isBetween(
        moment(webinar?.date, "DD-MM-YYYY hh:mm:ss"),
        moment(webinar?.date, "DD-MM-YYYY hh:mm:ss").add(1, "h"),
        "h"
      );
    });

    if (live?.length > 0) {
      setLiveWebinars(live);
    }
    setPastWebinars(
      pastWebinars?.filter((webinar) => {
        return !moment().isBetween(
          moment(webinar?.date, "DD-MM-YYYY hh:mm:ss"),
          moment(webinar?.date, "DD-MM-YYYY hh:mm:ss").add(1, "h"),
          "h"
        );
      })
    );
  }, [pastWebinars]);

  useEffect(() => {
    if (liveWebinars?.length > 0) {
      setFeaturedWebinar({ ...liveWebinars[0], type: "live" });
    } else if (upcomingWebinars?.length > 0) {
      setFeaturedWebinar({ ...upcomingWebinars[0], type: "upcoming" });
    } else if (pastWebinars?.length > 0) {
      setFeaturedWebinar({
        ...pastWebinars[pastWebinars?.length - 1],
        type: "past",
      });
    }
    markDays();
  }, [upcomingWebinars, pastWebinars, liveWebinars]);

  useEffect(() => {
    if (width > 820) {
      setOpenCalendar(true);
    }
  }, [width]);

  const markDays = () => {
    const days = document.getElementsByClassName(
      "react-calendar__month-view__days__day"
    );
    for (let b = 0; b < upcomingWebinars?.length; b++) {
      for (let c = 0; c < days.length; c++) {
        if (
          moment(days[c]?.firstChild?.ariaLabel, "MMMM D[,] YYYY").format(
            "DD-MM-YYYY"
          ) ===
          moment(upcomingWebinars[b]?.date, "DD-MM-YYYY").format("DD-MM-YYYY")
        ) {
          const a = document.createElement("span");
          a.className = "tag";
          a.style.backgroundColor = "#00A4F8";

          const tooltipContainer = document.createElement("div");
          tooltipContainer.style.visibility = "hidden";
          tooltipContainer.className = "tooltipContainer";
          days[c].name = "hasWebinar";
          days[c].autofocus = false;
          days[c].appendChild(a);
          days[c].addEventListener("click", (e) => {
            if (tooltipContainer.style.visibility === "hidden") {
              tooltipContainer.style.visibility = "visible";
            } else {
              tooltipContainer.style.visibility = "hidden";
            }
          });
          if (!days[c].querySelector(".tooltipContainer")) {
            days[c].appendChild(tooltipContainer);
          }
          const root = createRoot(tooltipContainer);
          root.render(
            <Link
              className="tooltip"
              href={`/webinars/${upcomingWebinars[b]?.slug}`}
            >
              <div className="tooltipStatus">
                <span style={{ backgroundColor: "#00A4F8" }} />
                <div>Upcoming Webinar</div>
              </div>
              <div className="tooltiDateAndTime">
                <DateRangeIcon
                  className="icon"
                  fontSize="14px"
                  htmlColor="#707070"
                />
                <div className="date">
                  {moment(upcomingWebinars[b]?.date, "DD-MM-YYYY").format(
                    "DD MMM[.] YYYY"
                  )}
                </div>
                |
                <div className="time">
                  {moment(
                    upcomingWebinars[b]?.date,
                    "DD-MM-YYYY hh:mm:ss"
                  ).format("hh[:]mm A")}
                </div>
              </div>
              <div className="tooltipTitle">{upcomingWebinars[b]?.name}</div>
            </Link>
          );
        }
      }
    }
    for (let b = 0; b < pastWebinars?.length; b++) {
      for (let c = 0; c < days.length; c++) {
        if (
          moment(days[c]?.firstChild?.ariaLabel, "MMMM D[,] YYYY").format(
            "DD-MM-YYYY"
          ) === moment(pastWebinars[b]?.date, "DD-MM-YYYY").format("DD-MM-YYYY")
        ) {
          const a = document.createElement("span");
          a.className = "tag";
          a.style.backgroundColor = "#707070";

          const tooltipContainer = document.createElement("div");
          tooltipContainer.style.visibility = "hidden";
          tooltipContainer.className = "tooltipContainer";
          days[c].name = "hasWebinar";
          days[c].autofocus = false;
          days[c].appendChild(a);
          days[c].addEventListener("click", (e) => {
            if (tooltipContainer.style.visibility === "hidden") {
              tooltipContainer.style.visibility = "visible";
            } else {
              tooltipContainer.style.visibility = "hidden";
            }
          });
          if (!days[c].querySelector(".tooltipContainer")) {
            days[c].appendChild(tooltipContainer);
          }
          const root = createRoot(tooltipContainer);
          root.render(
            <Link
              className="tooltip"
              href={`/webinars/${pastWebinars[b]?.slug}`}
            >
              <div className="tooltipStatus">
                <span style={{ backgroundColor: "#707070" }} />
                <div>Past Webinar</div>
              </div>
              <div className="tooltiDateAndTime">
                <DateRangeIcon
                  className="icon"
                  fontSize="14px"
                  htmlColor="#707070"
                />
                <div className="date">
                  {moment(pastWebinars[b]?.date, "DD-MM-YYYY").format(
                    "DD MMM[.] YYYY"
                  )}
                </div>
                |
                <div className="time">
                  {moment(pastWebinars[b]?.date, "DD-MM-YYYY hh:mm:ss").format(
                    "hh[:]mm A"
                  )}
                </div>
              </div>
              <div className="tooltipTitle">{pastWebinars[b]?.name}</div>
            </Link>
          );
        }
      }
    }
    for (let b = 0; b < liveWebinars?.length; b++) {
      for (let c = 0; c < days.length; c++) {
        if (
          moment(days[c]?.firstChild?.ariaLabel, "MMMM D[,] YYYY").format(
            "DD-MM-YYYY"
          ) === moment(liveWebinars[b]?.date, "DD-MM-YYYY").format("DD-MM-YYYY")
        ) {
          const a = document.createElement("span");
          a.className = "tag";
          a.style.backgroundColor = "#FF3939";

          const tooltipContainer = document.createElement("div");
          tooltipContainer.style.visibility = "hidden";
          tooltipContainer.className = "tooltipContainer";
          days[c].name = "hasWebinar";
          days[c].autofocus = false;
          days[c].appendChild(a);
          days[c].addEventListener("click", (e) => {
            if (tooltipContainer.style.visibility === "hidden") {
              tooltipContainer.style.visibility = "visible";
            } else {
              tooltipContainer.style.visibility = "hidden";
            }
          });
          if (!days[c].querySelector(".tooltipContainer")) {
            days[c].appendChild(tooltipContainer);
          }
          const root = createRoot(tooltipContainer);
          root.render(
            <Link
              className="tooltip"
              href={`/webinars/${liveWebinars[b]?.slug}`}
            >
              <div className="tooltipStatus">
                <span style={{ backgroundColor: "#FF3939" }} />
                <div>Live Webinar</div>
              </div>
              <div className="tooltiDateAndTime">
                <DateRangeIcon
                  className="icon"
                  fontSize="14px"
                  htmlColor="#707070"
                />
                <div className="date">
                  {moment(liveWebinars[b]?.date, "DD-MM-YYYY").format(
                    "DD MMM[.] YYYY"
                  )}
                </div>
                |
                <div className="time">
                  {moment(liveWebinars[b]?.date, "DD-MM-YYYY hh:mm:ss").format(
                    "hh[:]mm A"
                  )}
                </div>
              </div>
              <div className="tooltipTitle">{liveWebinars[b]?.name}</div>
            </Link>
          );
        }
      }
    }
  };

  return (
    <>
      <div
        style={{
          backgroundColor: router.asPath === "/apply" ? "#EAF3FF" : "white",
          scale:
            width > 768 ? (width / 1920).toString() : (width / 768).toString(),
        }}
        className="app"
      >
        <SnackbarProvider>
          <Head>
            <title>Raqamyat Webinars</title>
            <meta
              name="description"
              content="If you’re looking for knowledge, then you've arrived at the right place. Here you will find all of our recorded webinars with eCommerce specialists from around the globe to watch whenever you wish."
            />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
            ></link>
          </Head>
          <Header
            searchModalOpen={searchModalOpen}
            setSearchModalOpen={setSearchModalOpen}
            featuredWebinar={featuredWebinar}
            pastWebinars={pastWebinars}
            upcomingWebinars={upcomingWebinars}
            liveWebinars={liveWebinars}
          />
          <div className="outlet">
            <Component
              featuredWebinar={featuredWebinar}
              pastWebinars={pastWebinars}
              upcomingWebinars={upcomingWebinars}
              liveWebinars={liveWebinars}
              {...pageProps}
            />
          </div>
          <Footer />
        </SnackbarProvider>
      </div>
      <div
        style={{
          display:
            (router.asPath === "/") & !searchModalOpen ? "block" : "none",
          scale:
            width > 768 ? (width / 1920).toString() : (width / 768).toString(),
          visibility: openCalendar ? "visible" : "hidden",
          bottom: openCalendar ? "100px" : "-477px",
          opacity: openCalendar ? 1 : 0,
        }}
        className="calendar"
      >
        <div className="calendarTitle">
          <div>
            <span style={{ backgroundColor: "#707070" }} />
            <div>Past</div>
          </div>
          <div>
            <span style={{ backgroundColor: "#FF3939" }} />
            <div>Live</div>
          </div>
          <div>
            <span style={{ backgroundColor: "#00A4F8" }} />
            <div>Upcoming</div>
          </div>
        </div>
        <Calendar
          onActiveStartDateChange={markDays}
          calendarType="Hebrew"
          formatShortWeekday={(locale, date) => moment(date).format("dd")}
          nextLabel={<img className="navIcon" src="/img/next.svg" alt="next" />}
          prevLabel={<img className="navIcon" src="/img/prev.svg" alt="prev" />}
        />
      </div>
      <div
        style={{
          display:
            (router.asPath === "/") & !searchModalOpen ? "block" : "none",
          scale:
            width > 768 ? (width / 1920).toString() : (width / 768).toString(),
        }}
        className="calendarBtn"
        onClick={() => setOpenCalendar(!openCalendar)}
      >
        <div className="left">
          <DateRangeIcon className="calendarIcon" htmlColor="#00A4F8" />
        </div>

        <div className="right">Webinars Calendar</div>
      </div>
    </>
  );
}
