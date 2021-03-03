import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { User } from '../users/models/user.model';
import { CreateProjectDto } from './dtos/create-project.dto';
import { EditProjectDto } from './dtos/edit-project.dto';
import { GetProjectsFilterDto } from './dtos/get-projects-filter.dto';
import { Project, ProjectModel } from './models/project.model';

@Injectable()
export class ProjectsService {
    async createProject(user: User, createProjectDto: CreateProjectDto): Promise<Project> {
        const { name, description } = createProjectDto;
        const project = new ProjectModel();
        project.name = name;
        if (description) {
            project.description = description;
        }
        project.owner = user.getId();
        project.members = [user.toProjectMember()];
        project.createdAt = Date.now();

        try {
            const newProject = await project.save();
            return newProject;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException('An error occured while creating your project.');
        }
    }

    async getProjects(user: User, getProjectsFilterDto: GetProjectsFilterDto): Promise<Project[]> {
        const { id, name } = getProjectsFilterDto;
        const query = {};

        // TODO: find a way to query sub documents
        query['members'] = { $in: user.getId() };
        if (id) {
            query['_id'] = id;
        }
        if (name) {
            query['name'] = { $regex: `.*${name}.*` };
        }

        try {
            const projects = await ProjectModel.find(query);
            return projects;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException('An error occured while getting your projects.');
        }
    }

    async editProject(user: User, id: string, editProjectDto: EditProjectDto): Promise<Project> {
        const query = {};
        query['_id'] = id;
        // TODO: find a way to query sub documents
        query['members'] = { $in: user.getId() };

        const updates = {};
        const deletes = {};
        const options = { new: true };

        for (const [key, value] of Object.entries(editProjectDto)) {
            if (value === '$delete') {
                deletes[key] = '';
                updates['$unset'] = deletes;
            } else {
                updates[key] = value;
            }
        }

        try {
            const project = await ProjectModel.findOneAndUpdate(query, updates, options);
            return project;
        } catch (error) {
            throw new NotFoundException('Project not found or not authorized.');
        }
    }
}
