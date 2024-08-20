import { PrismaClient, User } from "@prisma/client";
import UserDTO from "../../dtos/user.dto";
import AppError from "../../errors/error";
import bcrypt from "bcrypt";
import prisma from "../../prismaClient";


class UpdateUserService {
    async execute({id, name, email, password }: UserDTO): Promise<UserDTO> {
        let old_user: User | null = await prisma.user.findFirst({
            where: {
              id: id,
            },
          })

        if(!old_user) throw new AppError('User not exists', 404)
        
        const new_password = await bcrypt.hash(password, 10)
        let new_user: UserDTO
        if(email === old_user.email){
            new_user = {
                ...old_user,
                name: name,
                password: new_password

            }
        }else{
            new_user = {
                ...old_user,
                name: name,
                email: email,
                password: new_password

            }
        }

        const user = await prisma.user.update({
            where: {
                id: id
            },
            data: new_user
        });

        return user as UserDTO;
    }

    
}

export default UpdateUserService;
