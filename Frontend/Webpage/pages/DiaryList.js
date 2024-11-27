import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Card from "/components/Card/Card.js";
import CardHeader from "/components/Card/CardHeader.js";
import CardBody from "/components/Card/CardBody.js";
import Button from "/components/CustomButtons/Button.js";
import Typography from "@mui/material/Typography";
import axiosInstance from "../api/axiosInstance";
import styles from "/styles/jss/nextjs-material-kit/pages/loginPage.js";
import Header from "/components/Header/Header.js";
import HeaderLinks from "/components/Header/HeaderLinks.js";

const useStyles = makeStyles(styles);

const DiaryList = (props) => {
  const classes = useStyles();
  const { ...rest } = props;
  const [diaries, setDiaries] = useState([]);

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const response = await axiosInstance.get("/diary/detail/");
        setDiaries(response.data.results || []);
      } catch (error) {
        console.error("Error fetching diaries:", error);
        setDiaries([]);
      }
    };

    fetchDiaries();
  }, []);

  return (
    <>
    <Header
        absolute
        color="transparent"
        brand="Deer AI Diary"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
    <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url('/img/bg7.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
      <div className={classes.section}>
        <div className={classes.container}>
          <GridContainer justify="center">
            {diaries.length === 0 ? (
              <Typography variant="h6" align="center" style={{ marginTop: "20px",fontWeight:'bold'}}>
                아직 일기를 작성하지 않으셨습니다! 일기를 작성하러 가보세요!
              </Typography>
            ) : (
              
              diaries.map((diary) => (
                <GridItem key={diary.id} xs={12} sm={6} md={4}>
                  <Card>
                    <CardHeader color="primary">{diary.title}</CardHeader>
                    <CardBody>
                      <p>{diary.content.substring(0, 100)}...</p>
                      <Button color="primary" href={`/diaryList/${diary.id}`}>
                        일기 보기
                      </Button>
                    </CardBody>
                  </Card>
                </GridItem>
              ))
            )}
          </GridContainer>
        </div>
      </div>
    </div>
    </>
  );
};

export default DiaryList;
