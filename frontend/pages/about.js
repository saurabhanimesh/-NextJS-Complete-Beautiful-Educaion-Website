import styles from "../styles/About.module.scss";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import NavBar from "../components/navBar";
import Link from "next/link";

export default class About extends React.Component {
  render() {
    return (
      <>
        <Head>
          <title>Patna Home Tuitions - About</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <div className={styles.main_container}>
          <NavBar />
          <div className={styles.logo_showcase}>
            <img className={styles.logo} src="images/pht.png"></img>
          </div>
          <div className={styles.name}>Patna Home Tuitions</div>
          <div className={styles.contact_boxes}>
            <div className={styles.subject_details1}>
              <div className={styles.text_content}>
                <h className={styles.text_heading}>About</h>
                <p className={styles.text_para}>
                  We are a team on a mission for making patna best in home
                  tuition. Allow students to be taught by the best teachers of
                  patna and to let them become the best version of theirselves.
                </p>
              </div>
              <div className={styles.image_cover}>
                <img src="images/system.png" className={styles.learn_image} />
              </div>
            </div>
            <div className={styles.subject_details2}>
              <div className={styles.image_cover}>
                <img src="images/connect.png" className={styles.learn_image} />
              </div>
              <div className={styles.text_content}>
                <h className={styles.text_heading}>Our Mission</h>
                <p className={styles.text_para}>
                  Our major goal is to gain the loyalty of students and to
                  produce the best students in patna.
                </p>
              </div>
            </div>
          </div>
          <div className={styles.foot_box}>
            <div className={styles.social_meida}>
              <Link href="https://www.facebook.com/patna.hometuitions.5">
                <a target="_blank">
                  <div className={styles.sm_cover}>
                    <img src="/images/facebook.png" className={styles.sm} />
                  </div>
                </a>
              </Link>
              <Link href="https://www.facebook.com/patna.hometuitions.5">
                <a target="_blank">
                  <div className={styles.sm_cover}>
                    <img src="/images/instagram.png" className={styles.sm} />
                  </div>
                </a>
              </Link>
              <Link href="https://www.facebook.com/patna.hometuitions.5">
                <a target="_blank">
                  <div className={styles.sm_cover}>
                    <img src="/images/twitter.png" className={styles.sm} />
                  </div>
                </a>
              </Link>
              <Link href="https://wa.me/+917463986467">
                <a target="_blank">
                  <div className={styles.sm_cover}>
                    <img src="/images/whatsapp.png" className={styles.sm} />
                  </div>
                </a>
              </Link>
            </div>
            <div className={styles.copyright}>
              PatnaHomeTuitions.com © 2022 All rights reserved
            </div>
          </div>
        </div>
      </>
    );
  }
}
