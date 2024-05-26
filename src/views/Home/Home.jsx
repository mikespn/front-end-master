import Button from "@mui/material/Button";
import classes from "./home.module.css";

const Home = () => {
  return (
    <div className={classes.container}>
      <h1 className={classes.red}>Welcome Home</h1>
      <div>
        <Button variant="contained">Hello world</Button>
      </div>
    </div>
  );
};

export default Home;
