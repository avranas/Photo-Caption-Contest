import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
const serverUrl = process.env.REACT_APP_SERVER_URL;

const CaptionPage = () => {
  const [images, setImages] = useState([]);
  const [imageLocation, setImageLocation] = useState(null);
  const [captions, setCaptions] = useState([]);
  const [newCaptionInput, setNewCaptionInput] = useState("");
  const { index } = useParams();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const checkAuthenticated = async () => {
      const response = await axios("/authenticated");
      if (response.data) {
        const userData = await axios("/users/current");
        setUsername(userData.data.username);
      }
    };
    checkAuthenticated();
  }, []);

  useEffect(() => {
    const fetchAllImages = async () => {
      const response = await axios(`/server-images/`);
      const newImagesData = [...response.data];
      setImages(newImagesData);
    };
    fetchAllImages();
  }, []);

  const fetchImage = useCallback(async () => {
    if (images.length === 0) {
      return;
    }

    const response = await axios(`/server-images/${images[index - 1].id}`);
    setImageLocation(response.data.imageLocation);
    setCaptions(response.data.captions);
  }, [images, index]);

  useEffect(() => {
    setNewCaptionInput("");
    fetchImage();
  }, [index, images, fetchImage]);

  const handleSubmit = async (e) => {
    try {
      if (newCaptionInput === "") {
        alert("This field can not be empty");
        return;
      }
      const requestBody = {
        new_caption: newCaptionInput,
        image_id: images[index - 1].id,
      };
      setNewCaptionInput("");
      await axios.post("/captions", requestBody);
      await fetchImage();
    } catch (err) {
      console.log(err);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleNewCaptionChange = (e) => {
    if (e.target.value.length > 256) {
      return;
    }
    setNewCaptionInput(e.target.value);
  };

  return (
    <main id="caption-page">
      {username !== "" && <h1>Hello {username}</h1>}
      <h2>
        <Link to="/logout">Logout</Link>
      </h2>
      <h3>Select image</h3>
      <ul id="image-selection">
        {images.map((i, key) => {
          return (
            <li key={key}>
              <Link to={`/caption-page/${key + 1}`}> {key + 1}</Link>
            </li>
          );
        })}
      </ul>
      {imageLocation !== null && (
        <img
          id="caption-image"
          alt="caption this"
          src={`${serverUrl}/images/${imageLocation}`}
        />
      )}
      <div id="new-caption-text">
        <label>New caption</label>
        <input
          type="text"
          className="form-control"
          value={newCaptionInput}
          onChange={handleNewCaptionChange}
          onKeyUp={handleKeyPress}
        />
      </div>
      <div id="new-caption-button">
        <button
          id="new-caption-button"
          className="important-button"
          type="submit"
          value="Submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      <ul id="captions-list">
        {captions.map((i, key) => {
          return (
            <li key={key}>
              <strong>{i.user}:</strong> {i.caption}
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default CaptionPage;
