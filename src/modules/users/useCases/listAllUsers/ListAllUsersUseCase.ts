import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private usersRepository: IUsersRepository) { }

  execute({ user_id }: IRequest): User[] {
    const userAlreadyExists = this.usersRepository.findById(user_id);

    if (userAlreadyExists) {
      if (userAlreadyExists.admin) {
        return this.usersRepository.list();
      }
      throw new Error("Not is admin");
    }
    throw new Error("User does not exist");
  }
}

export { ListAllUsersUseCase };
