import { prop } from '@typegoose/typegoose';
import {
    IsArray,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Length,
    ValidateNested,
} from 'class-validator';
import { RequirementType } from '../enums/requirement-type.enum';
import { RequirementStatusModel } from './requirement-status.model';

export class RequirementModel {
    getId(): string {
        return this['_id'];
    }

    @IsOptional()
    @IsString()
    @Length(4, 512)
    @prop({
        required: false,
        minlength: 4,
        maxlength: 512,
    })
    description?: string;

    @IsNotEmpty()
    @IsEnum(RequirementType)
    @prop({
        required: true,
        enum: RequirementType,
    })
    type: RequirementType;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @prop({
        required: false,
    })
    statuses?: RequirementStatusModel[];

    @IsNotEmpty()
    @IsNumber()
    @prop({
        required: true,
    })
    dueDate: number;
}
