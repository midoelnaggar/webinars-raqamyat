import moment from "moment";
import styles from "../../styles/webinars.module.scss";
import DateRangeIcon from "@mui/icons-material/DateRange";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Webinars({ featuredWebinar, upcomingWebinars, pastWebinars }) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Raqamyat Webinars</title>
        <meta
          name="description"
          content="If you’re looking for knowledge, then you've arrived at the right place. Here you will find all of our recorded webinars with eCommerce specialists from around the globe to watch whenever you wish."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.webinars}>
        <div className={styles.featuredWebinar}>
          <span className={styles.featuredWebinarBg} />
          <div className={styles.top}>
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
          </div>
          <div className={styles.bottom}>
            <div className={styles.left}>
              <img
                className={styles.webinarImage}
                src={featuredWebinar?.image}
                onError={(e)=>e.target.src = "/img/fallbackWebinars.jpg"}
                alt="webinarImage"
              />
            <a href={featuredWebinar?.zoom_link} target="_blank" rel="noopener noreferrer" className={styles.watchNowBtn}>
                <img
                  className={styles.playIcon}
                  src="/img/play.svg"
                  alt="play"
                />
                Watch Now
              </a>
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
                <button onClick={()=>{
                        router.push(`/webinars/${featuredWebinar?.slug}`)
                      }} className={styles.btn}>{moment(moment(featuredWebinar?.date, "DD-MM-YYYY")).isAfter(
                        moment()
                      )
                        ? "Register Now"
                        : moment(
                            moment(featuredWebinar?.date, "DD-MM-YYYY")
                          ).isBefore(moment()) && "Get Recordings"}</button>
              </div>
            </div>
          </div>
        </div>
        {upcomingWebinars?.length > 0 && (
          <div className={styles.upcomingWebinars}>
            <div className={styles.title}>Upcoming Webinars</div>
            <div className={styles.cards}>
              {upcomingWebinars.map((webinar,index) => {
                return (
                  <div key={index} className={styles.card}>
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
                        <div className={styles.company}>{webinar?.company}</div>
                      </div>
                    </div>
                    <div className={styles.register}>
                      <button onClick={()=>{
                        router.push(`/webinars/${webinar?.slug}`)
                      }} className={styles.btn}>Register Now</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {pastWebinars?.length > 0 && (
          <div className={styles.pastWebinars}>
            <div className={styles.title}>Past Webinars</div>
            <div className={styles.cards}>
              {pastWebinars.map((webinar,index) => {
                return (
                  <div key={index} className={styles.card}>
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
                        <div className={styles.company}>{webinar?.company}</div>
                      </div>
                    </div>
                    <div className={styles.register}>
                      <button onClick={()=>{
                        router.push(`/webinars/${webinar?.slug}`)
                      }} className={styles.btn}>Get Recordings</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

