//Import Employee constructor 
const Employee = require("./Employee");
//Let Manager constructor extend to the employee constructor 
class Manager extends Employee {
    constructor (name, id, email, officeNumber) {
        //Call employee constructor
        super (name, id, email); 
        this.officeNumber = officeNumber; 
    }
    //Overide role to Manager
    getRole () {
        return "Manager";
    }
}
module.exports = Manager;