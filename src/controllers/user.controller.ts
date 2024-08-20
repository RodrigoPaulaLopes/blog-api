import { Request,Response } from "express";
import UserDTO from "../dtos/user.dto";
import CreateUserService from "../services/users/createUser.service";
import FindUserService from "../services/users/findUser.service";
import AppError from "../errors/error";


class UserController {
   
    private createUserService: CreateUserService;
    private findUserService: FindUserService;

    constructor() {
        this.createUserService = new CreateUserService();
        this.findUserService = new FindUserService()
        this.create = this.create.bind(this);
        this.show = this.show.bind(this)
    }

    async create(req: Request, res: Response) {
        const { name, email, password } = req.body;
        
        try {
            const user: UserDTO = await this.createUserService.execute({ name, email, password });
            res.status(201).json(user);
        } catch (error) {
            res.status((error as AppError).statusCode).json({ error: (error as AppError).message });
        }
    }
    async show(req: Request, res: Response) {
        const  id : number  = Number(req.params.id);
        try {
            const user: UserDTO = await this.findUserService.execute({id} as UserDTO);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: (error as AppError).message });
        }
    }
}

export default UserController;
