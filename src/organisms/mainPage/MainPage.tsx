import { animated, useSpring } from "@react-spring/web";
import Image from "next/image";

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
  return (
    <main
      className="bg-fill h-screen w-screen bg-center bg-no-repeat"
      style={{
        backgroundImage: "url(/images/backgrounds/main-background.png)",
      }}
    >
      <animated.button
        className="absolute right-[38%] top-[10%]"
        style={lilyPageAnimation}
      >
        <LilyPadImage />
      </animated.button>
      <animated.button
        className="absolute left-[42%] top-[25%]"
        style={lilyPageAnimation}
      >
        <LilyPadImage />
      </animated.button>
      <animated.button
        className="absolute right-[35%] top-[40%]"
        style={lilyPageAnimation}
      >
        <LilyPadImage />
      </animated.button>
      <animated.button
        className="absolute right-[48%] top-[50%]"
        style={lilyPageAnimation}
      >
        <LilyPadImage />
      </animated.button>
      <animated.button
        className="absolute left-[35%] top-[59%]"
        style={lilyPageAnimation}
      >
        <LilyPadImage />
      </animated.button>
      <animated.button
        className="absolute left-[51%] top-[68%]"
        style={lilyPageAnimation}
      >
        <LilyPadImage />
      </animated.button>
      <animated.button
        className="absolute left-[60%] top-[80%]"
        style={lilyPageAnimation}
      >
        <LilyPadImage />
      </animated.button>
    </main>
  );
};

export default MainPage;
