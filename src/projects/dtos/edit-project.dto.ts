import { Type } from 'class-transformer';
import {
    ArrayMinSize,
    IsArray,
    IsIn,
    IsOptional,
    IsString,
    Length,
    ValidateNested,
} from 'class-validator';
import { ProjectMember } from '../models/project-member.model';
import { RequirementModel } from '../models/requirement.model';
import { RiskModel } from '../models/risk.model';

const DELETABLE_FIELDS = ['description'];

export class EditProjectDto {
    @IsOptional()
    @IsString()
    @Length(4, 128)
    readonly name?: string;

    @IsOptional()
    @IsString()
    @Length(4, 512)
    readonly description?: string;

    @IsOptional()
    @IsString()
    readonly owner?: string;

    @IsOptional()
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => ProjectMember)
    readonly members?: ProjectMember[];

    @IsOptional()
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => RiskModel)
    readonly risks?: RiskModel[];

    @IsOptional()
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => RequirementModel)
    readonly requirements?: RequirementModel[];

    @IsOptional()
    @IsArray()
    @IsIn(DELETABLE_FIELDS, { each: true })
    readonly deleteFields?: string[];
}
