import { Component ,ViewChild,ElementRef,AfterViewInit  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [FormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit  {
  @ViewChild('mainTextInput') mainTextInput: ElementRef | undefined;
  @ViewChild('subTextInput') subTextInput: ElementRef | undefined;
  title = 'my-angular-app';

  mainText: string = '';
  subText: string = '';
  positions: number[] = [];
  textPosition:string='';
  errorMsg:string='';

  ngAfterViewInit() {
   // Focus on the main text input when the component is initialized
   this.setFocus(this.mainTextInput);
  }

  setFocus(inputElement: ElementRef | undefined) {
    //set focus on the provided input element
    inputElement?.nativeElement.focus();
  }

  setErrorMsgAndFocus(msg: string, inputToFocus: ElementRef | undefined) {
    // Set the error message and focus on the corresponding input field
    this.errorMsg = msg;
    this.setFocus(inputToFocus);
  }

  findMatches() {
    this.positions = [];
    this.errorMsg='';

    if (!this.mainText || !this.subText) {
      if (!this.mainText && !this.subText) {
        this.setErrorMsgAndFocus("Please enter the Text and Sub Text!", this.mainTextInput);
      } else if (!this.mainText) {
        this.setErrorMsgAndFocus("Please enter the Text!", this.mainTextInput);
      } else if (!this.subText) {
        this.setErrorMsgAndFocus("Please enter the Sub Text!", this.subTextInput);
      }
      return;
    }

    // Find all positions of the subText in mainText using a regex
    const regex = new RegExp(this.subText, 'gi');
    let match;
    while ((match = regex.exec(this.mainText)) !== null) {
      this.positions.push(match.index+1);      
    }   
  }

  //findMatches_Index() {
  // this.positions = [];
  //let positions = [];
  //if (!this.mainText || !this.subText) return;
  //let index = this.mainText.indexOf(this.subText);

  //while (index !== -1) {
  //  positions.push(index);
  //  index = this.mainText.indexOf(this.subText, index + 1); // Move to the next match
  //}  
  //this.textPosition = positions.length ? "Positions: " + positions.join(", ") : "No matches found";
  //}
}
