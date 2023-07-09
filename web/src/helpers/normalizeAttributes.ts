interface IItem {
    [key: string]: any;
}

export default (item: IItem) => {
    const localItem = { ...item.attributes };
    const fields = Object.keys(localItem);
    for (const field of fields) {
        if (typeof localItem[field] === 'object') {
            const { id } = localItem[field].data;
            localItem[field] = localItem[field].data?.attributes || localItem[field];
            if (!localItem[field].id) localItem[field].id = id;
        }
    }
    return { ...localItem, id: item.id };
};