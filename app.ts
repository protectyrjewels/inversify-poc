import "reflect-metadata"
import { InversifyExpressServer } from "inversify-express-utils"
import container from "./di"

const port = 7000

const server = new InversifyExpressServer(container)

server.build().listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
