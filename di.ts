import { Container } from "inversify";
import { UserController } from "./controllers/user";
import { UserService } from "./services/user";

const container = new Container();
container.bind<UserController>(UserController).toSelf();
container.bind<UserService>(UserService).toSelf();

export default container;
