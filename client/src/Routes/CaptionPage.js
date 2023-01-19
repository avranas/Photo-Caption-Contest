import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
const serverUrl = process.env.REACT_APP_SERVER_URL;

const CaptionPage = (props) => {
  const [images, setImages] = useState([]);
  const [imageLocation, setImageLocation] = useState(null);
  const [captions, setCaptions] = useState([]);
  const [newCaptionInput, setNewCaptionInput] = useState("");
  const { index } = useParams();

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
    setNewCaptionInput(e.target.value);
  };

  return (
    <div>
      <p>Hello {props.username}</p>
      <p>This is the caption page</p>
      <ul>
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
      <input
        type="text"
        id="username"
        name="username"
        className="form-control"
        value={newCaptionInput}
        onChange={handleNewCaptionChange}
        onKeyUp={handleKeyPress}
      />
      <button
        className="important-button"
        type="submit"
        value="Submit"
        onClick={handleSubmit}
      >
        Submit
      </button>
      <ul>
        {captions.map((i, key) => {
          return (
            <li key={key}>
              {i.user}: {i.caption}
            </li>
          );
        })}
      </ul>
      <p>
        <Link to="/logout">Logout</Link>
      </p>
    </div>
  );
};

export default CaptionPage;
