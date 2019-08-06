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

        if(targetDev.likes.includes(logged._id)){
            console.log('DEU MATCH');
        }

        logged.likes.push(targetDev._id);

        await logged.save();

        return res.json(logged);
    }
};