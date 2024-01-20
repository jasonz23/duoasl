import { animated, useSpring } from "@react-spring/web";
import Image from "next/image";
import { useRouter } from "next/router";

const LilyPadImage = () => {
  return (
    <Image
      className="hover:scale-[110%]"
      src="/images/items/lily-pad.png"
      alt="lily-pad"
      width={100}
      height={100}
    />
  );
};

const FrogImage = () => {
  return (
    <div className="absolute -top-8 z-10 hover:scale-110">
      <Image
        src="/images/frog/main-frog.png"
        alt="frog"
        width={100}
        height={100}
      />
    </div>
  );
};

const MainPage = () => {
  const lilyPageAnimation = useSpring({
    loop: true,
    from: { y: 0 },
    to: [
      { y: -6 }, // Move up by 10px
      { y: 0 }, // Then back to the original position
    ], // Move up by 10px
    config: {
      duration: 800, // Duration of each bounce
      friction: 10, // Adjust for more or less bouncy effect
    },
  });
  const router = useRouter();

  const goToActivity = (id: number) => {
    void router.push(`/activities/${id}`);
  };
  return (
    <main
      className="bg-fill h-screen w-screen bg-center bg-no-repeat"
      style={{
        backgroundImage: "url(/images/backgrounds/main-background.png)",
      }}
    >
      <animated.button
        className="absolute right-[10%] top-[10%] sm:right-[38%] sm:top-[10%]"
        style={lilyPageAnimation}
        onClick={() => goToActivity(1)}
      >
        <FrogImage />
        <LilyPadImage />
      </animated.button>
      <animated.button
        className="absolute left-[40%] top-[22%] sm:left-[42%] sm:top-[25%]"
        style={lilyPageAnimation}
        onClick={() => goToActivity(2)}
      >
        <LilyPadImage />
      </animated.button>
      <animated.button
        className="absolute top-[30%] sm:right-[35%] sm:top-[40%]"
        style={lilyPageAnimation}
        onClick={() => goToActivity(3)}
      >
        <LilyPadImage />
      </animated.button>
      <animated.button
        className="absolute right-[7%] top-[40%] sm:right-[48%] sm:top-[50%]"
        style={lilyPageAnimation}
        onClick={() => goToActivity(4)}
      >
        <LilyPadImage />
      </animated.button>
      <animated.button
        className="absolute left-[35%] top-[50%] sm:left-[35%] sm:top-[59%]"
        style={lilyPageAnimation}
        onClick={() => goToActivity(5)}
      >
        <LilyPadImage />
      </animated.button>
      <animated.button
        className="absolute left-[12%] top-[60%] sm:left-[51%] sm:top-[68%]"
        style={lilyPageAnimation}
        onClick={() => goToActivity(6)}
      >
        <LilyPadImage />
      </animated.button>
      <animated.button
        className="absolute right-[0%] top-[75%] sm:left-[60%] sm:top-[80%]"
        style={lilyPageAnimation}
        onClick={() => goToActivity(7)}
      >
        <LilyPadImage />
      </animated.button>
    </main>
  );
};

export default MainPage;
