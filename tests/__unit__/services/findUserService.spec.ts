import { User } from "@prisma/client"
import {prismaMock} from '../../../src/__mocks__/singleton'
import FindUserService from "../../../src/services/users/findUser.service"
import UserDTO from "../../../src/dtos/user.dto"

describe("##################### Find user service ########################", () => {
    it("Should return an user", async () => {
        
        const id = 1
        const user: User = {
            id: 1, 
            email: "profile@email.com",
            name: "profile",
            password: "hashad_pass"
        }

        prismaMock.user.findUnique.mockResolvedValueOnce(user)
        const findUserService = new FindUserService()


        await expect(findUserService.execute({id} as UserDTO)).resolves.toEqual(user)


    })

    it("Should return an error when try to search an user that not exists", async () => {
        const user: User = {
            id: 1, 
            email: "profile@email.com",
            name: "profile",
            password: "hashad_pass"
        }

        prismaMock.user.findUnique.mockResolvedValueOnce(null)
        const findUserService = new FindUserService()


        await expect(findUserService.execute({id: user.id} as UserDTO)).rejects.toEqual({"message": "User not found!", "statusCode": 404})
        await expect(findUserService.execute({id: user.id} as UserDTO)).rejects.toHaveProperty("statusCode", 404)
        await expect(findUserService.execute({id: user.id} as UserDTO)).rejects.toHaveProperty("message", "User not found!")


    })
})