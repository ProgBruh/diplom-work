interface IRelationPayload {
    [key: string]: string[];  
};

export const getPagination = (payload: number) => `pagination[page]=${payload}&pagination[pageSize]=6`;

export const getRelation = (payload: IRelationPayload) => Object.keys(payload).reduce((acc, cur) => acc + payload[cur].map((el, index) => `&populate[${cur}][fields][${index}]=${el}`).join(''), '');