import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
};

const spinTransition = {
  duration: 1.3,
  ease: "linear",
  repeat: Infinity,
};

const animate = { rotate: 360 };

export const Spinner = (props: Props) => {
  const { className } = props;

  return (
    <motion.svg
      className={twMerge("size-6 text-white", className)}
      viewBox="0 0 200 200"
      fill="none"
      animate={animate}
      transition={spinTransition}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="spinner-secondHalf">
          <stop offset="0%" stopOpacity="0" stopColor="currentColor" />
          <stop offset="100%" stopOpacity="0.5" stopColor="currentColor" />
        </linearGradient>
        <linearGradient id="spinner-firstHalf">
          <stop offset="0%" stopOpacity="1" stopColor="currentColor" />
          <stop offset="100%" stopOpacity="0.5" stopColor="currentColor" />
        </linearGradient>
      </defs>

      <g strokeWidth="8">
        <path
          stroke="url(#spinner-secondHalf)"
          d="M 4 100 A 96 96 0 0 1 196 100"
        />
        <path
          stroke="url(#spinner-firstHalf)"
          d="M 196 100 A 96 96 0 0 1 4 100"
        />

        <path
          stroke="currentColor"
          strokeLinecap="round"
          d="M 4 100 A 96 96 0 0 1 4 98"
        />
      </g>

      {/* <animateTransform
        from="0 0 0"
        to="360 0 0"
        attributeName="transform"
        type="rotate"
        repeatCount="indefinite"
        dur="1300ms"
      /> */}
    </motion.svg>
  );
};
