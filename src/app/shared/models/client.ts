// export interface Client {
//   id: string;
//   firstName: string;
//   lastName: string;
//   gender: string;
//   personalNumber: string;
//   mobile: string;
//   legalAddress: {
//     country: string;
//     city: string;
//     addressLine: string;
//   };
//   actualAddress: {
//     country: string;
//     city: string;
//     addressLine: string;
//   };
//   photo?: string;
//   account?: {
//     accountNumber: number;
//     clientNumber: number;
//     accountType: 'მიმდინარე' | 'შემნახველი' | 'დაგროვებითი';
//     currency: 'GEL' | 'USD' | 'EUR';
//     accountStatus: 'აქტიური' | 'დახურული';
//   };
// }
export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  personalNumber: string;
  mobile: string;
  legalAddress: {
    country: string;
    city: string;
    addressLine: string;
  };
  actualAddress: {
    country: string;
    city: string;
    addressLine: string;
  };
  photo?: string;
  accounts?: {
    accountNumber: number;
    clientNumber: number;
    type: 'მიმდინარე' | 'შემნახველი' | 'დაგროვებითი';
    currency: 'GEL' | 'USD' | 'EUR';
    status: 'აქტიური' | 'დახურული';
  }[];
}
