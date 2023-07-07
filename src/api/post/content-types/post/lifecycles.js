module.exports = {
    afterCreate(event) {
        console.log('afterCreate:', event);
        // event.params.data.cratedAt = new Date();
    },
};