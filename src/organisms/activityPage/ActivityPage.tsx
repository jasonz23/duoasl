import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import Button from "~/atoms/button/Button";
import Tabs from "~/atoms/tabs/Tabs";
import useWindowSize from "~/hooks/useWindowSize/useWindowSize";

const ACTIVITIES = [
  {
    question: "",
    video: "",
  },
  {
    question: "hello",
    video: "https://www.youtube.com/embed/SsLvqfTXo78?si=UhFlIVhjCkBRAb0y",
  },
  {
    question: "Thank you",
    video: "https://www.youtube.com/embed/EPlhDhll9mw?si=ErodMi_DZMjnH81Q",
  },
  {
    question: "I Love You",
    video: "https://www.youtube.com/embed/kN1fIgAaGHo?si=i0y6cJ34nSbjkTJ0",
  },
];

const SuccessModal = () => {
  const router = useRouter();
  return (
    <div className="absolute left-1/2 top-1/2 flex h-1/2 w-full -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center gap-3 rounded-lg border-2 border-black bg-white sm:w-1/2">
      <div className="">You Did It!</div>
      <Image
        src="/images/frog/main-frog.png"
        alt="success"
        width={100}
        height={100}
      />
      <Button
        onClick={() => {
          router.push("/");
        }}
      >
        Back To HomePage
      </Button>
    </div>
  );
};

const FailedModal = () => {
  const router = useRouter();
  return (
    <div className="absolute left-1/2 top-1/2 flex h-1/2 w-full -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center gap-3 rounded-lg border-2 border-black bg-white sm:w-1/2">
      <div className="">Not Quite Right</div>
      <Image
        src="/images/frog/failed.png"
        alt="success"
        width={100}
        height={100}
      />
      <Button
        onClick={() => {
          router.push("/");
        }}
      >
        Back To HomePage
      </Button>
    </div>
  );
};

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
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);
  const [showFailedModal, setShowFailedModal] = React.useState(false);
  const [tab, setTab] = React.useState(1);
  const { isMobile } = useWindowSize();

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
    <main className="relative flex h-screen w-screen flex-col items-center gap-3 pt-20">
      {showSuccessModal && <SuccessModal />}
      {showFailedModal && <FailedModal />}
      <div>Activity {activityId}</div>
      <div>
        How do you sign{" "}
        <span className="text-green-600">{ACTIVITIES[id]?.question}</span> ?
      </div>
      <Tabs
        selectedTab={tab}
        tabNames={["Learn", "Practice"]}
        setSelectedTab={(e: number) => {
          setTab(e);
        }}
      />
      {tab === 1 && (
        <div className="flex flex-col gap-3 pt-14 sm:pt-16">
          <iframe
            width={isMobile ? "100%" : "560"}
            height="315"
            src={ACTIVITIES[id]?.video}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          <Button
            onClick={() => {
              setTab(2);
            }}
          >
            Practice
          </Button>
        </div>
      )}
      {tab === 2 && (
        <div className="flex flex-col items-center gap-3">
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
          {recordedChunks.length > 0 && (
            <Button onClick={submit}>Submit</Button>
          )}
        </div>
      )}
    </main>
  );
};

export default ActivityPage;
