import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Dropzone from "react-dropzone";
import axios from "axios";
import { useSelector } from "react-redux";
import { Typography, Form, Button, message, Input, Icon } from "antd";

const { Title } = Typography;
const { TextArea } = Input;

const Private = [
  { value: 0, label: "Private" },
  { value: 1, label: "Public" },
];

const Category = [
  { value: 0, label: "Film & Animation" },
  { value: 0, label: "Autos & Vehicles" },
  { value: 0, label: "Music" },
  { value: 0, label: "Pets & Animals" },
  { value: 0, label: "Sports" },
];

const UploadVideoPage = () => {
  const history = useHistory();
  const user = useSelector((state) => state.user);

  const [title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Privacy, setPrivacy] = useState(0);
  const [category, setCategory] = useState("film & animation");
  const [FilePath, setFilePath] = useState("");
  const [Duration, setDuration] = useState("");
  const [Thumbnail, setThumbnail] = useState("");

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleChangeOne = (event) => {
    setPrivacy(event.target.value);
  };
  const handleChangeTwo = (event) => {
    setCategory(event.target.value);
  };

  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    console.log(files);
    formData.append("file", files[0]);

    axios.post("/api/video/uploadfiles", formData, config).then((response) => {
      if (response.data.success) {
        let variable = {
          filePath: response.data.filePath,
          fileName: response.data.filename,
        };
        setFilePath(response.data.filePath);

        //generate thumbnail with the filter

        axios.post("/api/video/thumbnail", variable).then((response) => {
          if (response.data.success) {
            console.log(response.data);
            setDuration(response.data.fileDuration);
            setThumbnail(response.data.thumbsFilePath);
          } else {
            alert("Failed to make the thumbnails");
          }
        });
      } else {
        alert("failed to save the video in servetr");
      }
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    // if (user.userData && !user.userData.isAuth) {
    //   return alert("Please log in first");
    // }

    if (
      title === "" ||
      Description === "" ||
      category === "" ||
      FilePath === "" ||
      Duration === "" ||
      Thumbnail === ""
    ) {
      return alert("First enter all the field required...");
    }
    const variable = {
      writer: user.userData._id,
      title: title,
      description: Description,
      privacy: Privacy,
      filePath: FilePath,
      category: category,
      duration: Duration,
      thumbnail: Thumbnail,
    };

    axios.post("/api/video/uploadVideo", variable).then((response) => {
      if (response.data.success) {
        alert("video Uploaded Successfully");
        history.push("/");
      } else {
        alert("Failed to upload video");
      }
    });
    // fetch("/api/video/uploadVideo", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(variable),
    // }).then((response) => {
    //   console.log(response);
    //   if (response.data.success) {
    //     alert("video Uploaded Successfully");
    //     history.push("/");
    //   } else {
    //     alert("Failed to upload video");
    //   }
    // });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}>Upload Video</Title>
      </div>

      <Form onSubmit={onSubmit}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Dropzone multiple={false} maxSize={800000000} onDrop={onDrop}>
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: "300px",
                  height: "240px",
                  border: "1px solid lightgray",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                {...getRootProps()}
              >
                <Input {...getInputProps()} />
                <Icon type="plus" style={{ fontsize: "3rem" }} />
              </div>
            )}
          </Dropzone>
          {Thumbnail !== "" && (
            <div>
              <img src={`http://localhost:5000/${Thumbnail}`} alt="haha" />
            </div>
          )}
        </div>
        <br />
        <br />
        <label>Title</label>
        <Input onChange={handleChangeTitle} value={title} />
        <br />
        <br />
        <label>Description</label>
        <TextArea onChange={handleChangeDescription} value={Description} />
        <br />
        <br />
        <select
          onChange={handleChangeOne}
          style={{
            border: "1px solid blue",
            borderRadius: "5px",
            padding: "4px",
          }}
        >
          {Private.map((item, index) => (
            <option key={index} value={item.label}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />
        <select
          onChange={handleChangeTwo}
          style={{
            border: "1px solid blue",
            borderRadius: "5px",
            padding: "4px",
          }}
        >
          {Category.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button type="primary" size="large" onClick={onSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default UploadVideoPage;
