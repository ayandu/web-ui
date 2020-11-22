import { Component, OnInit } from '@angular/core';
import { Stock } from '../model/stock';
import { FormArray, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { UploadService } from '../service/upload.service';
import { Router } from '@angular/router';
import { ShareDataService } from '../service/share-data.service';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css']
})
export class StockFormComponent implements OnInit {
  toFile: { item: (arg0: number) => any; };
  submitted = false;
  stockForm: FormGroup;
  selectedFile: any;
  stocks = new Array<Stock>();
  imageUrls = new Array<string>();
  vallueArray = new Array<string>();
  name: any;
  discountPerc: any;
  quantity: any;
  price: any;
  imageUrl: string;

  constructor(private fb: FormBuilder,
              private share: ShareDataService,
              private uploadService: UploadService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.stockForm = this.fb.group({
      name: new FormControl('', Validators.required),
      price: new FormControl(Number, Validators.required),
      discountPerc: new FormControl(Number, Validators.required),
      quantity: new FormControl(Number, [Validators.required, Validators.min(1)]),
      description: new FormControl('', Validators.required),
      //imageUrls: this.fb.array(['']),
      mandatorySelection: this.fb.array([ this.selection() ]),
      // optionalSelection: this.fb.array([ this.selection()])
    });
  }

  // values(): FormGroup {
  //   return this.fb.group({
  //     value: new FormControl('', Validators.required)
  //   });
  // }
  selection(): FormGroup {
    return this.fb.group({
      name: new FormControl('', Validators.required),
      price: new FormControl(Number, Validators.required),
      selected: new FormControl('', Validators.required),
      values: this.fb.array([])
    });
  }
  get f() { return this.stockForm.controls; }
  get mandatories(): FormArray {
    return this.stockForm.get('mandatorySelection') as FormArray;
  }

  get options(): FormArray {
    return this.stockForm.get('optionalSelection') as FormArray;
  }

  addValue(selectionOption): void{
    selectionOption.get('values').push(new FormControl(''));
  }

  get imagies(): FormArray {
    return this.stockForm.get('imageUrls') as FormArray;
  }

  addImage(): void {
    this.imagies.push(new FormControl(''));
  }

  deleteImage( index: number): void{
    ( this.stockForm.get('imageUrls') as FormArray).removeAt(index);
  }

  addMandatory(): void{
    this.mandatories.push(this.selection());
  }

  addOptional(): void{
    this.options.push(this.selection());
  }

  deleteValue(selectionOption, index): void{
    selectionOption.get('values').removeAt(index);
  }
  deleteMandatory( index): void{
    this.mandatories.removeAt(index);
  }

  deleteOptional(index): void{
    this.options.removeAt(index);
  }

  get images(): string[]{
    let images = new Array<string>();
    this.imageUrls.forEach( i => images.push(i));
    this.imageUrls.splice(0, this.imageUrls.length);
    return images;
  }

  // onFileChanged(event): void {
  //   this.selectedFile = event.target.files[0];
  //   //this.imageUrls.splice(0, this.imageUrls.length);
  //   this.imageUrls.push('https://izinga-aws.s3.amazonaws.com/' + this.uploadService.fileUpload(this.selectedFile, this.share.storeInfo.name));
  // }
  onChange(event: { target: { files: { item: (arg0: number) => any; }; }; }): void {
    this.toFile = event.target.files;
    this.imageUrls.push('https://izinga-aws.s3.amazonaws.com/' + this.uploadService.fileUpload(this.toFile.item(0), this.share.storeInfo.name));  
  }

  done = function (){
    this.share.addStock( new Stock(this.stockForm.get('description').value,
    this.stockForm.get('discountPerc').value,
    this.images,
    this.stockForm.get('mandatorySelection').value,
    this.stockForm.get('name').value,
    null,
    this.stockForm.get('price').value,
    this.stockForm.get('quantity').value));
    this.router.navigateByUrl('/form');
  };
  
  add = function (){
    this.share.addStock( new Stock(this.stockForm.get('description').value,
    this.stockForm.get('discountPerc').value,
    this.images, 
    this.stockForm.get('mandatorySelection').value,
    this.stockForm.get('name').value,
    null,
    this.stockForm.get('price').value,
    this.stockForm.get('quantity').value));
    this.onReset();
    this.router.navigateByUrl('/form/stock');
  };

  skip = function(){
    this.onReset();
    this.router.navigateByUrl('/form');
  };

  onSubmit(): void{
    if(this.stockForm.invalid) return;
  }

  onReset(): void {
    this.stockForm.reset();
    this.mandatories.clear();
    this.options.clear()
    //this.imageUrls = []
  }
//4e9d20a0-20b5-4169-913f-b908c1cf4fe4
}

