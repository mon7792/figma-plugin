import { routes } from "../../routes";

function Home() {
  return (
    <div className="Home">
      <h1>Image Generator</h1>
      <h3>Work on the design for this page</h3>
      <img src="https://placehold.co/600x400" />
      <br/>
      <a href={routes.APP}>
        <button>try me</button>
      </a>
    </div>
  );
}

export default Home;
