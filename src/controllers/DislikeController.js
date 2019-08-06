const Dev = require('../model/Dev');

module.exports = {
    async store(req, res) {
        const { devId } = req.params;
        const { user } = req.headers;
        
        const logged = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        if(!targetDev){
            return res.status(400).json({ error: 'Dev not exists' });
        }

        logged.dislike.push(targetDev._id);

        await logged.save();

        return res.json(logged);
    }
};