var user = require("../models").user;


/**
 * 根据openid看是否重复，如重复返回 false 否则返回 true
 * @param name 用户的openid
 */
const isRepeatUserName = (name) => {
    return new Promise((resolve ,reject) => {
        user.findOne({ name },'name').exec((err,doc) => {
            if(err){
                resolve(false);
            }else if(doc){
                resolve(false);
            }else if(!doc){
                user.create({ name },(c_err ,c_doc) => {
                    if(c_err){
                        resolve(false);
                    }else{
                        resolve(true);
                    }
                })
            }else{
                resolve(false);
            }
        })
    })
}


module.exports = {
    isRepeatUserName
}







