import { prop } from '@typegoose/typegoose';
import { IsEmpty, IsEnum, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { RiskStatus } from '../enums/risk-status.enum';

export class RiskModel {
    @IsOptional()
    @IsString()
    @prop({
        required: true,
    })
    riskId: string;

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
    @IsEnum(RiskStatus)
    @prop({
        required: true,
        enum: RiskStatus,
    })
    status: RiskStatus;
}
