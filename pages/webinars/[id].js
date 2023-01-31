import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CircleLoader } from "react-spinners";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import styles from "../../styles/Webinar.module.scss";
import moment from "moment";
import { TextField } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import Link from "next/link";
import PastWebinars from "../../components/PastWebinars";

function Webinar({ webinars,pastWebinars }) {
  const [webinar, setWebinar] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (webinars?.length > 0) {
      setWebinar(
        webinars?.filter((w) => {
          return w?.id == router.query.id;
        })[0]
      );
    }
  }, [router.query.id, webinars]);

  useEffect(() => {
    if (webinar.id) {
      setLoading(false);
    }
  }, [webinar]);

  return (
    <>
      <div
        className={styles.loading}
        style={{ display: loading ? "flex" : "none" }}
      >
        <CircleLoader color="#00a4f8" />
      </div>
      <div className={styles.webinarPage}>
        <div className={styles.top}>
          <div className={styles.breadcrumb}>
            {`Home / Webinars / `} {<span>{webinar?.name}</span>}
          </div>
          <span className={styles.zoom}>Free Zoom Webinars</span>
          <div className={styles.titleContainer}>
            <span className={styles.title}>{webinar?.name}</span>
          </div>
          <div className={styles.speaker}>
            <div className={styles.title}>Hosted by</div>
            <div className={styles.info}>
              <div className={styles.speakerLeft}>
                <img
                  onError={(e) => (e.target.src = "/img/avatar.png")}
                  src="/img/avatar.png"
                  alt="speaker"
                />
              </div>
              <div className={styles.speakerRight}>
                <div className={styles.name}>{webinar?.speker}</div>
                <div className={styles.position}>{webinar?.position}</div>
                <div className={styles.company}>{webinar?.company}</div>
              </div>
            </div>
          </div>
          <div className={styles.thumbnail}>
            <img
              className={styles.webinarImage}
              src={webinar?.image}
              alt="webinarImage"
            />
            <div className={styles.watchNowBtn}>
              <img className={styles.playIcon} src="/img/play.svg" alt="play" />
              Watch Now
            </div>
          </div>
        </div>
        <div className={styles.center}>
          <div className={styles.container}>
            <div className={styles.left}>
              <div className={styles.dateAndTime}>
                <div className={styles.date}>
                  <DateRangeIcon htmlColor="#707070" />
                  <div>
                    {moment(webinar?.date, "DD-MM-YYYY").format(
                      "dddd[,] MMMM Do YYYY"
                    )}
                  </div>
                </div>
                <div className={styles.time}>
                  <AccessTimeIcon htmlColor="#707070" />
                  <div>
                    {`${moment(webinar?.date, "DD-MM-YYYY hh:mm:ss").format(
                      "hh[:]mm A"
                    )} (EET)`}
                  </div>
                </div>
              </div>
              <div
                className={styles.desc}
                dangerouslySetInnerHTML={{ __html: webinar?.description }}
              />
            </div>
            <div className={styles.right}>
              <div className={styles.title}>Access the webinar now</div>
              <div className={styles.inputContainer}>
                <TextField fullWidth />
                <label>Name</label>
              </div>
              <div className={styles.inputContainer}>
                <TextField fullWidth className={styles.input} />
                <label>Email</label>
              </div>
              <div className={styles.inputContainer}>
                <MuiTelInput fullWidth defaultCountry="EG" />
                <label>WhatsApp</label>
              </div>
              <div className={styles.message}>
                By registering, you confirm that you have read and agree to the
                <Link href=""> Event Terms of Service</Link> and that you agree
                to the processing of your personal data by Salesforce as
                described in the <Link href="">Privacy Statement</Link>.
              </div>
              <button className={styles.registerBtn}>
              Register For Free
              </button>
            </div>
          </div>
        </div>
        <PastWebinars pastWebinars={pastWebinars} />
      </div>
    </>
  );
}

export default Webinar;