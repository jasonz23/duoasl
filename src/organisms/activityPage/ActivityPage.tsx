import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import Button from "~/atoms/button/Button";

interface ActivityPageProps {
  activityId: string;
}

const ActivityPage = (props: ActivityPageProps) => {
  const { activityId } = props;
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);

  const handleDataAvailable = useCallback(
    ({ data }: { data: any }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks],
  );

  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);
    // END: abpxx6d04wxr

    mediaRecorderRef.current = new MediaRecorder(webcamRef.current!.stream!, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable,
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable]);

  const handleStopCaptureClick = useCallback(() => {
    mediaRecorderRef.current!.stop();
    setCapturing(false);
  }, [mediaRecorderRef, setCapturing]);

  const reset = () => {
    setRecordedChunks([]);
  };

  const submit = () => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      setRecordedChunks([]);
    }
  };

  return (
    <main className="flex h-screen w-screen flex-col items-center gap-3 pt-20">
      <div>Activity {activityId}</div>
      <div>
        <Webcam audio={false} mirrored={true} ref={webcamRef} />
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
