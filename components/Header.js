import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import styles from "../styles/Header.module.scss";

export default function Header({ searching, setSearching, webinars }) {
  const [search, setSearch] = useState("");
  const { asPath, push } = useRouter();
  const escapeSearch = useCallback((e) => {
    if (e.key === "Escape") {
      setSearching(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escapeSearch);
    return () => {
      document.removeEventListener("keydown", escapeSearch);
    };
  }, [escapeSearch]);

  const handleSearch = () => {};

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
          <button onClick={() => push("/apply")} className={styles.applyBtn}>
            Apply For Free
          </button>
          <button
            onClick={() => setSearching(!searching)}
            className={styles.searchBtn}
          >
            <img src="/img/search.svg" alt="search" />
          </button>
        </div>
      </div>
      <div
        id="searchContainer"
        style={
          !searching
            ? {
                width: "0",
                height: "0",
                padding: "0",
                margin: "0",
                opacity: "0",
                backdropFilter:"blur(0px)",
                WebkitBackdropFilter:"blur(0px)",
              }
            : {
              backdropFilter:"blur(50px)",
              WebkitBackdropFilter:"blur(50px)",

            }
        }
        className={styles.searchContainer}
      >
        <div
          onClick={() => setSearching(false)}
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            left: "0",
            top: "0",
          }}
        />
        <div className={styles.search}>
          <div className={styles.inputAndButton}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={
                !searching
                  ? {
                      width: "20%",
                    }
                  : {}
              }
              placeholder="Search by webinar name"
            />
            <button onClick={() => setSearching(false)}>
              <img
                style={
                  !searching
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
                  !searching
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
            {search === "" &&
              webinars?.map((webinar) => {
                return (
                  <div
                    onClick={() => setSearch(webinar?.name)}
                    className={styles.suggestedName}
                    style={
                      !searching
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
            onClick={() => setSearching(!searching)}
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
