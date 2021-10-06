import { Roles } from '../model/roles.modele';
export class Users {
  id:any=null;
  email:string="";
  password:string="";
  username:String;
  jobTitle:String;
  phone:String;
  imageUrl:String;
  roles:Roles[];
  }
  