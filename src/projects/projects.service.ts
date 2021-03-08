import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { User } from '../users/models/user.model';
import { CreateProjectDto } from './dtos/create-project.dto';
import { EditProjectDto } from './dtos/edit-project.dto';
import { GetProjectsFilterDto } from './dtos/get-projects-filter.dto';
import { Project, ProjectModel } from './models/project.model';
import * as nanoid from 'nanoid';

@Injectable()
export class ProjectsService {
    async createProject(user: User, createProjectDto: CreateProjectDto): Promise<Project> {
        const { name, description } = createProjectDto;
        const project = new ProjectModel();
        project.pid = nanoid.nanoid(6);
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
        const { id, pid, name } = getProjectsFilterDto;
        const query = {};

        query['members'] = { $in: user.toProjectMember() };
        if (id) {
            query['_id'] = id;
        }
        if (pid) {
            query['pid'] = pid;
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
        query['members'] = { $in: user.toProjectMember() };
        if (editProjectDto.owner) {
            query['owner'] = user.getId();
        }

        const updates = {};
        const options = { new: true };

        for (const [key, value] of Object.entries(editProjectDto)) {
            if (key === 'risks') {
                const risks = editProjectDto[key];
                for (const risk of risks) {
                    if (!risk.riskId) {
                        risk.riskId = nanoid.nanoid(6);
                    }
                }
                updates[key] = risks;
            } else if (key === 'requirements') {
                const requirements = editProjectDto[key];
                for (const req of requirements) {
                    if (!req.reqId) {
                        req.reqId = nanoid.nanoid(6);
                    }
                }
                updates[key] = requirements;
            } else if (key === 'deleteFields') {
                const deletes = {};
                for (const field of value) {
                    deletes[field] = '';
                }
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

    async deleteProject(user: User, id: string): Promise<void> {
        const query = {};
        query['_id'] = id;
        query['owner'] = user.getId();

        try {
            await ProjectModel.findOneAndDelete(query);
        } catch (error) {
            throw error;
        }
    }
}
