import { Request, Response } from "express"
import { controller, httpGet } from "inversify-express-utils"
import { UserService } from '../services/user'
import { inject } from "inversify"

@controller("/users")
export class UserController {
  constructor(@inject(UserService) private userService: UserService) {}

  @httpGet("/")
  async getUsers(_: Request, res: Response) {
    const users = this.userService.getUsers()
    return res.json(users)
  }
}
