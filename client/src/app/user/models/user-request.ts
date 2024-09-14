import { Task } from "src/app/task/models/task.model";

export class User {
	id: number | any
	firstname: string | any; 
    lastname: string | any;
    email: string | any;
    password: string | any;
	createdAt: Date | any;
	tasks: Task[];
	token: string | any;
}