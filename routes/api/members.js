const express=require('express')
const router=express.Router();
const members=require('../../member')
const uuid=require('uuid')


router.get('/',(req,res)=>res.json(members));
// Get Single Member
router.get('/:id', (req, res) => {
    const found = members.some(idFilter(req));
  
    if (found) {
      res.json(members.filter(idFilter(req)));
    } else {
      res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
    }
  });

router.post('/',(req,res)=>{
    const newMember={
     id:uuid.v4(),
     name:req.body.name,
     email:req.body.email,
     status:'active'
    }
    if(!newMember.name|| !newMember.email){
        res.status(400).json({msg:'Please include name and email'})
    }
    members.push(newMember)
    //res.json(members);
    //res.redirect('/')
})
//update members
router.put('/:id',(req,res)=>{
    const found=members.some(member=> member.id === parseInt(req.params.id))
    if(found)
    {
        const updMember=req.body;
        members.forEach(member=>{
            if(member.id===parseInt(req.params.id)){
                member.name=updMember.name?updMember.name: member.name
                member.email=updMember.email?updMember.email: member.email

            res.json({msg:'Member updated',member})
            }
        })
    }
    else{
        res.status(400).json({msg:`No member with id of ${req.params.id}`})
    }
})
//delete member
router.delete('/:id',(req,res)=>{
    const found=members.some(member=> member.id == parseInt(req.params.id))
    if(found)
    {
      res.json({msg: 'Member deleted',members: members.filter(member=>member.id!==parseInt(req.params.id))})
    }
        
      
    else{
        res.status(400).json({msg:`No member with id of ${req.params.id}`})
    }
})

module.exports=router;