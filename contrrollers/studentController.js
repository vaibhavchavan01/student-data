// import StudentModel from "../models/student.js";
import dataset from "../models/student.js";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';

class StudentController{
    static createDoc =async (req, res) =>{
        try {
            const {name, age, fees} = req.body;
            const doc = new dataset.StudentModel({
                name:name,
                age:age,
                fees:fees
            })
        
        //savinag document
        const result= await doc.save()
        res.redirect('/details');
        } catch (error) {
            console.log(error);   
        }
    }
    static getAllDoc = async(req, res) =>{
        try {
            const result = await dataset.StudentModel.find()
            res.render('index', {data: result});
        } catch (error) {
            console.log(error);            
        }
    }   
    static home = async(req, res) =>{
        res.render('home');
        
    }
    static checkData = async (req, res) =>{
        res.render('register')
    }

    static register =async (req, res) =>{
        console.log(req.body);
        try {
            const {name, email, mobile, psw} = req.body;
            const userdata = new dataset.UserModel({
                name:name,
                email:email,
                mobile:mobile,
                password: psw,

            })
        const salt = await bcrypt.genSalt(10);
        userdata.password = await bcrypt.hash(userdata.password, salt);
        // savinag document
        const result= await userdata.save()
        res.redirect('/');
        } catch (error) {
            console.log(error);   
        }
    }   
    static login = async (req, res) =>{
        try {
            console.log((req.body.uname));
            const username = await dataset.UserModel.findOne({$or:[{email:req.body.uname}, {mobile:req.body.uname}]})
            console.log("username:",username);
            if(!username){
                res.render('home',{ message: "Invalid Username" });
            }
            else{
                // jwt.sign({username},JwtKey, {expiresIn:"2m"}, (err, token)=>{
                //     res.send(username, {})
                // }) 
                res.redirect('/details');
            }
            } 
            catch (error) {
                res.status(200)
            }
        
    }
    static editAllDoc = async (req, res) =>{
        try {
            const result = await dataset.StudentModel.findById(req.params.id)
            console.log('result',result);
            res.render('edit', {data: result});
        } catch (error) {
            console.log(error);            
        }
    }   
    static updateDocById =async (req, res) =>{
        try {
            const result = await dataset.StudentModel.findByIdAndUpdate(req.params.id, req.body)
            res.redirect('/details');
        } catch (error) {
            console.log(error);   
        }
    } 
    static deleteDocById =async (req, res) =>{
        const result = await dataset.StudentModel.findByIdAndDelete(req.params.id, req.body)
        res.redirect('/details');
    }   
}
export default StudentController
