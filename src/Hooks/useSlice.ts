import { useState } from "react";

export const useSlice = () => {
  const [slide, setSlide] = useState({
    slideActive: false,
    slideTimer: null,
    slideDuration: 3000,
  });
  const onSlideChange = () => {
    const { slideActive } = slide;
    setSlide({
      ...slide,
      slideActive: !slideActive,
    });
  };
  const slideChange = (
    autoPlay: React.MutableRefObject<number | undefined>,
    nextClick: () => void
  ) => {
    const { slideActive, slideDuration } = slide;
    if (slideActive) {
      autoPlay.current = setTimeout(() => {
        nextClick();
      }, slideDuration);
    } else {
      clearTimeout(autoPlay.current);
    }
  };
  return { slide, onSlideChange, slideChange };
};
