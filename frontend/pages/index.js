import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import NavBar from "../components/navBar";
import { style } from "@mui/system";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Carousel from "react-bootstrap/Carousel";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { React, useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Link from "next/link";
import Rotate from "react-reveal/Rotate";
import Bounce from "react-reveal/Bounce";
import Slide from "react-reveal/Slide";
import Zoom from "react-reveal/Zoom";
import Fade from "react-reveal/Fade";

export default function Home() {
  const [newStudent, setNewStudent] = useState({});
  const [newTeacher, setNewTeacher] = useState({});
  const [loadingSave, setLoadingSave] = useState(false);
  const [checked, setChecked] = useState(false);
  const [reviewData, setReviewData] = useState([]);
  const [reviewData2, setReviewData2] = useState([]);
  const [reviewData3, setReviewData3] = useState([]);
  const [loadingVar, setLoadingVar] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setLoadingVar((p) => {
        if (p == 3) {
          return 0;
        } else {
          return p + 1;
        }
      });
    }, 8000);
    reviewDataFun();
  }, []);

  async function reviewDataFun() {
    await axios
      .get("https://boiling-harbor-25090.herokuapp.com/reviewdata", {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((data) => {
        let starObject = data.data;
        setReviewData([
          starObject.star1,
          starObject.star2,
          starObject.star3,
          starObject.star4,
        ]);
        setReviewData2([
          starObject.name1,
          starObject.name2,
          starObject.name3,
          starObject.name4,
        ]);
        setReviewData3([
          starObject.description1,
          starObject.description2,
          starObject.description3,
          starObject.description4,
        ]);
      });
  }

  async function saveData(e) {
    await axios
      .post("/register/student", newStudent, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((data) => {
        console.log(data);
      });
  }

  async function saveDataTeacher(e) {
    await axios
      .post("./register/teacher", newTeacher, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((data) => {
        console.log(data);
      });
  }

  const handleChangeCheck = (event) => {
    setChecked(event.target.checked);
  };

  const runReviewCallback = (cb) => {
    return cb();
  };

  return (
    <>
      <Head>
        <title>Patna Home Tuitions</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={styles.main_container}>
        <NavBar />
        <div className={styles.top_container}>
          <img src="/images/verified.png" className={styles.verified} />
          <h className={styles.title}>Patna Best Home Tuition Service</h>
          <div className={styles.bulbContainer}>
            <img src="/images/bulb.png" className={styles.bulb} />
          </div>
          <div className={styles.formContainer}>
            <Formik
              initialValues={{
                name: "",
                class: "",
                contact: "",
                address: "",
                school: "",
              }}
              validationSchema={Yup.object({
                name: Yup.string()
                  .max(20, "Very Long Name")
                  .required("Required"),
                class: Yup.string()
                  .max(10, "Must be 10 characters or less")
                  .required("Required"),
                contact: Yup.number()
                  .test("len", "Min 10 digits", (val) => {
                    return val !== undefined ? val.toString().length >= 10 : "";
                  })
                  .required("Required"),
                address: Yup.string().required("Required"),
                school: Yup.string().required("Required"),
              })}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                setLoadingSave(true);
                await axios
                  .post(
                    "https://boiling-harbor-25090.herokuapp.com/register/student",
                    values,
                    {
                      headers: {
                        "content-type": "application/json",
                      },
                    }
                  )
                  .then((data) => {
                    setTimeout(() => {
                      // alert(JSON.stringify(values, null, 2));
                      alert("Form Submitted");
                      resetForm();
                      setSubmitting(false);
                      setLoadingSave(false);
                    }, 2000);
                  });
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <form className={styles.formBox} onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="Student's Name"
                    name="name"
                    id="name"
                    // onChange={(e) => {
                    //   setNewStudent((prev) => {
                    //     return {
                    //       ...prev,
                    //       student_name: e.target.value,
                    //     };
                    //   });
                    // }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  ></input>
                  {errors.name && touched.name && (
                    <div className={styles.error_form}>{errors.name}</div>
                  )}
                  <input
                    name="class"
                    type="text"
                    placeholder="Class of Student"
                    id="class"
                    // onChange={(e) => {
                    //   setNewStudent((prev) => {
                    //     return {
                    //       ...prev,
                    //       class: e.target.value,
                    //     };
                    //   });
                    // }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.class}
                  ></input>
                  {errors.class && touched.class && (
                    <div className={styles.error_form}>{errors.class}</div>
                  )}
                  <input
                    name="contact"
                    id="contact"
                    type="number"
                    placeholder="Contact Number"
                    // onChange={(e) => {
                    //   setNewStudent((prev) => {
                    //     return {
                    //       ...prev,
                    //       contact: e.target.value,
                    //     };
                    //   });
                    // }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.contact}
                  ></input>
                  {errors.contact && touched.contact && (
                    <div className={styles.error_form}>{errors.contact}</div>
                  )}
                  <input
                    name="address"
                    id="address"
                    type="text"
                    placeholder="Address of Student"
                    // onChange={(e) => {
                    //   setNewStudent((prev) => {
                    //     return {
                    //       ...prev,
                    //       address: e.target.value,
                    //     };
                    //   });
                    // }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address}
                  ></input>
                  {errors.address && touched.address && (
                    <div className={styles.error_form}>{errors.address}</div>
                  )}
                  <input
                    name="school"
                    id="school"
                    type="text"
                    placeholder="School of Student"
                    // onChange={(e) => {
                    //   setNewStudent((prev) => {
                    //     return {
                    //       ...prev,
                    //       school_name: e.target.value,
                    //     };
                    //   });
                    // }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.school}
                  ></input>
                  {errors.school && touched.school && (
                    <div className={styles.error_form}>{errors.school}</div>
                  )}
                  {!loadingSave ? (
                    <input
                      type="submit"
                      disabled={isSubmitting}
                      className={styles.btn}
                      // onClick={saveData}
                    ></input>
                  ) : (
                    <Box sx={{ display: "block", margin: "auto" }}>
                      <CircularProgress />
                    </Box>
                  )}
                </form>
              )}
            </Formik>
          </div>
        </div>
        <div className={styles.middle_container}>
          <div className={styles.card_container}>
            <Card className={styles.card1} sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image="images/edimage1.jpg"
                alt="image"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  className={styles.text}
                >
                  One-To-One Attention
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className={styles.description}
                >
                  We give one-to-one individual attention with 100% focuses on
                  exams and grades.
                </Typography>
              </CardContent>
            </Card>

            <Card className={styles.card2} sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image="images/edimage2.png"
                alt="image"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  className={styles.text}
                >
                  Motivational Classes
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className={styles.description}
                >
                  Our motivational class boost confidence level and also
                  develops logical understanding of students.
                </Typography>
              </CardContent>
            </Card>

            <Card
              className={styles.card3}
              sx={{ maxWidth: 345, backgroundColor: "#ff9a76" }}
            >
              <CardMedia
                component="img"
                height="140"
                image="images/edimage3.png"
                alt="image"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  className={styles.text}
                >
                  Performance analysis
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className={styles.description}
                >
                  We regularly track the performance of student after providing
                  home tuition which helps them in increasing performance.
                </Typography>
              </CardContent>
            </Card>
          </div>
        </div>

        <Rotate top left>
          <div className={styles.subject_details1}>
            <div className={styles.text_content}>
              <h className={styles.text_heading}>Learn and Grow</h>
              <p className={styles.text_para}>
                The point of teaching or tutoring is not to fill the student’s
                mind with a bunch of knowledge but to get him or her excited
                about learning and about the opportunities that are before them
                when they have learned something new.
              </p>
            </div>
            <div className={styles.image_cover}>
              <img src="images/education.png" className={styles.learn_image} />
            </div>
          </div>
        </Rotate>
        <Rotate top right>
          <div className={styles.subject_details2}>
            <div className={styles.image_cover}>
              <img src="images/education2.png" className={styles.learn_image} />
            </div>
            <div className={styles.text_content}>
              <h className={styles.text_heading}>Be The Best of Yourself</h>
              <p className={styles.text_para}>
                You are unique. You have different talents and abilities. You
                donot have to always follow in the footsteps of others. And most
                important, you should always remind yourself that you donot have
                to do what everyone else is doing and have a responsibility to
                develop the talents you have been given.
              </p>
            </div>
          </div>
        </Rotate>
        <Rotate top left>
          <div className={styles.subject_details3}>
            <div className={styles.text_content}>
              <h className={styles.text_heading}>
                Work Hard In Proper Guidance
              </h>
              <p className={styles.text_para}>
                Most of us love Cinderella stories about companies that turned
                into overnight sensations. We love the idea of making a lot of
                money without working too hard, but we fail to acknowledge that
                overnight successes usually don’t happen overnight.
              </p>
            </div>
            <div className={styles.image_cover}>
              <img src="images/education3.png" className={styles.learn_image} />
            </div>
          </div>
        </Rotate>

        <div className={styles.subject_container}>
          <Carousel variant="dark">
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="images/subject.png"
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="images/maths.png"
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="images/science.png"
                alt="Third slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="images/english.png"
                alt="Fourth slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="images/sst.png"
                alt="Fifth slide"
              />
            </Carousel.Item>
          </Carousel>
        </div>
        <div className={styles.register_tab} id="register">
          <div className={styles.switch_choose}>
            <FormGroup>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography>Student</Typography>
                <Switch
                  inputProps={{ "aria-label": "controlled" }}
                  onChange={handleChangeCheck}
                />
                <Typography>Teacher</Typography>
              </Stack>
            </FormGroup>
          </div>
          {checked ? (
            <div className={styles.register_teacher}>
              <div className={styles.formContainer}>
                <Formik
                  initialValues={{
                    name: "",
                    qualification: "",
                    contact: "",
                    city: "",
                    subjects: "",
                  }}
                  validationSchema={Yup.object({
                    name: Yup.string()
                      .max(20, "Very Long Name")
                      .required("Required"),
                    qualification: Yup.string().required("Required"),
                    contact: Yup.number()
                      .test("len", "Min 10 digits", (val) => {
                        return val !== undefined
                          ? val.toString().length >= 10
                          : "";
                      })
                      .required("Required"),
                    city: Yup.string().required("Required"),
                    subjects: Yup.string().required("Required"),
                  })}
                  onSubmit={async (values, { setSubmitting, resetForm }) => {
                    setLoadingSave(true);
                    await axios
                      .post(
                        "https://boiling-harbor-25090.herokuapp.com/register/teacher/",
                        values,
                        {
                          headers: {
                            "content-type": "application/json",
                          },
                        }
                      )
                      .then((data) => {
                        setTimeout(() => {
                          alert("Form Submitted");
                          setSubmitting(false);
                          setLoadingSave(false);
                          resetForm();
                        }, 2000);
                      });
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                  }) => (
                    <form className={styles.formBox} onSubmit={handleSubmit}>
                      <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        id="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                      ></input>
                      {errors.name && touched.name && (
                        <div className={styles.error_form}>{errors.name}</div>
                      )}
                      <input
                        name="qualification"
                        type="text"
                        placeholder="Highest Qualification"
                        id="qualification"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.qualification}
                      ></input>
                      {errors.qualification && touched.qualification && (
                        <div className={styles.error_form}>
                          {errors.qualification}
                        </div>
                      )}
                      <input
                        name="contact"
                        id="contact"
                        type="number"
                        placeholder="Contact Number"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.contact}
                      ></input>
                      {errors.contact && touched.contact && (
                        <div className={styles.error_form}>
                          {errors.contact}
                        </div>
                      )}
                      <input
                        name="city"
                        id="city"
                        type="text"
                        placeholder="City"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.city}
                      ></input>
                      {errors.city && touched.city && (
                        <div className={styles.error_form}>{errors.city}</div>
                      )}
                      <input
                        name="subjects"
                        id="subjects"
                        type="text"
                        placeholder="Expertise Subjects"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.subjects}
                      ></input>
                      {errors.subjects && touched.subjects && (
                        <div className={styles.error_form}>
                          {errors.subjects}
                        </div>
                      )}
                      {!loadingSave ? (
                        <input
                          type="submit"
                          disabled={isSubmitting}
                          className={styles.btn}
                        ></input>
                      ) : (
                        <Box sx={{ display: "block", margin: "auto" }}>
                          <CircularProgress />
                        </Box>
                      )}
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          ) : (
            <div className={styles.register_student}>
              <div className={styles.formContainer}>
                <Formik
                  initialValues={{
                    name: "",
                    class: "",
                    contact: "",
                    address: "",
                    school: "",
                  }}
                  validationSchema={Yup.object({
                    name: Yup.string()
                      .max(20, "Very Long Name")
                      .required("Required"),
                    class: Yup.string()
                      .max(10, "Must be 10 characters or less")
                      .required("Required"),
                    contact: Yup.number()
                      .test("len", "Min 10 digits", (val) => {
                        return val !== undefined
                          ? val.toString().length >= 10
                          : "";
                      })
                      .required("Required"),
                    address: Yup.string().required("Required"),
                    school: Yup.string().required("Required"),
                  })}
                  onSubmit={async (values, { setSubmitting, resetForm }) => {
                    setLoadingSave(true);
                    await axios
                      .post(
                        "https://boiling-harbor-25090.herokuapp.com/register/student",
                        values,
                        {
                          headers: {
                            "content-type": "application/json",
                          },
                        }
                      )
                      .then((data) => {
                        setTimeout(() => {
                          alert("Form Submitted");
                          resetForm();
                          setSubmitting(false);
                          setLoadingSave(false);
                        }, 2000);
                      });
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                  }) => (
                    <form className={styles.formBox} onSubmit={handleSubmit}>
                      <input
                        type="text"
                        placeholder="Student's Name"
                        name="name"
                        id="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                      ></input>
                      {errors.name && touched.name && (
                        <div className={styles.error_form}>{errors.name}</div>
                      )}
                      <input
                        name="class"
                        type="text"
                        placeholder="Class of Student"
                        id="class"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.class}
                      ></input>
                      {errors.class && touched.class && (
                        <div className={styles.error_form}>{errors.class}</div>
                      )}
                      <input
                        name="contact"
                        id="contact"
                        type="number"
                        placeholder="Contact Number"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.contact}
                      ></input>
                      {errors.contact && touched.contact && (
                        <div className={styles.error_form}>
                          {errors.contact}
                        </div>
                      )}
                      <input
                        name="address"
                        id="address"
                        type="text"
                        placeholder="Address of Student"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.address}
                      ></input>
                      {errors.address && touched.address && (
                        <div className={styles.error_form}>
                          {errors.address}
                        </div>
                      )}
                      <input
                        name="school"
                        id="school"
                        type="text"
                        placeholder="School of Student"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.school}
                      ></input>
                      {errors.school && touched.school && (
                        <div className={styles.error_form}>{errors.school}</div>
                      )}
                      {!loadingSave ? (
                        <input
                          type="submit"
                          disabled={isSubmitting}
                          className={styles.btn}
                        ></input>
                      ) : (
                        <Box sx={{ display: "block", margin: "auto" }}>
                          <CircularProgress />
                        </Box>
                      )}
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          )}
        </div>
        <div className={styles.middle_container}>
          <Zoom top>
            <div className={styles.card_container}>
              <Card className={styles.card1} sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image="images/edimage4.jpg"
                  alt="image"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    className={styles.text}
                  >
                    We are the Best
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    className={styles.description}
                  >
                    To give real service you must add something which cannot be
                    bought or measured with money, and that is sincerity and
                    integrity.
                  </Typography>
                </CardContent>
              </Card>

              <Card className={styles.card2} sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image="images/edimage2.png"
                  alt="image"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    className={styles.text}
                  >
                    Register as a Teacher
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    className={styles.description}
                  >
                    People who are wanting to register as a Teacher can also
                    register by clicking on the register tab and toggling to
                    Teacher switch.
                  </Typography>
                </CardContent>
              </Card>

              <Card
                className={styles.card3}
                sx={{ maxWidth: 345, backgroundColor: "#ff9a76" }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image="images/edimage3.png"
                  alt="image"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    className={styles.text}
                  >
                    Nursery to 12th
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    className={styles.description}
                  >
                    We give tuition from class nursery to 12th for every subject
                    possibly present.
                  </Typography>
                </CardContent>
              </Card>
            </div>
          </Zoom>
        </div>
        <div className={styles.review_customers}>
          <div className={styles.review_details}>
            <Slide left>
              <div className={styles.text_content}>
                <h className={styles.text_heading}>{reviewData2[loadingVar]}</h>
                <div className={styles.stars_cover}>
                  {runReviewCallback(() => {
                    const row = [];
                    for (var i = 0; i < reviewData[loadingVar]; i++) {
                      row.push(
                        <div className={styles.image_star}>
                          <img
                            src="images/star.png"
                            className={styles.star_image}
                          />
                        </div>
                      );
                    }
                    return row;
                  })}
                </div>
                <p className={styles.text_para}>{reviewData3[loadingVar]}</p>
              </div>
            </Slide>

            <Slide right>
              <div className={styles.image_cover}>
                <img src="images/choose.png" className={styles.learn_image} />
              </div>
            </Slide>
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
