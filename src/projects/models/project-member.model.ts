import { prop } from '@typegoose/typegoose';

export class ProjectMember {
    @prop({
        required: true,
    })
    uid: string;

    @prop({
        required: true,
    })
    username: string;

    @prop({
        required: true,
    })
    displayName: string;

    @prop({
        required: false,
    })
    avatarUrl?: string;
}
