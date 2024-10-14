import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { EmployeeModel } from './model/Employee';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Vikki_Angular_crud';
   
  employeeForm: FormGroup=new FormGroup({}) ;
employeeobj:EmployeeModel=new EmployeeModel();
employeeList:EmployeeModel[]=[];

  constructor(){
    this.createform();
    const oldData=localStorage.getItem("EmpData");
    if(oldData != null){
    const parseData=JSON.parse(oldData);
    this.employeeList=parseData;
    }

  }
  createform(){
    this.employeeForm=new FormGroup({
empId:new FormControl(this.employeeobj.empId),
name:new FormControl(this.employeeobj.name,[Validators.required]),
city:new FormControl(this.employeeobj.city),
state:new FormControl(this.employeeobj.state),
address:new FormControl(this.employeeobj.address),
emailId:new FormControl(this.employeeobj.emailId),
contactNumb:new FormControl(this.employeeobj.contactNumb,[Validators.minLength(10)]),


    })
  }

  onSave(){
    const oldData=localStorage.getItem("EmpData");
    if(oldData != null){
      const parseData = JSON.parse(oldData);
      this.employeeForm.controls['empId'].setValue(parseData.length + 1);
      this.employeeList.unshift(this.employeeForm.value);
    }
    else{
      this.employeeList.unshift(this.employeeForm.value);
    }
    localStorage.setItem("EmpData",JSON.stringify(this.employeeList))
    this.employeeobj=new EmployeeModel();
    this.createform();
  }
  onEdit(item: EmployeeModel){
    this.employeeobj=item;
    this.createform()
  }
  onUpdate(){
    const record=this.employeeList.find(m=>m.empId==this.employeeForm.controls['empId'].value);
    if(record!= undefined){
      record.name=this.employeeForm.controls['name'].value;
      record.contactNumb=this.employeeForm.controls['contactNumb'].value;
    }
    localStorage.setItem("EmpData",JSON.stringify(this.employeeList))
    this.employeeobj=new EmployeeModel();
    this.createform();
  }
  onDelete(id:number)
  {
const isDelete=confirm("Sure to Delete");
if(isDelete){
  const index = this.employeeList.findIndex(m=>m.empId==id)
  this.employeeList.splice(index,1);
  localStorage.setItem("EmpData",JSON.stringify(this.employeeList))

}
  }
  reset(){
    this.employeeobj=new EmployeeModel();
    this.createform();
  }
}
