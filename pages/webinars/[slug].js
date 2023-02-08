import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ScaleLoader } from "react-spinners";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import styles from "../../styles/Webinar.module.scss";
import moment from "moment";
import { TextField } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import Link from "next/link";
import PastWebinars from "../../components/PastWebinars";
import axios from "axios";

function Webinar({
  pastWebinars,
  setRegisteredModalOpen,
  registered,
  registering,
  setRegistering,
  setRegistered,
}) {
  const [webinar, setWebinar] = useState({});
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({});
  const router = useRouter();

  useEffect(() => {
    const getWebinar = async () => {
      const res = await axios.get(
        `https://newraq.raqamyat.com/public/api/showWebinars?slug=${router.query.slug}`
      );
      if (res.status === 200) {
        setWebinar(await res?.data?.data);
      }
    };
    if (router.query.slug !== undefined) {
      getWebinar();
    }
  }, [router.query.slug]);

  useEffect(() => {
    if (registered) {
      setRegisteredModalOpen(true);
    }
  }, [registered]);

  useEffect(() => {
    if (webinar.id) {
      setLoading(false);
      setForm({ ...form, webinar_id: webinar.id });
    }
  }, [webinar]);

  const handleRegisterButton = () => {
    setRegistering(true);
    const submit = async () => {
      const res = await axios.post("https://newraq.raqamyat.com/public/api/webinarStore",form);
      if (res.status === 200) {
        setRegisteredModalOpen(true);
        setRegistering(false);
        setRegistered(true);
      }
      else {
        console.log("somthing went wrong!");
        setRegistering(false);
      }
    };
    submit();
  };

  return (
    <>
      <div
        className={styles.loading}
        style={{ display: loading ? "flex" : "none" }}
      >
        <ScaleLoader color="#00a4f8" />
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
              onError={(e) => (e.target.src = "/img/fallbackWebinars.jpg")}
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
                <TextField
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  fullWidth
                />
                <label>Name</label>
              </div>
              <div className={styles.inputContainer}>
                <TextField
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  fullWidth
                />
                <label>Email</label>
              </div>
              <div className={styles.inputContainer}>
                <MuiTelInput
                  value={form?.whatsapp}
                  onChange={(e) => setForm({ ...form, whatsapp: e })}
                  fullWidth
                  defaultCountry="EG"
                />
                <label>WhatsApp</label>
              </div>
              <div className={styles.message}>
                By registering, you confirm that you have read and agree to the
                <Link href="/"> Event Terms of Service</Link> and that you agree
                to the processing of your personal data by Salesforce as
                described in the <Link href="/">Privacy Statement</Link>.
              </div>
              <button
                onClick={handleRegisterButton}
                className={styles.registerBtn}
              >
                Register For Free
              </button>
              <div
                style={{ display: registering ? "flex" : "none" }}
                className={styles.registeringOverlay}
              >
                <ScaleLoader color="#00a4f8" />
              </div>
            </div>
          </div>
        </div>
        <PastWebinars pastWebinars={pastWebinars} />
      </div>
    </>
  );
}

export default Webinar;
