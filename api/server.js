import app from "./app.js";
import { PORT } from "./@constants/core.js";

app.listen(PORT, (err) => {
  if (err) {
    console.log("Error", JSON.stringify(err, null, 2));
    return;
  }

  console.log(`Server is listening on port ${PORT}`);
});
