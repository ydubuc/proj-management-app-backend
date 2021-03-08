import { prop } from '@typegoose/typegoose';
import { Type } from 'class-transformer';
import {
    IsArray,
    IsEmpty,
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
    @IsOptional()
    @IsString()
    @prop({
        required: true,
    })
    reqId: string;

    @IsNotEmpty()
    @IsString()
    @Length(4, 512)
    @prop({
        required: true,
        minlength: 4,
        maxlength: 512,
    })
    description: string;

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
    @Type(() => RequirementStatusModel)
    @prop({
        required: false,
    })
    statuses?: RequirementStatusModel[];

    @IsNotEmpty()
    @IsNumber()
    @prop({
        required: true,
    })
    dueAt: number;
}
