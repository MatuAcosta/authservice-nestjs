import { Role } from "./role.model";

export const RolesProvider = [
    {
        provide: 'ROLE_REPOSITORY',
        useValue: Role
    }
]