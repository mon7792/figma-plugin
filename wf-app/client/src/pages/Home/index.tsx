import { Link } from "react-router-dom";
import { routes } from "../../routes";

function Home() {
  return (
    <div className="Home">
      <h1>Image Generator</h1>
      <h3>Work on the design for this page</h3>
      <img src="https://placehold.co/600x400" />
      <br/>
      <Link to={routes.APP}>try me</Link>
    </div>
  );
}

export default Home;
