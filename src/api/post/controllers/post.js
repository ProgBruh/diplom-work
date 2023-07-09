'use strict';

/**
 * post controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::post.post', ({ strapi }) => ({
    async findPostsWithFitlers(ctx) {
        const { filters } = ctx.query;
        console.log(filters || '{}');
        const {
            title,
            solved,
            startDate,
            endDate,
            language,
        } = JSON.parse(filters || '{}');
        const posts = await strapi.db.query('api::post.post').findMany({
            where: {
                ...(title ? {
                    title: {
                        $contains: title,
                    },
                } : {}),
                ...(solved ? {
                    solved,
                } : {}),
                ...(language ? {
                    language,
                } : {}),
                ...(startDate ? {

                } : {}),
                ...(endDate ? {

                } : {}),
            },
            populate: {
                author: true,
                language: true,
            },
        });
        const data = posts.map(el => {
            const author = {
                data: {
                    id: el.author.id,
                    attributes: {
                        username: el.author.username,
                    },
                },
            };
            const language = {
                data: {
                    id: el.language.id,
                    attributes: {
                        color: el.language.color,
                        name: el.language.name,
                    },
                },
            };
            return {
                id: el.id,
                attributes: {
                    ...el,
                    author,
                    language,
                },
            };
        });
        ctx.body = data;
    },
}));
