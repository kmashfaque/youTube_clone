import React, { useEffect, useState } from "react";
import { List, Avatar, Row, Col } from "antd";
import axios from "axios";
import SideVideo from "./Sections/SideVideo";
import Subscriber from "./Sections/Subscriber";

const DetailVideoPage = (props) => {
  const videoId = props.match.params.videoId;

  const [Video, setVideo] = useState([]);

  const videoVariable = {
    videoId: videoId,
  };

  useEffect(() => {
    axios.post("/api/video/getVideo", videoVariable).then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setVideo(response.data.video);
      } else {
        alert("Failsed to get video info");
      }
    });
  }, []);

  if (Video.writer) {
    return (
      <Row>
        <Col lg={18} xs={24}>
          <div
            className="postPage"
            style={{ width: "100%", padding: "3rem 4rem" }}
          >
            <video
              style={{ width: "100%" }}
              src={`http://localhost:5000/${Video.filePath}`}
              controls
            ></video>

            <List.Item
              actions={[
                //   <Listdisklikes
                //     video
                //     videoId={postId}
                //     userId={localStorage.getItem("userId")}
                //   />,
                <Subscriber
                  userTo={Video.writer._id}
                  userForm={localStorage.getItem("userId")}
                />,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={Video.writer && Video.writer.image} />}
                title={<a href="htttps://ant.design">{Video.title}</a>}
                description={Video.description}
              />
              <div></div>
              {/* <Comments CommentLists={CommentLists} postId={Video._id} refreshFunction={ updateComment}/> */}
            </List.Item>
          </div>
        </Col>
        <Col lg={6} xs={24}>
          <SideVideo />
        </Col>
      </Row>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Loading...
      </div>
    );
  }
};

export default DetailVideoPage;
