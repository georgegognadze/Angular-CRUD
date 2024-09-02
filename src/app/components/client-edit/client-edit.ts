import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { Client } from '../../shared/models/client';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-client-edit',
  standalone: true,
  templateUrl: './client-edit.html',
  styleUrls: ['./client-edit.css'],
  imports: [ReactiveFormsModule, CommonModule, RouterModule]
})
export class ClientEdit implements OnInit {
  clientForm!: FormGroup;
  client!: Client;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        const id = Number(idParam);
        this.loadClient(id);
      }
    });
  }

  private initializeForm(): void {
    this.clientForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      gender: ['', Validators.required],
      personalNumber: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      mobile: ['', [Validators.required, Validators.pattern(/^5\d{8}$/)]],
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
      accounts: this.fb.array([])
    });
  }

  private createAccountFormGroup(account: any): FormGroup {
    return this.fb.group({
      accountNumber: [Number(account.accountNumber) || null],
      clientNumber: [Number(account.clientNumber) || null],
      type: [account.type || ''],
      currency: [account.currency || ''],
      status: [account.status || '']
    });
  }

  get accountsFormArray(): FormArray {
    return this.clientForm.get('accounts') as FormArray;
  }

  private generateUniqueAccountNumber(): number {
    const existingAccountNumbers = this.accountsFormArray.controls.map(group => group.get('accountNumber')?.value);
    const generateRandom6DigitNumber = (): number => {
      return Math.floor(100000 + Math.random() * 900000);
    };
  
    let newAccountNumber;
    do {
      newAccountNumber = generateRandom6DigitNumber();
    } while (existingAccountNumbers.includes(newAccountNumber.toString()));
    return newAccountNumber;
  }
  

  onAddAccount(): void {
    const newAccountNumber = this.generateUniqueAccountNumber();
    const newAccount = {
      accountNumber: newAccountNumber,
      clientNumber: Number(this.client.personalNumber),
      type: '',
      currency: '',
      status: ''
    };
    this.accountsFormArray.push(this.createAccountFormGroup(newAccount));
  }

  onDeleteAccount(index: number): void {
    const confirmed = confirm('Are you sure you want to delete this account? This action cannot be undone.');
    if (confirmed) {
      this.accountsFormArray.removeAt(index);
    }
  }

  private loadClient(id: number): void {
    this.clientService.getClientById(id).subscribe(
      (client: Client) => {
        this.client = client;
        this.clientForm.patchValue({
          firstName: client.firstName,
          lastName: client.lastName,
          gender: client.gender,
          personalNumber: client.personalNumber,
          mobile: client.mobile,
          photo: client.photo
        });

        if (client.legalAddress) {
          this.clientForm.get('legalAddress')?.patchValue({
            country: client.legalAddress.country,
            city: client.legalAddress.city,
            addressLine: client.legalAddress.addressLine
          });
        }

        if (client.actualAddress) {
          this.clientForm.get('actualAddress')?.patchValue({
            country: client.actualAddress.country,
            city: client.actualAddress.city,
            addressLine: client.actualAddress.addressLine
          });
        }

        if (client.accounts) {
          const accountControls = client.accounts.map(account => this.createAccountFormGroup(account));
          this.accountsFormArray.clear();
          accountControls.forEach(control => this.accountsFormArray.push(control));
        }
      },
      error => console.error('Error fetching client:', error)
    );
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      const updatedClient: Client = {
        ...this.client,
        ...this.clientForm.value,
        accounts: this.clientForm.get('accounts')?.value.map((account: any) => ({
          ...account,
          accountNumber: Number(account.accountNumber),
          clientNumber: Number(account.clientNumber)
        })) || []
      };
  
      this.clientService.updateClient(this.client.id.toString(), updatedClient).subscribe(
        () => {
          console.log('Client updated successfully!');
          this.router.navigate(['/clients']);
        },
        error => console.error('Error updating client:', error)
      );
    }
  }

  onCloseAccount(): void {
    const confirmed = confirm('Are you sure you want to close this account? This action cannot be undone.');
    if (confirmed) {
      this.clientService.deleteClient(this.client.id).subscribe(
        () => {
          console.log('Client account closed successfully!');
          this.router.navigate(['/clients']);
        },
        error => console.error('Error closing client account:', error)
      );
    }
  }
}
