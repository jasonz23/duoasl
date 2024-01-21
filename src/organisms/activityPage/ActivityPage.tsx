import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import { useRouter } from "next/router";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Webcam from "react-webcam";
import Button from "~/atoms/button/Button";
import Tabs from "~/atoms/tabs/Tabs";
import { UserContext } from "~/contexts/useUserContext";
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
    <div className="absolute left-1/2 top-1/2 z-50 flex h-1/2 w-full -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center gap-3 rounded-lg border-2 border-black bg-white sm:w-1/2">
      <div className="">You Did It!</div>
      <Image
        src="/images/frog/main-frog.png"
        alt="success"
        width={200}
        height={200}
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

interface FailedModalProps {
  closeModal: () => void;
  switchToLearn: () => void;
}
const FailedModal = (props: FailedModalProps) => {
  const { closeModal, switchToLearn } = props;

  return (
    <div className="absolute left-1/2 top-1/2 z-50 flex h-1/2 w-full -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center gap-3 rounded-lg border-2 border-black bg-white sm:w-1/2">
      <div className="">Not Quite Right</div>
      <Image
        src="/images/frog/failed.png"
        alt="success"
        width={200}
        height={200}
      />
      <div className="flex w-full justify-center gap-3">
        <Button onClick={switchToLearn}>Watch Video Again?</Button>
        <Button onClick={closeModal}>Retry?</Button>
      </div>
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
  const [submitLoading, setSubmitLoading] = React.useState(false);
  const { state, dispatch } = useContext(UserContext);
  const { user } = useUser();

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
      setSubmitLoading(true);
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      try {
        const res = await fetch(`http://localhost:8000/upload/${activityId}`, {
          method: "POST",
          body: blob,
          headers: {
            "Content-Type": "video/mp4",
          },
        });

        const data = await res.json();

        if (data.success) {
          const completed = [...state.completed, activityId];
          localStorage.setItem(user?.email!, JSON.stringify(completed));
          setShowSuccessModal(true);
        } else {
          setShowFailedModal(true);
        }
        setSubmitLoading(false);

        setRecordedChunks([]);
      } catch (e) {
        setShowFailedModal(true);
        console.error("failed");
      }
    }
  };

  return (
    <main className="relative flex h-screen w-screen flex-col items-center gap-3 pt-20">
      {showSuccessModal && <SuccessModal />}
      {showFailedModal && (
        <FailedModal
          closeModal={() => {
            setShowFailedModal(false);
          }}
          switchToLearn={() => {
            setTab(1);
            setShowFailedModal(false);
          }}
        />
      )}
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
            {submitLoading && (
              <div className="absolute z-10 flex h-full w-full items-center justify-center bg-gray-800 opacity-75">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
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
            <Button
              onClick={() => {
                submit();
              }}
            >
              Submit
            </Button>
          )}
        </div>
      )}
    </main>
  );
};

export default ActivityPage;
