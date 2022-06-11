//Setting up the employee constructor 
class Employee {
    constructor (name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email 
    }
    //Return name
    getName () {
        return this.name;
    }
    //Return ID
    getId () {
        return this.id;
    }   
    //Return email
    getEmail () {
        return this.email;
    }
    //Return employee tier 
    getRole () {
        return "Employee"; 
    }
}; 
module.exports = Employee; 