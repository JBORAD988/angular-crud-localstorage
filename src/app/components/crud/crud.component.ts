import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {LocalStorageService} from "../../service/local-storage.service";

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit{

  items: any[] = [];
  form: FormGroup;
  isEditMode = false;

  constructor(private localstorage:LocalStorageService, private fb:FormBuilder) {
    this.form = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }

  ngOnInit(): void {
    this.loadItems()
  }

  loadItems(){
    this.items = this.localstorage.getItems()
  }


  saveItem(){
    if(this.form.valid){
      this.localstorage.saveItem(this.form.value)
      this.loadItems()
      this.resetForm()
    }else{
      this.form.markAllAsTouched();

    }
  }


  editItem(Item:any){
    this.isEditMode = true
    this.form.patchValue(Item)
  }

  deleteItem(id: number): void {
    this.localstorage.deleteItem(id);
    this.loadItems();
  }

  resetForm(){
this.isEditMode = false
    this.form.reset()
  }


  hasError(controlName: string, errorName: string): boolean {
    return this.form.controls[controlName].hasError(errorName) &&
      (this.form.controls[controlName].touched || this.form.controls[controlName].dirty);
  }

}
