import { useState } from "react";
import { ICatalog } from "../@types/@types.App";

export const useData = (catalogs: Array<ICatalog>) => {
  const [data, setData] = useState({
    catalogs: [...catalogs],
    catalogSelected: catalogs[0],
    currentIdx: 0,
  });
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
  const selectedCatalog = (index: number) =>
    setData({
      ...data,
      catalogSelected: catalogs[index],
      currentIdx: index,
    });

  return { data, nextClick, previousClick, selectedCatalog };
};
