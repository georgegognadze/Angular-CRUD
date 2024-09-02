import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule, AbstractControl, ValidatorFn } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { Client } from '../../shared/models/client';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './client-form.html',
  styleUrls: ['./client-form.css']
})
export class ClientForm implements OnInit {
  clientForm!: FormGroup;

  constructor(private fb: FormBuilder, private clientService: ClientService) {
    this.initializeForm();
  }

  ngOnInit(): void { }

  private initializeForm(): void {
    this.clientForm = this.fb.group({
      firstName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern(/^[\u10A0-\u10FFa-zA-Z]+$/)
      ]],
      lastName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern(/^[\u10A0-\u10FFa-zA-Z]+$/)
      ]],
      gender: ['', Validators.required],
      personalNumber: ['', [
        Validators.required,
        Validators.pattern(/^\d{11}$/)
      ], [(this.clientService)]],
      mobile: ['', [
        Validators.required,
        mobileNumberValidator()
      ]],
      legalAddress: this.fb.group({
        country: ['', Validators.required],
        city: ['', Validators.required],
        addressLine: ['', Validators.required]
      }),
      actualAddress: this.fb.group({
        country: ['', Validators.required],
        city: ['', Validators.required],
        addressLine: ['', Validators.required]
      }),
      photo: [''],
    });
  }

  get accounts(): FormArray {
    return this.clientForm.get('accounts') as FormArray;
  }


  removeAccount(index: number): void {
    this.accounts.removeAt(index);
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      this.clientService.addClient(this.clientForm.value as Client).subscribe(
        response => {
          console.log('Client added successfully!');
          this.clientForm.reset();
        },
        error => {
          console.error('Error adding client:', error);
        }
      );
    } else {
      console.warn('Form is not valid. Please review the input fields.');
    }
  }
}

function mobileNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (!value) {
      return null;
    }
    if (!value.startsWith('5')) {
      return { 'startsWithFive': true };
    }
    if (value.length !== 9) {
      return { 'length': true };
    }
    return null;
  };
}
