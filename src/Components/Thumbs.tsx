import { ICatalog } from "../@types/@types.App";
import "./Thumbs.css";
interface IThumbsProps {
  items: Array<ICatalog>;
  currentIdx: number;
  selectedCatalog: (idx: number) => void;
}

export const Thumbs = ({
  items,
  currentIdx,
  selectedCatalog,
}: IThumbsProps): JSX.Element => {
  const onImageSelect = (idx: number) => selectedCatalog(idx);
  return (
    <>
      {items.map((item, idx) => (
        <span
          className="catalog item"
          onClick={() => onImageSelect(idx)}
          className={"thumb-select"}
          id={idx.toString()}
          key={idx}
          data-testid={"thumb_outer_" + idx}
        >
          <span
            className={
              "thumb-outer " + (idx == currentIdx ? "thumb-selected" : " ")
            }
            data-testid={"thumb_" + idx}
          >
            <span
              className="thumb"
              id={idx.toString()}
              style={{ backgroundImage: "url(" + item.thumb + ")" }}
              data-testid={"thumb_img_" + idx}
            />
          </span>
        </span>
      ))}
    </>
  );
};
