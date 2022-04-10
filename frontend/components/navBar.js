import Head from "next/head";
import Image from "next/image";
import React from "react";
import styles from "../styles/NavBar.module.scss";
import Link from "next/link";

export default class NavBar extends React.Component {
  render() {
    return (
      <>
        <div className={styles.list_container}>
          <div className={styles.content_container}>
            <div className={styles.logo_container}>
              <img className={styles.logo} src="/images/pht.png" />
            </div>
            <ul className={styles.list}>
              <li>
                <Link href="/">
                  <a className={styles.link_style}>Home</a>
                </Link>
              </li>
              <li>
                <Link href="/#register">
                  <a className={styles.link_style}>Register</a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className={styles.link_style}>About</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className={styles.link_style}>Contact</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.separator_line}></div>
        </div>
      </>
    );
  }
}
