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
    // Use optional chaining to safely access the nativeElement
    this.mainTextInput?.nativeElement.focus();
  }

  findMatches() {
    this.positions = [];
    this.errorMsg='';
    if(!this.mainText || !this.subText){
      if(!this.mainText && !this.subText )
      {
        this.errorMsg="Please enter the Text and Sub Text!";
        this.mainTextInput?.nativeElement.focus();      
      }
      else if(!this.mainText && this.subText)
      {
        this.errorMsg="Please enter the Text!";
        this.mainTextInput?.nativeElement.focus();
      }
      else if(this.mainText && !this.subText){
        this.errorMsg="Please enter the Sub Text!";
        this.subTextInput?.nativeElement.focus();
      } 
    return;
  }
    const regex = new RegExp(this.subText, 'gi');
    let match;
    while ((match = regex.exec(this.mainText)) !== null) {
      this.positions.push(match.index);      
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
