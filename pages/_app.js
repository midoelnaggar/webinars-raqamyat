import { createRoot } from "react-dom/client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar } from "react-calendar";
import { TextField } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
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
import { ScaleLoader } from "react-spinners";

export default function App({ Component, pageProps }) {
  const [upcomingWebinars, setUpcomingWebinars] = useState([]);
  const [pastWebinars, setPastWebinars] = useState([]);
  const [liveWebinars, setLiveWebinars] = useState([]);
  const [featuredWebinar, setFeaturedWebinar] = useState({});
  const [openCalendar, setOpenCalendar] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [subscribeModalOpen, setSubscribeModalOpen] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [registerForm, setRegisterForm] = useState({});
  const [registeredModalOpen, setRegisteredModalOpen] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [registered, setRegistered] = useState(false);
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
    setUpcomingWebinars(
      upcomingWebinars?.filter((webinar) => {
        return !moment().isBetween(
          moment(webinar?.date, "DD-MM-YYYY hh:mm:ss"),
          moment(webinar?.date, "DD-MM-YYYY hh:mm:ss").add(1, "h")
        );
      })
    );
    setPastWebinars(
      pastWebinars?.filter((webinar) => {
        return !moment().isBetween(
          moment(webinar?.date, "DD-MM-YYYY hh:mm:ss"),
          moment(webinar?.date, "DD-MM-YYYY hh:mm:ss").add(1, "h")
        );
      })
    );
  }, []);

  useEffect(() => {
    const live = upcomingWebinars?.filter((webinar) => {
      return moment().isBetween(
        moment(webinar?.date, "DD-MM-YYYY hh:mm:ss"),
        moment(webinar?.date, "DD-MM-YYYY hh:mm:ss").add(1, "h")
      );
    });
    if (live?.length > 0) {
      setLiveWebinars(live);
    }
  }, [upcomingWebinars]);

  useEffect(() => {
    const live = pastWebinars?.filter((webinar) => {
      return moment().isBetween(
        moment(webinar?.date, "DD-MM-YYYY hh:mm:ss"),
        moment(webinar?.date, "DD-MM-YYYY hh:mm:ss").add(1, "h")
      );
    });
    if (live?.length > 0) {
      setLiveWebinars(live);
    }
  }, [pastWebinars]);

  useEffect(() => {
    if (liveWebinars?.length > 0) {
      setFeaturedWebinar({ ...liveWebinars[0], type: "live" });
    } else if (upcomingWebinars?.length > 0) {
      setFeaturedWebinar({
        ...upcomingWebinars.sort((a, b) => {
          return (
            moment(a?.date, "DD-MM-YYYY hh:mm:ss") -
            moment(b?.date, "DD-MM-YYYY hh:mm:ss")
          );
        })[0],
        type: "upcoming",
      });
    } else if (pastWebinars?.length > 0) {
      setFeaturedWebinar({
        ...pastWebinars.sort((a, b) => {
          return (
            moment(b?.date, "DD-MM-YYYY hh:mm:ss") -
            moment(a?.date, "DD-MM-YYYY hh:mm:ss")
          );
        })[0],
        type: "past",
      });
    }
    markDays();
  }, [upcomingWebinars, pastWebinars, liveWebinars]);

  useEffect(() => {
    if (registeredModalOpen) {
      document.getElementsByClassName("app")[0].style.overflowY = "hidden";
    } else {
      document.getElementsByClassName("app")[0].style.overflowY = "unset";
    }
  }, [registeredModalOpen]);

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
              const hide = (item) => {
                new Promise((resolve) => {
                  resolve((item.style.visibility = "hidden"));
                });
              };
              const hideAllAndShowCurrent = async () => {
                const allToolTipContainers =
                  await document.getElementsByClassName("tooltipContainer");
                for (let item of allToolTipContainers) {
                  await hide(item);
                }
                tooltipContainer.style.visibility = await "visible";
              };
              hideAllAndShowCurrent();
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
            if (tooltipContainer.style.visibility == "hidden") {
              const hideAll = new Promise((resolve) => {
                resolve(() => {
                  const items =
                    document.getElementsByClassName("tooltipContainer");
                  for (let item of items) {
                    item.style.visibility = "hidden";
                    console.log("hidding item");
                  }
                });
              });
              hideAll.then((value) => {
                value();
                tooltipContainer.style.visibility = "visible";
                console.log("make tt visible")
              });
            } else if (tooltipContainer.style.visibility == "visible") {
              tooltipContainer.style.visibility = "hidden";
              console.log("else hide")
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

          const tooltipContainer2 = document.createElement("div");
          tooltipContainer2.style.visibility = "hidden";
          tooltipContainer2.className = "tooltipContainer2";
          days[c].name = "hasWebinar";
          days[c].autofocus = false;
          days[c].appendChild(a);
          days[c].addEventListener("click", (e) => {
            if (tooltipContainer2.style.visibility === "hidden") {
              const hide = (item) => {
                new Promise((resolve) => {
                  resolve((item.style.visibility = "hidden"));
                });
              };
              const hideAllAndShowCurrent = async () => {
                const allToolTipContainers =
                  await document.getElementsByClassName("tooltipContainer");
                for (let item of allToolTipContainers) {
                  await hide(item);
                }
                tooltipContainer2.style.visibility = await "visible";
              };
              hideAllAndShowCurrent();
            } else {
              tooltipContainer2.style.visibility = "hidden";
            }
          });
          if (!days[c].querySelector(".tooltipContainer2")) {
            days[c].appendChild(tooltipContainer2);
          }
          const root = createRoot(tooltipContainer2);
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

  const handleSubscribeButton = () => {
    setSubscribing(true);
    setTimeout(() => {
      setSubscribing(false);
      setSubscribed(true);
    }, 3000);
  };

  return (
    <SnackbarProvider>
      <div
        style={{
          backgroundColor: router.asPath === "/apply" ? "#EAF3FF" : "white",
          scale:
            width > 820 ? (width / 1920).toString() : (width / 412).toString(),
        }}
        className="app"
      >
        <Head>
          <title>Raqamyat Webinars</title>
          <meta
            name="description"
            content="If you’re looking for knowledge, then you've arrived at the right place. Here you will find all of our recorded webinars with eCommerce specialists from around the globe to watch whenever you wish."
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
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
            subscribeModalOpen={subscribeModalOpen}
            setSubscribeModalOpen={setSubscribeModalOpen}
            registeredModalOpen={registeredModalOpen}
            setRegisteredModalOpen={setRegisteredModalOpen}
            registering={registering}
            setRegistered={setRegistered}
            setRegistering={setRegistering}
            {...pageProps}
          />
        </div>
        <Footer />
      </div>
      <div
        style={{
          display:
            (router.asPath === "/") & !searchModalOpen & !subscribeModalOpen
              ? "block"
              : "none",
          scale:
            width > 820 ? (width / 1920).toString() : (width / 412).toString(),
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
            (router.asPath === "/") & !searchModalOpen & !subscribeModalOpen
              ? "block"
              : "none",
          scale:
            width > 820 ? (width / 1920).toString() : (width / 412).toString(),
        }}
        className="calendarBtn"
        onClick={() => setOpenCalendar(!openCalendar)}
      >
        <div className="left">
          <DateRangeIcon className="calendarIcon" htmlColor="#00A4F8" />
        </div>

        <div className="right">Webinars Calendar</div>
      </div>
      <div
        className="subscribingModal"
        style={
          subscribeModalOpen
            ? {visibility:"visible",opacity:"1"}
            : {
              visibility:"hidden",
                overflow: "hidden",
                width: "0",
                height: "0",
                padding: "0",
                margin: "0",
                opacity: "0",
                backdropFilter: "blur(0px)",
                WebkitBackdropFilter: "blur(0px)",
              }
        }
      >
        <div
          className="clickable"
          onClick={() => setSubscribeModalOpen(false)}
        />

        <div
          style={
            !subscribeModalOpen || subscribed
              ? {
                  scale: "0",
                  opacity:"0",
                  visibility:"hidden"
                }
              : {
                  scale:
                    width > 820
                      ? (width / 1920).toString()
                      : (width / 412).toString(),
                      opacity:"1",
                      visibility:"visible"
                }
          }
          className="subscribeForm"
        >
          <div className="title">Subscribe To Raqamyat Webinar</div>
          <div className="inputContainer">
            <TextField
              onChange={(e) =>
                setForm({ ...registerForm, name: e.target.value })
              }
              fullWidth
            />
            <label>Name</label>
          </div>
          <div className="inputContainer">
            <TextField
              onChange={(e) =>
                setForm({ ...registerForm, email: e.target.value })
              }
              fullWidth
            />
            <label>Email</label>
          </div>
          <div className="inputContainer">
            <MuiTelInput
              value={registerForm?.whatsapp}
              onChange={(e) => setForm({ ...registerForm, whatsapp: e })}
              fullWidth
              defaultCountry="EG"
            />
            <label>WhatsApp</label>
          </div>
          <div className="message">
            By registering, you confirm that you have read and agree to the
            <Link href="/"> Event Terms of Service</Link> and that you agree to
            the processing of your personal data by Salesforce as described in
            the <Link href="/">Privacy Statement</Link>.
          </div>
          <button onClick={handleSubscribeButton} className="registerBtn">
            Subscribe
          </button>
          <div
            style={{ display: subscribing ? "flex" : "none" }}
            className="subscribingOverlay"
          >
            <ScaleLoader color="#00a4f8" />
          </div>
        </div>
        <div
          style={
            subscribed
              ? {
                  scale: "1",
                }
              : {
                  scale: "0",
                }
          }
          className="thankYou"
        >
          <div className="imageContainer">
            <img src="/img/subscribed.svg" alt="subscribed" />
          </div>
          <div className="message">
            <div className="title">THANK YOU FOR SUBSCRIBING</div>
            <div className="subtitle">
              By registering, you’ve opened the eCommerce Gate of Knowledge, and
              you will be learning from the top experts in MENA.
            </div>
            <button
              onClick={() => setSubscribeModalOpen(false)}
              className="continueuBtn"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
      <div
        className="registeredModal"
        style={
          registeredModalOpen
            ? {}
            : {
                overflow: "hidden",
                width: "0",
                height: "0",
                padding: "0",
                margin: "0",
                opacity: "0",
                backdropFilter: "blur(0px)",
                WebkitBackdropFilter: "blur(0px)",
              }
        }
      >
        <div
          className="clickable"
          onClick={() => setRegisteredModalOpen(false)}
        />
        <div
          style={
            registered
              ? {
                  scale:
                    width > 820
                      ? (width / 1920).toString()
                      : (width / 412).toString(),
                }
              : {
                  scale: "0",
                }
          }
          className="thankYou"
        >
          <div className="imageContainer">
            <img src="/img/subscribed.svg" alt="subscribed" />
          </div>
          <div className="message">
            <div className="title">THANK YOU FOR SUBSCRIBING</div>
            <div className="subtitle">
              By registering, you’ve opened the eCommerce Gate of Knowledge, and
              you will be learning from the top experts in MENA.
            </div>
            <button
              onClick={() => setRegisteredModalOpen(false)}
              className="continueuBtn"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </SnackbarProvider>
  );
}
