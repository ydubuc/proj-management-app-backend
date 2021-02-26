import { getModelForClass, prop } from '@typegoose/typegoose';

export class Project {
    getId(): string {
        return this['_id'];
    }

    @prop({
        required: true,
        minlength: 4,
        maxlength: 128,
    })
    name: string;

    @prop({
        required: false,
        minlength: 4,
        maxlength: 512,
    })
    description?: string;

    @prop({
        required: true,
    })
    owner: string;

    @prop({
        required: true,
    })
    members: string[];

    @prop({
        required: true,
    })
    createdAt: number;
}

export const ProjectModel = getModelForClass(Project);
