import { Request, Response } from "express";
import UserDTO from "../dtos/user.dto";
import CreateUserService from "../services/users/createUser.service";
import AppError from "../errors/error";

class UserController {
    private createUserService: CreateUserService;

    constructor() {
        this.createUserService = new CreateUserService();
        this.create = this.create.bind(this);
    }

    async create(req: Request, res: Response) {
        const { name, email } = req.body;
        
        try {
            const user: UserDTO = await this.createUserService.execute({ name, email });
            res.status(201).json(user);
        } catch (error) {
            res.status((error as AppError).statusCode).json({ error: (error as AppError).message });
        }
    }
}

export default UserController;
