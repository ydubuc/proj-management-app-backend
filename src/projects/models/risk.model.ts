import { prop } from '@typegoose/typegoose';
import { RiskStatus } from '../enums/risk-status.enum';

export class RiskModel {
    getId(): string {
        return this['_id'];
    }

    @prop({
        required: true,
        minlength: 4,
        maxlength: 512,
    })
    description?: string;

    @prop({
        required: true,
    })
    status: RiskStatus;
}
