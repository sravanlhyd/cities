import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  item: any;
  inputForm: FormGroup;
  submitted = null;
  cities:any[] =[];
   city = [];
  isLoading = false;
  total:any;
  constructor(private service: ApiServiceService, private formBuilder: FormBuilder) { 
    this.inputForm = this.formBuilder.group({  
      input: new FormControl('', [  
        Validators.required,    
        Validators.pattern('^[a-zA-Z]*$')])
      });  
  }

  ngOnInit() {
  }

  get f() { return this.inputForm.controls; }

   clearArray(array) {
    while (array.length) {
      array.pop();
    }
  }

// removeDuplicates(array, key) { 
//   let lookup = {};  
//    return array.filter(obj => !lookup[obj[key]] && lookup[obj[key]] == true);
// }

// const result = Array.from(this.item.reduce((m, t) => m.set(t.name, t), new Map()).values());


onSubmit() {
    this.submitted = true;

    if (this.inputForm.invalid) {
        return;
    }
    if (this.inputForm.valid) {
      this.submitted = true;
      this.isLoading = true;
      this.service.getCitiesFromApi(this.inputForm.value)
      .pipe(first())
      .subscribe(
        result => {
          
          this.clearArray(this.cities);
            this.isLoading = false;
            this.inputForm.reset();
            this.total = result['total'];
            for(var i = 0; i < result['data'].length; i++) {
              // this.cities.push(result['data'][i]);
              this.cities =  Array.from(result['data'].reduce((m, t) => m.set(t.state, t), new Map()).values()); // removed duplicates from result
            }
          });
    }

}

}
