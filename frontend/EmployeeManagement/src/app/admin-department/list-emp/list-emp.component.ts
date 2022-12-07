import { Component,OnInit,Input  } from '@angular/core';
import { PublicService } from 'src/app/services/public.service'

@Component({
  selector: 'app-list-emp',
  templateUrl: './list-emp.component.html',
  styleUrls: ['./list-emp.component.scss']
})
export class ListEmpComponent implements OnInit {

  constructor(private service:PublicService) { }

  EmployeeList:any=[];

  ModalTitle!:string;
  ActivateAddEditEmpComp:boolean=false;
  emp:any;

  EmployeeIdFilter:string="";
  // DepartmentNameFilter:string="";
  EmployeeListWithoutFilter:any=[];

  ngOnInit(): void {
    this.refreshEmpList();
  }

  addClick(){
    this.emp={
      EmployeeId:0,
      employee_Name:"",
      email:"",
      contact_Number:"",
      emergency_Contact_Number:"",
      address:"",
      position:"",
      dOB:"",
      martial_Status:"",
      job_Title:"",
      work_Location:"",
      date_Of_Joining:"",
      reporting_To:"",
      linkedin_Link:"",
      Photo_File_Name:"anonymous.png"
    }
    this.ModalTitle="ADD EMPLOYEE";
    this.ActivateAddEditEmpComp=true;

  }

  editClick(item: any){
    console.log(item);
    this.emp=item;
    this.ModalTitle="Edit Employee";
    this.ActivateAddEditEmpComp=true;
  }

  deleteClick(item: { EmployeeId: any; }){
    if(confirm('Are you sure??')){
      this.service.deleteEmployee(item.EmployeeId).subscribe(data=>{
        alert(data.toString());
        this.refreshEmpList();
      })
    }
  }
  // view
  // viewClick(item: any){
  //   console.log(item);
  //   this.emp=item;
  //   this.ModalTitle="Edit Employee";
  //   this.ActivateAddEditEmpComp=true;
  // }

  closeClick(){
    this.ActivateAddEditEmpComp=false;
    this.refreshEmpList();
  }


  refreshEmpList(){
    this.service.getEmpList().subscribe(data=>{
      this.EmployeeList=data;
      this.EmployeeListWithoutFilter=data;
    });
  }

  FilterFn(){
    var EmployeeIdFilter = this.EmployeeIdFilter;
    // var DepartmentNameFilter = this.DepartmentNameFilter;

    this.EmployeeList = this.EmployeeListWithoutFilter.filter(function  (el:any){
        return el.employee_Name.toString().toLowerCase().includes(
          EmployeeIdFilter.toString().trim().toLowerCase())
        // )&&
        // el.DepartmentName.toString().toLowerCase().includes(
        //   DepartmentNameFilter.toString().trim().toLowerCase()
        // )
    });
  }

  sortResult(prop:any,asc:any){
    this.EmployeeList = this.EmployeeListWithoutFilter.sort(function(a:any,b:any){
      if(asc){
          return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 :0);
      }else{
        return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 :0);
      }
    })
  }

}

