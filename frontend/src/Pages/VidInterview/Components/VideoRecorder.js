import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import '../Styles/recorder.styles.css';  // Custom CSS if needed
import { Link ,useNavigate} from 'react-router-dom';

function VideoRecorder() {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [recordedVideo, setRecordedVideo] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Error accessing webcam: ", err);
      }
    }
    startCamera();
  }, []);

  const startRecording = () => {
    setRecordedChunks([]);

    const stream = videoRef.current.srcObject;
    const recorder = new MediaRecorder(stream);

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setRecordedChunks((prev) => [...prev, event.data]);
      }
    };

    recorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      setRecordedVideo(url);
    };

    recorder.start();
    setMediaRecorder(recorder);
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const resetRecording = () => {
    setRecordedChunks([]);
    setRecordedVideo(null);
  };


  const submitVideo = async () => {
    try {
      const formData = new FormData();
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      formData.append('user', 'YourUserName');  // Add other data as needed
      formData.append('video', blob, 'recorded-video.mp4');

      // Make the API call to submit the video
      const response = await axios.post('http://127.0.0.1:8000/api/upload-video/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201 || response.status===200) {
        console.log('Video submitted successfully:', response.data);
        alert('Video submitted successfully!');
        navigate('/');
      } else {
        console.error('Failed to submit video:', response.data);
        alert('Failed to submit video. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting video:', error);
      alert('An error occurred while submitting the video.');
    }
  };

  return (
    <Container className="my-5">
      <Card>
        <Card.Header className="text-center">
          <h4>Question 1 of 1</h4>
          <p>Tell Us About What's On Your Mind</p>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={8}>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{ width: '100%', height: 'auto', backgroundColor: 'black' }}
              />
              <div className="mt-3 text-center">
                {isRecording ? (
                  <Button variant="danger" onClick={stopRecording}>Stop Recording</Button>
                ) : (
                  <Button variant="primary" onClick={startRecording}>Start Recording</Button>
                )}
                <Button
                  variant="secondary"
                  onClick={resetRecording}
                  disabled={isRecording || !recordedVideo}
                  className="ms-2"
                >
                  Retry
                </Button>
              </div>
            </Col>
            <Col md={4} className="d-flex flex-column align-items-center">
              {recordedVideo && (
                <>
                  <h5 className="mb-3">Video Response</h5>
                  <video
                    src={recordedVideo}
                    controls
                    style={{ width: '100%', height: 'auto', backgroundColor: 'black' }}
                  />
                  {/* <Link to='/'> */}
                  <Button 
                    variant="success" 
                    onClick={submitVideo} 
                    className="mt-3"
                  >
                    Submit Your Video
                  </Button>
                  {/* </Link> */}
                </>
              )}
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer className="text-center">
          <small>Take a deep breath and relax! Be yourself and tell us about what's bothering you.</small>
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default VideoRecorder;
