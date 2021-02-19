import { Body, Controller, Get, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../users/decorators/get-user.decorator';
import { User } from '../users/models/user.model';
import { CreateProjectDto } from './dtos/create-project.dto';
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
        @Body(ValidationPipe) getProjectsFilterDto: GetProjectsFilterDto,
    ): Promise<Project[]> {
        return this.projectsService.getProjects(user, getProjectsFilterDto);
    }
}
