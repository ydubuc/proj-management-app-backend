import { prop } from '@typegoose/typegoose';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { RequirementPhase } from '../enums/requirement-phase.enum';

export class RequirementStatusModel {
    @IsNotEmpty()
    @IsEnum(RequirementPhase)
    @prop({
        required: true,
        enum: RequirementPhase,
    })
    phase: RequirementPhase;

    @IsNotEmpty()
    @IsNumber()
    @prop({
        required: true,
    })
    expendedHours: number;
}
