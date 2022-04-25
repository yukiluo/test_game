
let newNumber = 0

const getUserId =  async (req, res) => {
    newNumber++;
    let userId = "User"+(Array(6).join('0') + newNumber).slice(-6);
    console.log("getUserId: ", userId)
    res.status(200).send({userId:userId}) ; 
}


module.exports = {
    getUserId,
};