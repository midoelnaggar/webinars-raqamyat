import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState, useRef } from "react";
import styles from "../styles/Header.module.scss";

export default function Header({
  searchModalOpen,
  setSearchModalOpen,
  upcomingWebinars,
  pastWebinars,
  liveWebinars,
}) {
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const { asPath, push } = useRouter();

  const searchInputRef = useRef();

  const escapeSearch = useCallback((e) => {
    if (e.key === "Escape") {
      setSearchModalOpen(false);
    }
  }, []);

  useEffect(() => {
    setSearchResults([...liveWebinars, ...upcomingWebinars, ...pastWebinars]);
  }, [upcomingWebinars, pastWebinars, liveWebinars]);

  useEffect(() => {
    document.addEventListener("keydown", escapeSearch);
    return () => {
      document.removeEventListener("keydown", escapeSearch);
    };
  }, [escapeSearch]);

  useEffect(() => {
    if (!searchModalOpen) {
      searchInputRef.current.value = "";
      setSearchResults([...liveWebinars, ...upcomingWebinars, ...pastWebinars]);
    }
  }, [searchModalOpen]);

  const controller = new AbortController();

  const handleSearch = () => {
    const searchByName = async () => {
      const res = await axios.get(
        "https://newraq.raqamyat.com/public/api/webinars",
        {
          params: {
            name: searchInputRef?.current?.value,
          },
          signal: controller.signal,
        }
      );
      if (res.status === 200) {
        setSearchResults(res?.data?.data?.data);
      }
    };
    searchByName();
    return () => {
      controller.abort();
    };
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Link
            className={
              asPath.startsWith("/about")
                ? styles.activeMenuLink
                : styles.menuLink
            }
            href="/about"
          >
            About <span />
          </Link>
          <Link
            className={
              asPath.startsWith("/webinars")
                ? styles.activeMenuLink
                : styles.menuLink
            }
            href="/webinars"
          >
            Webinars <span />
          </Link>
        </div>
        <div className={styles.center}>
          <Link href="/">
            <img src="/img/logo.png" alt="logo" />
          </Link>
        </div>
        <div className={styles.right}>
         {/*<button onClick={() => push("/apply")} className={styles.applyBtn}>
            Apply <span> For Free</span> 
          </button>*/}
          <button
            onClick={() => {
              setSearchModalOpen(true);
            }}
            className={styles.searchBtn}
          >
            <img src="/img/search.svg" alt="search" />
          </button>
        </div>
      </div>
      <div
        id="searchModal"
        style={
          !searchModalOpen
            ? {
                overflow: "hidden",
                width: "0",
                height: "0",
                padding: "0",
                margin: "0",
                opacity: "0",
                backdropFilter: "blur(0px)",
                WebkitBackdropFilter: "blur(0px)",
              }
            : {}
        }
        className={styles.searchModal}
      >
        <div className={styles.search}>
          <div
            className={styles.clickable}
            onClick={() => setSearchModalOpen(false)}
          />
          <div className={styles.inputAndButton}>
            <input
              ref={searchInputRef}
              onChange={handleSearch}
              style={
                !searchModalOpen
                  ? {
                      width: "20%",
                    }
                  : {}
              }
              placeholder="Search by webinar name"
            />
            <button onClick={() => setSearchModalOpen(false)}>
              <img
                style={
                  !searchModalOpen
                    ? {
                        scale: "0",
                      }
                    : {
                        scale: "1",
                      }
                }
                src="/img/x.svg"
                alt="x"
              />
              <img
                style={
                  !searchModalOpen
                    ? {
                        scale: "1",
                      }
                    : {
                        scale: "0",
                      }
                }
                src="/img/search.svg"
                alt="search"
              />
            </button>
          </div>
          <div className={styles.suggestedNames}>
            {Array.isArray(searchResults) &&
              searchResults?.map((webinar,index) => {
                return (
                  <div
                    onClick={() => {
                      push(`/webinars/${webinar?.slug}`);
                      setSearchModalOpen(false);
                    }}
                    key={index}
                    className={styles.suggestedName}
                    style={
                      !searchModalOpen
                        ? {
                            scale: "0",
                          }
                        : {
                            scale: "1",
                          }
                    }
                  >
                    {webinar?.name}
                    <img src="/img/up-right-arrow.svg" alt="arrow" />
                  </div>
                );
              })}
          </div>
          <div
            style={{
              display:
                !searching & (searchResults?.length !== 0) ? "none" : "flex",
            }}
            className={styles.noResults}
          >
            <img src="/img/noResults.svg" alt="noResults" />
            No Results Found
          </div>
        </div>
      </div>
    </>
  );
}
