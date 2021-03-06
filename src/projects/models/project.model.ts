import { getModelForClass, prop } from '@typegoose/typegoose';
import { ProjectMember } from './project-member.model';
import { RequirementModel } from './requirement.model';
import { RiskModel } from './risk.model';

export class Project {
    getId(): string {
        return this['_id'];
    }

    @prop({
        required: true,
        unique: true,
    })
    pid: string;

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
        _id: false,
    })
    members: ProjectMember[];

    @prop({
        required: false,
    })
    risks?: RiskModel[];

    @prop({
        required: false,
    })
    requirements?: RequirementModel[];

    @prop({
        required: true,
    })
    createdAt: number;
}

export const ProjectModel = getModelForClass(Project);
