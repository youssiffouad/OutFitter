import GenerateNewOutfit from "./generateNewOutfit";
import GeneratorHeader from "./headerGenerator";

const Generator = () => {
  return (
    <div
      className="container-fluid bg-dark"
      style={{ height: "calc(-60px + 100vh)" }}
    >
      {" "}
      <GeneratorHeader />
      <GenerateNewOutfit />
    </div>
  );
};
export default Generator;
