import { Component, OnInit } from '@angular/core';
import { FFQClinic } from 'src/app/models/ffqclinic';
import { FFQParent } from 'src/app/models/ffqparent';
import { FFQClinician } from 'src/app/models/ffqclinician';
import { Observable } from 'rxjs';
import { FFQClinicResponse } from 'src/app/models/ffqclinic-response';
import { FFQClinicianResponse } from 'src/app/models/ffqclinician-response';
import { FFQParentResponse } from 'src/app/models/ffqparent-response';
import { ClinicService } from 'src/app/services/clinic/clinic-service';
import { ParentService } from 'src/app/services/parent/parent-service';
import { ClinicianService } from 'src/app/services/clinician/clinician-service';
import { ClinicianPipe } from 'src/app/pipes/clinicianFilter.pipe';
import { ParentPipe } from 'src/app/pipes/parentFilter.pipe';

@Component({
  templateUrl: './admin-clinics.component.html',
  styleUrls: ['./admin-clinics.component.css']
})

export class AdminClinicsComponent implements OnInit {

  constructor(

    public clinicService: ClinicService,
    public clinicianService: ClinicianService,
    public parentService: ParentService
  ){}

  public ffqclinicList: FFQClinic[] = [];
  public ffqclinicianList: FFQClinician[] = [];
  public ffqparentList: FFQParent[] = [];
  public headClinicians: string[] =[];
 


  ngOnInit() {

    this.getAllHeadClinics();
    
    var clinicList: Observable<FFQClinicResponse[]> = this.clinicService.getAllClinics();
    clinicList.subscribe(a => {
      this.ffqclinicList = a;
      console.log(a);
    });

    var clinicianList: Observable<FFQClinicianResponse[]> = this.clinicianService.getAllClinicians();
    clinicianList.subscribe(a => {
      this.ffqclinicianList = a;
      console.log(a);
    });

    var parentList: Observable<FFQParentResponse[]> = this.parentService.getAllParents();
    parentList.subscribe(a => {
      this.ffqparentList = a;
      console.log(a);
    });
    
  }

  private getAllHeadClinics(){

    var allClinics: Observable<FFQClinicResponse[]> = this.clinicService.getAllClinics();

    allClinics.subscribe(clinicList => {

      clinicList.forEach(clinic => {
        var headClinicianObservable = this.clinicianService.getClinician(clinic.headclinician);
        headClinicianObservable.subscribe(headClinician => {
          if(headClinician){
            var headClinicianName = headClinician.abbreviation + ". " + headClinician.firstname + " " + headClinician.lastname;
            this.headClinicians.push(headClinicianName);
          }
        });
      });
    })

  }
}