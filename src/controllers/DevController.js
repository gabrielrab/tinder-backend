const mongoose = require('mongoose');
const axios = require('axios');

const Dev = require('../model/Dev');

module.exports = {
    async store(req, res){
        const { username } = req.body;

        const userExistis = await Dev.findOne({user: username});

        if(userExistis){
            return res.json(userExistis);
        }

        const response = await axios.get(`https://api.github.com/users/${username}`);

        const { name, bio, avatar_url:avatar } = response.data;

        const dev = await Dev.create({
            name,
            user : username,
            bio,
            avatar
        });

        return res.send({dev}); 
    },

    async index(req, res){
        const { user } = req.headers;

        const logged = await Dev.findById(user);

        const users = await Dev.find({
            $and: [
                {_id: { $ne: user }},
                {_id: {$nin: logged.likes }},
                {_id: {$nin: logged.dislike }}
            ]
        });

        return res.json(users);
    }
}