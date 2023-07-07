interface IItem {
    [key: string]: any;
}

export default (item: IItem) => {
    const localItem = { ...item };
    const fields = Object.keys(localItem);
    for (const field of fields) {
        if (typeof localItem[field] === 'object') {
            localItem[field] = localItem[field].data?.attributes || localItem[field];
        }
    }
    return localItem;
};