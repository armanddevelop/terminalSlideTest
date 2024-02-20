import { ICatalog } from "../@types/@types.App";
import "./Viewer.css";

interface IViewerProps {
  catalog: ICatalog;
}
export const Viewer = ({ catalog }: IViewerProps): JSX.Element => {
  return (
    <div className="catalog-view">
      <img
        data-testid="catalog-view"
        className="catalog-image"
        src={catalog.image}
      />
    </div>
  );
};
