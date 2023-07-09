interface IRelationPayload {
    [key: string]: string[];  
};

export const getPagination = (payload: number): string => `pagination[page]=${payload}&pagination[pageSize]=6`;

export const getRelation = (payload: IRelationPayload): string => Object.keys(payload).reduce((acc, cur) => acc + payload[cur].map((el, index) => `&populate[${cur}][fields][${index}]=${el}`).join(''), '');

export const getFields = (payload: string[]): string => payload.map((el, index) => `fields[${index}]=${el}`).join('&');