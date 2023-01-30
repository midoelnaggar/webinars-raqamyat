import { useEffect, useState } from "react";
import axios from "axios";
import { createRoot } from "react-dom/client";
import Link from "next/link";
import styles from "../styles/Home.module.scss";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { Calendar } from "react-calendar";
import moment from "moment";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const feedbacks = [
  {
    title:
      "Good information provided in a timely fashion and manner. Glad I have completed this Webinar.",
    speaker: {
      name: "Joseph Jackson",
      position: "Product Manager",
      company: "Google",
    },
  },
  {
    title:
      "Good information provided in a timely fashion and manner. Glad I have completed this Webinar.",
    speaker: {
      name: "Joseph Jackson",
      position: "Product Manager",
      company: "Google",
    },
  },
  {
    title:
      "Good information provided in a timely fashion and manner. Glad I have completed this Webinar.",
    speaker: {
      name: "Joseph Jackson",
      position: "Product Manager",
      company: "Google",
    },
  },
  {
    title:
      "Good information provided in a timely fashion and manner. Glad I have completed this Webinar.",
    speaker: {
      name: "Joseph Jackson",
      position: "Product Manager",
      company: "Google",
    },
  },
];

export default function Home({
  webinars,
  pastWebinars,
  upcomingWebinars,
  featuredWebinar,
}) {
  const [openCalendar, setOpenCalendar] = useState(false);

  const getLogos = () => {
    const logos = [];
    for (let i = 1; i <= 15; i++) {
      logos.push(
        <div className={styles.clientLogo}>
          <div>
            <img src={`/img/clients/${i}.png`} alt={i} />
          </div>
        </div>
      );
    }
    return logos;
  };

  const handleCalendarBtn = () => {
    setOpenCalendar(!openCalendar);
  };

  useEffect(() => {
    if (webinars?.length > 0) {
      markDays();
      setOpenCalendar(true);
    }
  }, [webinars]);

  const markDays = () => {
    const days = document.getElementsByClassName(
      "react-calendar__month-view__days__day"
    );
    for (let b = 0; b < webinars?.length; b++) {
      for (let c = 0; c < days.length; c++) {
        if (
          moment(days[c]?.firstChild?.ariaLabel, "MMMM D[,] YYYY").format(
            "DD-MM-YYYY"
          ) === moment(webinars[b]?.date, "DD-MM-YYYY").format("DD-MM-YYYY")
        ) {
          const a = document.createElement("span");
          a.className = "tag";
          if (
            moment(moment(webinars[b]?.date, "DD-MM-YYYY")).isSame(
              moment(),
              "day"
            )
          ) {
            a.style.backgroundColor = "#FF3939";
          } else if (
            moment(moment(webinars[b]?.date, "DD-MM-YYYY")).isAfter(moment())
          ) {
            a.style.backgroundColor = "#00A4F8";
          } else if (
            moment(moment(webinars[b]?.date, "DD-MM-YYYY")).isBefore(moment())
          ) {
            a.style.backgroundColor = "#707070";
          }
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
            <Link className="tooltip" href={`/webinars/${webinars[b]?.id}`}>
              <div className="tooltipStatus">
                {moment(moment(webinars[b]?.date, "DD-MM-YYYY")).isSame(
                  moment(),
                  "day"
                ) && (
                  <>
                    <span style={{ backgroundColor: "#FF3939" }} />{" "}
                    <div>Live Webinar</div>{" "}
                  </>
                )}
                {moment(moment(webinars[b]?.date, "DD-MM-YYYY")).isAfter(
                  moment(),
                  "day"
                ) && (
                  <>
                    <span style={{ backgroundColor: "#00A4F8" }} />{" "}
                    <div>Upcoming Webinar</div>{" "}
                  </>
                )}
                {moment(moment(webinars[b]?.date, "DD-MM-YYYY")).isBefore(
                  moment(),
                  "day"
                ) && (
                  <>
                    <span style={{ backgroundColor: "#707070" }} />{" "}
                    <div>Past Webinar</div>{" "}
                  </>
                )}
              </div>
              <div className="tooltiDateAndTime">
                <DateRangeIcon
                  className="icon"
                  fontSize="14px"
                  htmlColor="#707070"
                />
                <div className="date">
                  {moment(webinars[b]?.date, "DD-MM-YYYY").format(
                    "DD MMM[.] YYYY"
                  )}
                </div>
                |
                <div className="time">
                  {moment(webinars[b]?.date, "DD-MM-YYYY hh:mm:ss").format(
                    "hh[:]mm A"
                  )}
                </div>
              </div>
              <div className="tooltipTitle">
                {webinars[b]?.name}
              </div>
            </Link>
          );
        }
      }
    }
  };

  return (
    <>
      <div className={styles.home}>
        <div
          style={{
            visibility: openCalendar ? "visible" : "hidden",
            bottom: openCalendar ? "100px" : "-477px",
            opacity: openCalendar ? 1 : 0,
          }}
          className={styles.calendar}
        >
          <div className={styles.calendarTitle}>
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
            nextLabel={
              <img className="navIcon" src="/img/next.svg" alt="next" />
            }
            prevLabel={
              <img className="navIcon" src="/img/prev.svg" alt="prev" />
            }
          />
        </div>
        <div className={styles.calendarBtn} onClick={handleCalendarBtn}>
          <div className={styles.left}>
            <DateRangeIcon
              className={styles.calendarIcon}
              htmlColor="#00A4F8"
            />
          </div>

          <div className={styles.right}>Webinars Calendar</div>
        </div>
        <div className={styles.hero}>
          <img className={styles.shapes} src="/img/shapes.svg" alt="shapes" />
          <img className={styles.chart} src="/img/chart.svg" alt="chart" />
          <img className={styles.live} src="/img/live.svg" alt="live" />
          <img className={styles.mic} src="/img/mic.svg" alt="mic" />
          <img className={styles.ccard} src="/img/ccard.svg" alt="ccard" />
          <div className={styles.title}>
            Fintech Knowledge
            <br />
            Unlocked!
          </div>
          <div className={styles.subtitle}>
            Raqamyat Webinars is your Fintech knowledge gate
          </div>
          <button className={styles.registerBtn}>HOW TO REGISTER / JOIN</button>
        </div>
        <div className={styles.parteners}>
          <img src="/img/paymob.png" alt="paymob" />
          <img src="/img/paySky.png" alt="paySky" />
          <img src="/img/fawry.png" alt="fawry" />
          <img src="/img/kashier.png" alt="kashier" />
          <img src="/img/oPay.png" alt="oPay" />
        </div>
        <div className={styles.featuredWebinar}>
          <span className={styles.featuredWebinarBg} />

          <div className={styles.top}>
            <div className={styles.left}>
              <img
                className={styles.webinarImage}
                src={featuredWebinar?.image}
                alt="webinarImage"
              />
              <div className={styles.watchNowBtn}>
                <img
                  className={styles.playIcon}
                  src="/img/play.svg"
                  alt="play"
                />
                Watch Now{" "}
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.status}>
                {moment(moment(featuredWebinar?.date, "DD-MM-YYYY")).isAfter(
                  moment()
                )
                  ? "Upcoming Webinar"
                  : moment(
                      moment(featuredWebinar?.date, "DD-MM-YYYY")
                    ).isBefore(moment()) && "Last Webinar"}
              </div>
              <div className={styles.dateAndTime}>
                <DateRangeIcon
                  className={styles.icon}
                  fontSize="14px"
                  htmlColor="#707070"
                />
                <div className={styles.date}>
                  {moment(featuredWebinar?.date, "DD-MM-YYYY").format(
                    "dddd[,] MMMM Do YYYY"
                  )}
                </div>
                |
                <div className={styles.time}>
                  {moment(featuredWebinar?.date, "DD-MM-YYYY hh:mm:ss").format(
                    "hh[:]mm A"
                  )}
                </div>
              </div>
              <div className={styles.title}>{featuredWebinar?.name}</div>
              <div className={styles.speaker}>
                <div className={styles.speakerLeft}>
                  <img
                    onError={(e) => (e.target.src = "/img/avatar.png")}
                    src="/img/avatar.png"
                    alt="speaker"
                  />
                </div>
                <div className={styles.speakerRight}>
                  <div className={styles.name}>{featuredWebinar?.speker}</div>
                  <div className={styles.position}>
                    {featuredWebinar?.position}
                  </div>
                  <div className={styles.company}>
                    {featuredWebinar?.company}
                  </div>
                </div>
              </div>
              <div className={styles.register}>
                <button className={styles.btn}>Register Now</button>
              </div>
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.left}>
              <div className={styles.title}>Free Zoom Webinars</div>
              <div className={styles.subtitle}>
                <div>
                  <span>Live Knowledge Sharing Sessions By Industry</span>
                </div>
                <div>
                  <span>Experts On Latest And Trending Skills</span>
                </div>
                <div>
                  <span>And Technologies</span>
                </div>
              </div>
            </div>
            <div className={styles.right}>
              <Link href="/webinars">
                <div>all webinars</div>
                <img src="/img/up-right-arrow.svg" alt="arrow" />
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.upcomingWebinars}>
          <img src="/img/shapes2.svg" className={styles.upcomingWebinarsBg} />
          <div className={styles.header}>Upcoming Webinars</div>
          <Swiper
            slidesPerView={3}
            spaceBetween={150}
            className={styles.swiper}
            modules={[Navigation]}
            navigation={true}
          >
            {Array.isArray(upcomingWebinars) &&
              upcomingWebinars.map((webinar, index) => {
                return (
                  <SwiperSlide key={index} className={styles.slide}>
                    <div className={styles.card}>
                      <div className={styles.dateAndTime}>
                        <DateRangeIcon
                          className={styles.icon}
                          fontSize="14px"
                          htmlColor="#707070"
                        />
                        <div className={styles.date}>
                          {moment(webinar?.date, "DD-MM-YYYY").format(
                            "dddd[,] MMMM Do YYYY"
                          )}
                        </div>
                        |
                        <div className={styles.time}>
                          {moment(webinar?.date, "DD-MM-YYYY hh:mm:ss").format(
                            "hh[:]mm A"
                          )}
                        </div>
                      </div>
                      <div className={styles.title}>{webinar?.name}</div>
                      <div className={styles.speaker}>
                        <div className={styles.speakerLeft}>
                          <img
                            onError={(e) => (e.target.src = "/img/avatar.png")}
                            src={webinar?.author?.image}
                            alt="speaker"
                          />
                        </div>
                        <div className={styles.speakerRight}>
                          <div className={styles.name}>{webinar?.speker}</div>
                          <div className={styles.position}>
                            {webinar?.position}
                          </div>
                          <div className={styles.company}>
                            {webinar?.company}
                          </div>
                        </div>
                      </div>
                      <div className={styles.register}>
                        <button className={styles.btn}>Register Now</button>
                      </div>{" "}
                    </div>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
        <div className={styles.pastWebinars}>
          <div className={styles.header}>Past Webinars</div>
          <Swiper
            slidesPerView={3}
            spaceBetween={150}
            className={styles.swiper}
            modules={[Navigation]}
            navigation={true}
          >
            {Array.isArray(pastWebinars) &&
              pastWebinars.map((webinar, index) => {
                return (
                  <SwiperSlide key={index} className={styles.slide}>
                    <div className={styles.card}>
                      <div className={styles.dateAndTime}>
                        <DateRangeIcon
                          className={styles.icon}
                          fontSize="14px"
                          htmlColor="#707070"
                        />
                        <div className={styles.date}>
                          {moment(webinar?.date, "DD-MM-YYYY").format(
                            "dddd[,] MMMM Do YYYY"
                          )}
                        </div>
                        |
                        <div className={styles.time}>
                          {moment(webinar?.date, "DD-MM-YYYY hh:mm:ss").format(
                            "hh[:]mm A"
                          )}
                        </div>
                      </div>
                      <div className={styles.title}>{webinar?.name}</div>
                      <div className={styles.speaker}>
                        <div className={styles.speakerLeft}>
                          <img
                            onError={(e) => (e.target.src = "/img/avatar.png")}
                            src="/img/avatar.png"
                            alt="speaker"
                          />
                        </div>
                        <div className={styles.speakerRight}>
                          <div className={styles.name}>{webinar?.speker}</div>
                          <div className={styles.position}>
                            {webinar?.position}
                          </div>
                          <div className={styles.company}>
                            {webinar?.company}
                          </div>
                        </div>
                      </div>
                      <div className={styles.register}>
                        <button className={styles.btn}>Get Recordings</button>
                      </div>{" "}
                    </div>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
        <div className={styles.feedbacks}>
          <Swiper
            pagination={true}
            modules={[Pagination]}
            className={styles.start}
          >
            {feedbacks.map((feedback) => {
              return (
                <SwiperSlide className={styles.feedback}>
                  <div className={styles.feedbackContainer}>
                    <div className={styles.title}>
                      <img
                        className={styles.qs}
                        src="/img/quotes-start.svg"
                        alt="quotes-start"
                      />{" "}
                      {feedback?.title}{" "}
                      <img
                        className={styles.qe}
                        src="/img/quotes-end.svg"
                        alt="quotes-end"
                      />
                    </div>
                    <div className={styles.feedbacker}>
                      <div className={styles.feedbackerLeft}>
                        <img
                          onError={(e) => (e.target.src = "/img/avatar.png")}
                          src="/img/avatar.png"
                          alt="feedbacker"
                        />
                      </div>
                      <div className={styles.feedbackerRight}>
                        <div className={styles.name}>
                          {feedback?.speaker?.name}
                        </div>
                        <div className={styles.position}>
                          {feedback?.speaker?.position}
                        </div>
                        <div className={styles.company}>
                          {feedback?.speaker?.company}
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <div className={styles.end}>
            <div className={styles.title}>
              <span>Participant Feedback</span>
            </div>
            <div className={styles.subtitle}>
              <div>
                <span>Here's what Participants are saying</span>
              </div>
              <div>
                <span>about Raqamyat Webinars</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.subscribe}>
          <div className={styles.title}>
            We are online Join the Conversation
          </div>
          <div className={styles.subtitle}>Subscribe To Raqamyat Webinar</div>
          <button className={styles.subscribeBtn}>SUBSCRIBE</button>
        </div>
        <div className={styles.clients}>
          <div className={styles.title}>Our Respected Clients</div>
          <div className={styles.subtitle}>
            <div>
              <span>Our Clients Satisfaction</span>
            </div>
            <div>
              <span>is Our Priority</span>
            </div>
          </div>
          <div className={styles.clientLogos}>{getLogos()}</div>
        </div>
      </div>
    </>
  );
}
