import { PrismaClient, User } from "@prisma/client";
import UserDTO from "../../dtos/user.dto";
import AppError from "../../errors/error";

import prisma from "../../prismaClient";


class FindUserService {
    async execute({ id }: UserDTO): Promise<UserDTO> {
        const user: User | null = await prisma.user.findUnique({where: {id: id}})

        if(!user) throw new AppError('User not found!', 404)
        
       
        return user as UserDTO;
    }

    
}

export default FindUserService;
