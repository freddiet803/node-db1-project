const express = require('express');
const db = require('./account-model.js');

const router = express.Router();

//get all accounts
router.get('/',(req, res) => {
 db.get().then(accounts=>{
  res.status(200).json(accounts)
}).catch(err=>{
  res.status(500).json(err);
})

});

//get account by id
router.get('/:id',(req,res)=>{
  const id = req.params.id;
  db.getById(id).then(accountExist=>{
    if(accountExist.length>0){
      res.status(200).json(accountExist)
    }else{
      res.status(400).json({message: 'account does not exist'})
    }
  }).catch(err=>{
    res.status(500).json({errorMessage: 'could not get account'})
  })
})


//create account
router.post('/',(req,res)=>{
  const postBody = req.body;

  if(postBody.name && postBody.budget){
    db.createAccount(postBody).then(newAccount=>{
      res.status(201).json(newAccount)
    }).catch(err=>{
      res.status(500).json({errorMessage: 'Account Could not be Created'})
    })
  }else{
    res.status(404).json({message: 'missing name or budget field'})
  }
});

//update account
router.put('/:id',(req,res)=>{
  const id = req.params.id;
  const newInfo = req.body;

  if(newInfo.name && newInfo.budget){
    db.getById(id).then(accountExist=>{
      if(accountExist.length >0){
        db.updateAccount(id,newInfo).then(updated=>{
          res.status(201).json(updated)
        }).catch(err=>{
          res.status(500).json({errorMessage: 'could not update account'})
        })
      }else{
        res.status(400).json({message: `account with id of ${id} does not exist`})
      }
    }).catch(err=>{
      res.status(500).json({errorMessage: "could not get account"})
    })
  }else{
    res.status(400).json({message: 'please enter updated name and budget'})
  }
})


//delete account
router.delete('/:id',(req,res)=>{
  const iD = req.params.id;
  db.getById(iD).then(accountExist=>{
    if(accountExist.length >0){
      db.deleteAccount(iD).then(deleted=>{
        res.status(200).json(deleted)
      }).catch(err=>{
        res.status(500).json({errorMessage:"could not delete account"})
      })
    }else{
      res.status(404).json({message: `account with id of ${iD} does not exist`})
    }
  }).catch(err=>{
    res.status(500).json({errorMessage:'could not delete account'})
  })
})

module.exports = router;
