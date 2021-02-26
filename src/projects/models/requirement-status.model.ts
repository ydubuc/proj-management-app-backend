import { prop } from '@typegoose/typegoose';

export class RequirementStatusModel {
    @prop({
        required: true,
    })
    status: string; // phase

    @prop({
        required: true,
    })
    time: number;
}
