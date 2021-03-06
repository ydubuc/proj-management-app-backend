import { prop } from '@typegoose/typegoose';

export class RequirementStatusModel {
    @prop({
        required: true,
    })
    phase: string;

    @prop({
        required: true,
    })
    time: number;
}
