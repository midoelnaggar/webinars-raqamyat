import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import styles from "../styles/Header.module.scss";

export default function Header({ searchModalOpen, setSearchModalOpen, webinars }) {
  const [search, setSearch] = useState("");
  const { asPath, push } = useRouter();
  const escapeSearch = useCallback((e) => {
    if (e.key === "Escape") {
      setSearchModalOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escapeSearch);
    return () => {
      document.removeEventListener("keydown", escapeSearch);
    };
  }, [escapeSearch]);

  useEffect(() => {
    if (searchModalOpen) {
    document.body.style.overflowY = "hidden"
  }
  else {
    document.body.style.overflowY = "unset"
  }
  }, [searchModalOpen]);

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
            onClick={() => {
              setSearchModalOpen(true);
              setSearch("");
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
              overflow:"hidden",
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
            {search === "" &&
              webinars?.map((webinar) => {
                return (
                  <div
                    onClick={() => setSearch(webinar?.name)}
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
          <div className={styles.noResults}>
            <img src="/img/noResults.svg" alt="noResults" />
            No Results Found
          </div>
        </div>
      </div>
    </>
  );
}
