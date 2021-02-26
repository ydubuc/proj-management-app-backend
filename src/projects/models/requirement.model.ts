import { prop } from '@typegoose/typegoose';
import { RequirementType } from '../enums/requirement-type.enum';
import { RequirementStatusModel } from './requirement-status.model';

export class RequirementModel {
    getId(): string {
        return this['_id'];
    }

    @prop({
        required: false,
        minlength: 4,
        maxlength: 512,
    })
    description?: string;

    @prop({
        required: true,
    })
    type: RequirementType;

    @prop({
        required: false,
    })
    statuses?: RequirementStatusModel[];

    // add due date
}
