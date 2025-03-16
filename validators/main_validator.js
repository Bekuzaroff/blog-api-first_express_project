class RegValidator{

    static validateData(req, res, next){
        
        if(req.body.login.length < 4){
            res.status(400).json({
                message: 'too short login or password',
                data: 'null'
            });
        }
        if(!req.body.login || !req.body.password){
            res.status(400).json({
                message: 'you missed something',
                data: 'null'
            });
        }
        next();

    }
}
module.exports = {RegValidator};