import { UserRepository } from "../repository/user.repository";
import { User } from "./user.model";

export const UserProvider = [
    {
        provide: 'USER_REPOSITORY',
        useValue: User
    }
]