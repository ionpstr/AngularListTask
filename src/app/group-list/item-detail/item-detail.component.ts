import { Component, ElementRef } from '@angular/core';
import { FunctionType } from 'src/app/types/functionConst';
import { functions, users as userData } from 'src/assets/data';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/types/item';
import { DataService } from 'src/app/data.service';
import { Function } from 'src/app/types/function';
import { User } from 'src/app/types/user';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css'],
})
export class ItemDetailComponent {
  functions: FunctionType[] = [];
  users: User[] = [];
  usersT: User[] | undefined = [];
  user: User | undefined = { userId: '', fullName: '', userInitials: '' };
  entity: Item;
  functionsT: Function[] = [];
  functionT: Function | undefined = {
    functionCode: '',
    title: '',
    minValue: '',
    maxValue: '',
  };
  myForm = this.fb.group({
    id: [Math.round(Math.random() * 100000)],
    groupName: ['', Validators.required],
    warning: [''],
    minValue: ['', Validators.required],
    maxValue: ['', Validators.required],
    functions: this.fb.array([]),
    users: this.fb.array([]),
  });
  constructor(
    private route: ActivatedRoute,
    public dataService: DataService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.entity = {
      functions: [],
      groupName: '',
      id: 0,
      minValue: '',
      maxValue: '',
      users: [],
    };
    this.functions = functions;
    this.users = userData;
    this.route.params.subscribe((params) => {
      if (params['id'] != 'nuovo') {
        this.find(params['id']);
      } else {
        this.createForm();
      }
    });
  }
  find(id: number) {
    this.entity =
      this.dataService.data.find((item) => item.id == id) || this.entity;
    if (this.entity.functions) {
      this.entity?.functions.forEach((item) => this.functionsT.push(item));
    }

    this.usersT = this.entity?.users;
    this.createForm();
  }
  checkFunction(code: string): boolean {
    if (
      this.entity.functions &&
      (this.functionT = this.entity?.functions.find((item) => {
        return item.functionCode == code;
      }))
    ) {
      return true;
    } else {
      return false;
    }
  }

  checkUser(user: User) {
    if (
      (this.user = this.entity?.users.find((item) => {
        return user.userId === item.userId;
      }))
    ) {
      return true;
    } else {
      return false;
    }
  }
  handleUser(item: User) {
    let i;
    if ((i = this.usersT?.find((user) => user.userId == item.userId))) {
      this.usersT?.splice(this.usersT?.indexOf(i), 1);

      let j = this.myForm.controls.users.value.find(
        (item1: any) => item1.userId == item.userId
      );
      this.myForm.controls.users.removeAt(j as number);
    } else {
      this.usersT?.push(item);

      this.getUsers().push(
        this.fb.group({
          userId: item.userId,
          userInitials: item.userInitials,
          fullName: item.fullName,
        })
      );
    }
  }
  handleIndietro() {
    this.router.navigate(['/']);
  }
  handleSalva(event: HTMLButtonElement) {
    let flag = 0;
    // this.dataService.disable = false;
    // this.myForm.controls.users.enable();
    // this.myForm.controls.functions.controls.forEach((item) => {
    //   let code = item.value;
    //   if (this.checkFunction(code as string)) {
    //     item.enable();
    //   }
    // });
    // this.myForm.controls.groupName.enable();
    // this.myForm.controls.minValue.enable();
    // this.myForm.controls.maxValue.enable();
    // console.log(this.myForm);
    if (!this.dataService.disable) {
      let flag1 = 0;
      this.myForm.controls.functions.value.forEach((f) => {
        let i = f as Function;
        if (
          i.minValue != this.myForm.value.minValue ||
          i.maxValue != this.myForm.value.maxValue
        ) {
          flag1 = 1;
        }
      });
      if (flag1) {
        this.myForm.patchValue({
          warning:
            'In atessa che il gruppo di firma venga approvato dai master',
        });
      } else {
        this.myForm.patchValue({
          warning: '',
        });
      }

      for (let i = 0; i < this.dataService.data.length; ++i) {
        if (this.dataService.data[i].id == this.myForm.value.id) {
          this.dataService.data[i] = this.myForm.value as Item;
          flag = 1;
          break;
        }
      }
      if (!flag) {
        this.dataService.data.push(this.myForm.value as Item);
        flag = 0;
      }
    } else {
      this.dataService.disable = false;
      this.myForm.controls.groupName.enable();
      this.myForm.controls.minValue.enable();
      this.myForm.controls.maxValue.enable();
      this.myForm.controls.users.enable();
      if (!this.dataService.disable) {
        this.myForm.controls.functions.controls.forEach((item) => {
          let code = item as FormControl;
          if (this.checkFunction(code.value.functionCode as string)) {
            item.enable();
          }
        });
      }
      event.innerHTML = 'Salva';
    }
  }
  onSubmit() {
    let flag = 0;

    if (!this.dataService.disable) {
      let flag1 = 0;
      this.myForm.controls.functions.value.forEach((f) => {
        let i = f as Function;
        if (
          (i.minValue != this.myForm.value.minValue && i.minValue != '') ||
          (i.maxValue != this.myForm.value.maxValue && i.maxValue != '')
        ) {
          flag1 = 1;
        }
      });
      if (flag1) {
        this.myForm.patchValue({
          warning:
            'In atessa che il gruppo di firma venga approvato dai master',
        });
      } else {
        this.myForm.patchValue({
          warning: '',
        });
      }

      for (let i = 0; i < this.dataService.data.length; ++i) {
        if (this.dataService.data[i].id == this.myForm.value.id) {
          this.dataService.data[i] = this.myForm.value as Item;
          flag = 1;
          break;
        }
      }
      if (!flag) {
        this.dataService.data.push(this.myForm.value as Item);
        this.dataService.sort();

        flag = 0;
      }
    } else {
      this.dataService.disable = false;
      this.myForm.controls.groupName.enable();
      this.myForm.controls.minValue.enable();
      this.myForm.controls.maxValue.enable();
      this.myForm.controls.users.enable();
      if (!this.dataService.disable) {
        this.myForm.controls.functions.controls.forEach((item) => {
          let code = item as FormControl;
          if (this.checkFunction(code.value.functionCode as string)) {
            item.enable();
          }
        });
      }
    }
  }
  getFunctions(): FormArray {
    return this.myForm.get('functions') as FormArray;
  }
  getUsers(): FormArray {
    return this.myForm.get('users') as FormArray;
  }
  createForm() {
    if (this.entity.groupName) {
      this.myForm.patchValue({
        id: this.entity.id,
        groupName: this.entity.groupName,
        warning: this.entity.warning,
        minValue: this.entity.minValue,
        maxValue: this.entity.maxValue,
      });
    }

    for (let item of this.functions) {
      if (this.checkFunction(item.function_code)) {
        this.getFunctions().push(
          this.fb.group({
            title: this.functionT?.title,
            functionCode: this.functionT?.functionCode,
            minValue: [this.functionT?.minValue, Validators.required],
            maxValue: [this.functionT?.maxValue, Validators.required],
          })
        );
      } else {
        this.getFunctions().push(
          this.fb.group({
            title: item.function_name,
            functionCode: item.function_code,
            minValue: ['', Validators.required],
            maxValue: ['', Validators.required],
          })
        );
      }
    }
    for (let item of this.usersT || []) {
      if (this.checkUser(item)) {
        this.getUsers().push(
          this.fb.group({
            userId: item.userId,
            userInitials: item.userInitials,
            fullName: item.fullName,
          })
        );
      }
    }

    if (this.dataService.disable) {
      this.myForm.controls.groupName.disable();
      this.myForm.controls.minValue.disable();
      this.myForm.controls.maxValue.disable();
      this.myForm.controls.users.disable();
    }
    this.myForm.controls.functions.disable();
    if (!this.dataService.disable) {
      this.myForm.controls.functions.controls.forEach((item) => {
        let code = item as FormControl;
        if (this.checkFunction(code.value.functionCode as string)) {
          item.enable();
        }
      });
    }
  }

  handleToggle(event: boolean, funct: any) {
    if (event && !this.dataService.disable) {
      funct.enable();
    } else {
      funct.disable();
    }
  }
  filterUsers(val: string) {
    this.users = userData;
    val = val.trim();
    if (val != '') {
      this.users = this.dataService.filter(val, this.users) as User[];
    }
  }
}
