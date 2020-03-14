import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  inputForm: FormGroup;
  submitted = false;
  cities:any=[];

  constructor(private service: ApiServiceService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.inputForm = this.formBuilder.group({
      input: ['',Validators.required] //  Validators.pattern('^[a-zA-Z]*$') 
  });
  }

  get f() { return this.inputForm.controls; }

  onSubmit() {
    this.submitted = true;
   

    // stop here if form is invalid
    if (this.inputForm.invalid) {
        return;
    }
    if (this.inputForm.valid) {
      this.submitted = true;
      // console.log("sadasd", this.inputForm.value)
      this.service.getCitiesFromApi(this.inputForm.value)
        .pipe(first())
        .subscribe(
          result => {
            // console.log();
            this.inputForm.reset();
            this.cities.push(result['data']);
            console.log(this.cities)
          });
    }

}

}
