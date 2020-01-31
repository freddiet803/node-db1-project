const db = require('../data/dbConfig.js');


module.exports = {
    get,
    deleteAccount,
    createAccount,
    getById,
    updateAccount
}

//get all accounts
function get(){
    return db('accounts');
}
//get account by id
function getById(id){
    return db('accounts').where({id});
}
//create new account
function createAccount(accountInfo){
    return db('accounts').insert(accountInfo);
    
}
//delete account by id
function deleteAccount(id){
    return db('accounts').del().where({id});
}

//update account
function updateAccount(id, newInfo){
    return db('accounts').update({name: newInfo.name, budget: newInfo.budget}).where({id});
}
