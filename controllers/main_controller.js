const fs = require('fs');
const admin_id = 'e72d443b16fea618f9c93459ee843caaa8e287ec';
//КАКИЕТО ИЗМЕНЕНИЯ В КОД Я ДОБАВИЛ
let reged_readers = JSON.parse(fs.readFileSync('./read_users.json'));
let reged_blogers = JSON.parse(fs.readFileSync('./blog_users.json'));

let isAdmin = false;
let isLogined_as_bloger = false;
let isLogined_as_reader = false;

class Auth{
    
    static registerReader(req, res) {
        if(!isLogined_as_bloger){
            if(!isAdmin){
                if(!isLogined_as_reader){
                    console.log(reged_readers)
                    let new_reader = req.body;
                    let new_reader_in_list = reged_blogers.find((el) => el.login === new_reader.login);
                    
                    if(!new_reader_in_list){
                        reged_readers.push(new_reader);

                        fs.writeFile('./read_users.json', JSON.stringify(reged_readers),(err) => {
                            isLogined_as_reader = true;
                            res.status(200).send('you are registered reader');
                        });
                    }else{
                        res.status(400).send('this login is already in use')
                    }
                    }else{
                        res.status(400).send('you are already logged in');
                    }
            }else{
                res.status(400).send('you are already logged in as admin');
            }
        }else{
            res.status(400).send('you are already logged in as bloger');
        }
        
    }
    static registerBloger(req, res) {
        if(!isLogined_as_reader){
            if(!isAdmin){
                if(!isLogined_as_bloger){
                    let new_bloger = req.body;
                    let new_bloger_in_list = reged_blogers.find((el) => el.login === new_bloger.login);
                    if(!new_bloger_in_list){
                        reged_blogers.push(new_bloger);
                        fs.writeFile('./blog_users.json', JSON.stringify(reged_blogers),(err) => {
                            isLogined_as_bloger = true;
                            res.status(200).send('you are registered bloger');
                        });
                    }else{
                        res.status(400).send('this login is already in use')
                    }

                    
                }else{
                    res.status(200).send('you are already registered bloger');
                }
            }else{
                res.status(400).send('you logged in as admin, firstly you have to log out');
            }
        }else{
            res.status(400).send('you are already logged in as reader, firstly you have to log out');
        }
        
        
    }
    static loginAdmin(req, res){
        if(!isLogined_as_bloger){
            if(!isLogined_as_reader){
                if(!isAdmin){
                    let id = String(req.params.id);
                    if(id === admin_id){
                        isAdmin = true;
                        res.status(200).send('logined admin')
                        
                    }
                    res.status(404).send('wrong id for admin');
                }else{
                    res.status(400).send('you logged in as admin');
                }
                
            }else{
                res.status(400).send('you are already logged in as reader, firstly you have to log out');
            }
        }else{
            res.status(400).send('you are already registered bloger');
        }
       
    }

    static loginReader(req, res){
        
        if(!isLogined_as_bloger){
            if(!isLogined_as_reader){
                if(!isAdmin){
                    let user = req.body;
                    let user_in_list = reged_readers.find((el) => el.password == user.password && el.login == user.login);
                    if(!user_in_list){
                        res.status(400).send('no user with this password or login')
                    }else{
                        res.status(200).send('you are logined');
                        isLogined_as_reader = true;
                    }
                }else{
                    res.status(400).send('you logged in as admin');
                }
                
            }else{
                res.status(400).send('you are already logged in as reader');
            }
        }else{
            res.status(400).send('you are already registered bloger, firstly you have to log out');
        }
       
    }
    static loginBloger(req, res){
        

        if(!isLogined_as_bloger){
            if(!isLogined_as_reader){
                if(!isAdmin){
                        let user = req.body;
                        let user_in_list = reged_blogers.find((el) => el.login == user.login && el.password == user.password);
                        if(!user_in_list){
                            res.status(400).send('no user with this password or login')
                        }else{
                            res.status(200).send('you are logined');
                            isLogined_as_bloger = true;
                        }
                }else{
                    res.status(400).send('you logged in as admin');
                }
                
            }else{
                res.status(400).send('you are already logged in as reader');
            }
        }else{
            res.status(400).send('you are already registered bloger, firstly you have to log out');
        }
       
    }
    static logout(req, res){
        if(isLogined_as_bloger || isAdmin || isLogined_as_reader){
            res.status(200).send('you are logged out');
            isLogined_as_reader = false;
            isLogined_as_bloger = false;
            isAdmin = false
        }else{
            res.status(400).send('you were not logged in');
        }
    }



    //bloger functionality
    static createPost(req, res){
        if(isLogined_as_bloger){
            let post = req.body;
            fs.writeFile('./blogs.json', JSON.stringify(post), (err) => {
                if(err) throw err;
                let success_obj = Object.assign(post, {hasUploaded: 'success'})
                res.status(200).json(success_obj);
            })
        }else{
            res.send('sorry you are not logged in as bloger');
        }
    }
    
    //reader functionality
    static getPosts(req, res){
        if(isLogined_as_reader){
            fs.readFile('./blogs.json', 'utf-8', (err,data) => {
                if(err) throw err;
                let obj_data = JSON.parse(data);
                res.status(200).json(obj_data);
            });
        }else{
            res.status(400).send('sorry you are not logged in as reader');
        }
    }
}

module.exports = {Auth};