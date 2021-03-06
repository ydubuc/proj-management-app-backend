import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
    ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../users/decorators/get-user.decorator';
import { User } from '../users/models/user.model';
import { CreateProjectDto } from './dtos/create-project.dto';
import { EditProjectDto } from './dtos/edit-project.dto';
import { GetProjectsFilterDto } from './dtos/get-projects-filter.dto';
import { Project } from './models/project.model';
import { ProjectsService } from './projects.service';

@Controller('projects')
@UseGuards(AuthGuard())
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}

    @Post()
    async createProject(
        @GetUser() user: User,
        @Body(ValidationPipe) createProjectDto: CreateProjectDto,
    ): Promise<Project> {
        return this.projectsService.createProject(user, createProjectDto);
    }

    @Get()
    async getProjects(
        @GetUser() user: User,
        @Query(ValidationPipe) getProjectsFilterDto: GetProjectsFilterDto,
    ): Promise<Project[]> {
        return this.projectsService.getProjects(user, getProjectsFilterDto);
    }

    @Patch('/:id')
    async editProject(
        @GetUser() user: User,
        @Param('id') id: string,
        @Body(ValidationPipe) editProjectDto: EditProjectDto,
    ): Promise<Project> {
        return this.projectsService.editProject(user, id, editProjectDto);
    }

    @Delete('/:id')
    async deleteProject(@GetUser() user: User, @Param('id') id: string): Promise<void> {
        return this.projectsService.deleteProject(user, id);
    }
}
