import "./App.css";
import previousIcon from "./assets/icons/left-icon.png";
import nextIcon from "./assets/icons/right_icon.png";
import thumb1 from "./assets/images/thumb/tea-light-thumb.jpeg";
import thumb2 from "./assets/images/thumb/white-light-thumb.jpeg";
import thumb3 from "./assets/images/thumb/pink-light-thumb.jpeg";
import thumb4 from "./assets/images/thumb/tea-light-thumb.jpeg";
import image1 from "./assets/images/tea-light.jpeg";
import image2 from "./assets/images/white-light.jpeg";
import image3 from "./assets/images/pink-light.jpeg";
import image4 from "./assets/images/tea-light.jpeg";
import { useEffect, useRef, useState } from "react";
import { Viewer } from "./Components/Viewer";
import { Thumbs } from "./Components/Thumbs";
import { ICatalog } from "./@types/@types.App";
const catalogs: Array<ICatalog> = [
  {
    thumb: thumb1,
    image: image1,
  },
  {
    thumb: thumb2,
    image: image2,
  },
  {
    thumb: thumb3,
    image: image3,
  },
  {
    thumb: thumb4,
    image: image4,
  },
];
function App() {
  const [data, setData] = useState({
    catalogs: [...catalogs],
    catalogSelected: catalogs[0],
    currentIdx: 0,
  });
  const [slide, setSlide] = useState({
    slideActive: false,
    slideTimer: null,
    slideDuration: 3000,
  });
  const autoPlay = useRef<number | undefined>();
  const previousClick = () => {
    const { catalogs, currentIdx } = data;
    currentIdx === 0 &&
      setData({
        ...data,
        catalogSelected: catalogs[3],
        currentIdx: 3,
      });
    if (currentIdx >= 1) {
      setData({
        ...data,
        catalogSelected: catalogs[currentIdx - 1],
        currentIdx: currentIdx - 1,
      });
    }
  };
  const nextClick = () => {
    const { catalogs, currentIdx } = data;
    currentIdx === 0 &&
      setData({
        ...data,
        catalogSelected: catalogs[1],
        currentIdx: currentIdx + 1,
      });
    if (currentIdx >= 1 && currentIdx === catalogs.length - 1) {
      setData({
        ...data,
        currentIdx: 0,
        catalogSelected: catalogs[0],
      });
    } else {
      setData({
        ...data,
        catalogSelected: catalogs[currentIdx + 1],
        currentIdx: currentIdx + 1,
      });
    }
  };

  const onSlideChange = () => {
    const { slideActive } = slide;
    setSlide({
      ...slide,
      slideActive: !slideActive,
    });
  };

  const selectedCatalog = (index: number) => {
    setData({
      ...data,
      catalogSelected: catalogs[index],
      currentIdx: index,
    });
  };
  useEffect(() => {
    const slideChange = () => {
      const { slideActive, slideDuration } = slide;
      if (slideActive) {
        autoPlay.current = setTimeout(() => {
          nextClick();
        }, slideDuration);
      } else {
        clearTimeout(autoPlay.current);
      }
    };
    slideChange();
  }, [slide, slide.slideActive, data.currentIdx]);
  return (
    <>
      <div className="title" data-testid="app-title">
        Catalog Viewer
      </div>
      <div className="catalog-outer">
        <div className="catalog-view">
          <div className="text-center">
            <div className="view-outter text-center">
              <Viewer catalog={data.catalogSelected} />
            </div>
          </div>
        </div>
        <div className="catalog-items">
          <div
            className="previous"
            onClick={previousClick}
            data-testid="prev-icon"
          >
            <img src={previousIcon} />
          </div>
          <div className="next" onClick={nextClick} data-testid="next-icon">
            <img src={nextIcon} />
          </div>
          <Thumbs
            items={data.catalogs}
            currentIdx={data.currentIdx}
            selectedCatalog={selectedCatalog}
          />
        </div>

        <div className="slide-input">
          <input
            type="checkbox"
            onChange={onSlideChange}
            className="test"
            data-testid="slide"
          />{" "}
          Slide
        </div>
      </div>
    </>
  );
}

export default App;
