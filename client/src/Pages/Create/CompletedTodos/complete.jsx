import "./complete.css";
import { useParams } from "react-router-dom";

const Complete = () => {
  const { index } = useParams();
  return <div className="complete-main">{console.log("hai:", index)}</div>;
};

export default Complete;
