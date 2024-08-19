import { PrismaClient, User } from "@prisma/client";
import UserDTO from "../../dtos/user.dto";
import AppError from "../../errors/error";
import bcrypt from "bcrypt";
import prisma from "../../prismaClient";


class CreateUserService {
    async execute({ name, email, password }: UserDTO): Promise<UserDTO> {
        const isRegistered: User | null = await prisma.user.findFirst({
            where: {
              email: email,
            },
          })

        if(isRegistered) throw new AppError('User already exists!', 400)
        
        const new_password = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: new_password
            },
        });

        return user as UserDTO;
    }

    
}

export default CreateUserService;
