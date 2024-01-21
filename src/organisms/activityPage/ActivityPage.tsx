import React, { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import Button from "~/atoms/button/Button";

const ACTIVITIES = [
  "",
  "How do you sign 'hello'?",
  "How do you sign 'goodbye'?",
];

interface ActivityPageProps {
  activityId: string;
}

const ActivityPage = (props: ActivityPageProps) => {
  const { activityId } = props;
  const id = parseInt(activityId, 10);
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [counter, setCounter] = React.useState(5);
  const [loadingCounter, setLoadingCounter] = React.useState(3);
  const [loadingCounterFlag, setLoadingCounterFlag] = React.useState(false);

  useEffect(() => {
    if (!loadingCounterFlag) {
      return;
    }
    counter > 0 &&
      setTimeout(() => setLoadingCounter(loadingCounter - 1), 1000);
    if (loadingCounter <= 0) {
      setLoadingCounterFlag(false);
    }
  }, [loadingCounter, loadingCounterFlag]);

  React.useEffect(() => {
    if (!capturing) {
      return;
    }
    counter > 0 && setTimeout(() => setCounter(counter - 0.01), 10);
    if (counter <= 0) {
      handleStopCaptureClick();
    }
  }, [counter, capturing]);

  const handleDataAvailable = useCallback(
    ({ data }: { data: any }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks],
  );

  const handleStartCaptureClick = () => {
    setLoadingCounterFlag(true);
    setLoadingCounter(3);
    setTimeout(() => {
      setCapturing(true);
      setCounter(5);
      // END: abpxx6d04wxr

      mediaRecorderRef.current = new MediaRecorder(webcamRef.current!.stream!, {
        mimeType: "video/webm",
      });
      mediaRecorderRef.current.addEventListener(
        "dataavailable",
        handleDataAvailable,
      );
      mediaRecorderRef.current.start();
    }, 3200);
  };

  const handleStopCaptureClick = () => {
    setCounter(5);
    mediaRecorderRef.current!.stop();
    setCapturing(false);
  };

  const reset = () => {
    setRecordedChunks([]);
  };

  const submit = async () => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      try {
        await fetch("http://localhost:8000/upload", {
          method: "POST",
          body: blob,
          headers: {
            "Content-Type": "video/mp4",
          },
        });
        setRecordedChunks([]);
      } catch (e) {
        console.error("failed");
      }
    }
  };

  return (
    <main className="flex h-screen w-screen flex-col items-center gap-3 pt-20">
      <div>Activity {activityId}</div>
      <div>{ACTIVITIES[id]}</div>
      <div className="relative">
        {loadingCounterFlag && loadingCounter > 0 && (
          <div className="absolute z-10 flex h-full w-full items-center justify-center bg-gray-800 opacity-75">
            <div className="z-20 text-7xl text-white">{loadingCounter}</div>
          </div>
        )}
        <Webcam audio={false} mirrored={true} ref={webcamRef} />
      </div>
      <div className="h-8 w-[80%]">
        <div
          style={{
            width: `${counter * 20}%`,
            background:
              "linear-gradient(76.5deg, rgb(129, 252, 255) 0.4%, rgb(255, 175, 207) 49.8%, rgb(255, 208, 153) 98.6%)",
          }}
          className="h-4 rounded-full"
        />
      </div>
      {capturing ? (
        <Button onClick={handleStopCaptureClick}>Stop Capture</Button>
      ) : (
        <Button onClick={handleStartCaptureClick}>Start Capture</Button>
      )}
      {recordedChunks.length > 0 && <Button onClick={reset}>Reset</Button>}
      {recordedChunks.length > 0 && <Button onClick={submit}>Submit</Button>}
    </main>
  );
};

export default ActivityPage;
