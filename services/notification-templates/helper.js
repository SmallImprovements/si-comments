import { lowerCase } from 'lodash';
const MALE = 'male';
const FEMALE = 'female';

export function transformActorName(actor) {
    if (!actor) {
        return <span>An anonymous user</span>;
    }
    const { name } = actor;
    return name;
}

export function asPossessivePronoun(gender) {
    switch (lowerCase(gender)) {
        case FEMALE:
            return 'her';
        case MALE:
            return 'his';
        default:
            return 'their';
    }
}
