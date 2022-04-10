import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Contact.module.scss";
import NavBar from "../components/navBar";
import { React, useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Patna Home Tuitions - Contact</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={styles.main_container}>
        <NavBar />
        <div className={styles.contact_boxes}>
          <div className={styles.subject_details1}>
            <div className={styles.text_content}>
              <h className={styles.text_heading}>Address</h>
              <p className={styles.text_para}>
                Gola road petrol pump behind Bihar college of pharmacy,near R.K
                sadan appartment, Shantiniketan colony , gopal house no 225
                ,patna 801503.
              </p>
            </div>
            <div className={styles.image_cover}>
              <img src="images/address.png" className={styles.learn_image} />
            </div>
          </div>
          <div className={styles.subject_details2}>
            <div className={styles.image_cover}>
              <img src="images/call.png" className={styles.learn_image} />
            </div>
            <div className={styles.text_content}>
              <h className={styles.text_heading}>Contact</h>
              <p className={styles.text_para}>
                This number is available for every of our students or new
                students for any guidance or assistance. Feel free to contact on
                - +91-7903947955
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
