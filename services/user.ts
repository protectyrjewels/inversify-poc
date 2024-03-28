import { injectable } from "inversify"
import User from "../models/user"

@injectable()
export class UserService {
  getUsers(): User[] {
    // Simulated data for demonstration purposes
    return [
      new User(1, "John Doe", "john@example.com"),
      new User(2, "Jane Smith", "jane@example.com"),
    ]
  }
}
