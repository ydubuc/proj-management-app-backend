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
    })
    description?: string;

    @prop({
        required: true,
    })
    owner: string;

    @prop({
        required: false,
    })
    members?: string[];

    @prop({
        required: true,
    })
    createdAt: number;
}

export const Projects = getModelForClass(Project);
