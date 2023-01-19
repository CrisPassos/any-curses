import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilKeyChanged, filter, map } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './app-form.component.html',
  styleUrls: ['./app-form.component.scss']
})
export class AppFormComponent {
  form: FormGroup
  comment = new FormControl('', Validators.required)
  name = new FormControl('', Validators.required)
  email = new FormControl('', [
    Validators.required,
    Validators.pattern("[^ @]*@[^ @]*")
  ]);

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      'comment': this.comment,
      'name': this.name,
      'email': this.email
    })

    // MAP: prevent added tags JS as <script> </script> inside the comment input
    // distinctUntilKeyChanged: search the value until found the word 'comment'
    this.form.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilKeyChanged('comment'),
        filter(() => this.form.valid),
        map(data => {
          data.comment = data.comment.replace(/<(?:.|\n)*?>/gm, '');
          return data
        })
      )
      .subscribe(data => console.log(JSON.stringify(data)))
  }

  onSubmit(): void {
    console.log('Form submitted')
  }
}
