import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // declarations: [ AppComponent ],
      imports: [AppComponent, FormsModule, CommonModule ]  // Import FormsModule for ngModel binding
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test 1: Verify the component is created
  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  // Test 2: Verify the component is initialized
  it('should focus on mainTextInput when the component is initialized', () => {
    // Trigger ngAfterViewInit lifecycle hook
    component.ngAfterViewInit();

    // Assert that the mainTextInput is focused
    expect(component.mainTextInput?.nativeElement).toBe(document.activeElement);
  });

  // Test 3: set error message and focus on mainTextInput  and subText are empty
  it('should set error message and focus on mainTextInput if both mainText and subText are empty', () => {
    component.mainText = '';
    component.subText = '';

    component.findMatches();

    expect(component.errorMsg).toBe('Please enter the Text and Sub Text!');
    expect(component.mainTextInput?.nativeElement).toBe(document.activeElement);  // Check if the mainText input is focused
  });

  // Test 4: set error message and focus on mainTextInput when empty
  it('should set error message and focus on mainTextInput if mainText is empty', () => {
    component.mainText = '';
    component.subText = 'world';

    component.findMatches();

    expect(component.errorMsg).toBe('Please enter the Text!');
    expect(component.mainTextInput?.nativeElement).toBe(document.activeElement);  // Check if the mainText input is focused
  });

   // Test 5: set error message and focus on subTextInput when empty
  it('should set error message and focus on subTextInput if subText is empty', () => {
    component.mainText = 'Happy Coding';
    component.subText = '';

    component.findMatches();

    expect(component.errorMsg).toBe('Please enter the Sub Text!');
    expect(component.subTextInput?.nativeElement).toBe(document.activeElement);  // Check if the subText input is focused
  });

  //Test 6: Test two-way binding with ngModel for mainText
  it('should bind mainText with textarea input', () => {
    const textarea = fixture.debugElement.query(By.css('textarea'));
    textarea.nativeElement.value = 'Test text';
    textarea.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.mainText).toBe('Test text');
  });

  // Test 7: Test two-way binding with ngModel for subText
  it('should bind subText with input field', () => {
    const input = fixture.debugElement.query(By.css('input'));
    input.nativeElement.value = 'Test Value';
    input.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.subText).toBe('Test Value');
  });

  // Test 8: Test findMatches() method
  it('should call findMatches and update positions', () => {
    // Set initial values for testing
    component.mainText = 'Happy Coding world';
    component.subText = 'world';

    component.findMatches();
    fixture.detectChanges();

    // Test that the findMatches method updates positions array
    expect(component.positions.length).toBeGreaterThan(0);
    expect(component.positions).toContain(13);  // Expected match position for "world" Radha
  });

  // Test 9: Verify the display of "No matches found" message
  it('should display "No matches found" when no matches exist', () => {
    component.mainText = 'Happy Coding world';
    component.subText = 'Radha';
    component.findMatches();
    fixture.detectChanges();
    //console.log(component.positions.length);
    expect(component.positions.length).toEqual(0);     
  });

  // Test 10: Verify the display of match positions
  it('should display match positions when matches are found', () => {
    component.mainText = 'Happy Coding world, world';
    component.subText = 'world';
    component.findMatches();
    fixture.detectChanges();

    const matchPositionMessage = component.positions;
    expect(matchPositionMessage).toBeTruthy();
    expect(matchPositionMessage.toString()).toContain('13,20');
  });  

    // Test 11: Verify the display of match positions
  it('should find positions of matches in a case-insensitive manner', () => {
    component.mainText = 'Happy Coding world, World';
    component.subText = 'world';

    component.findMatches();

    expect(component.positions).toEqual([13, 20]);  // Positions where "world" appears case-insensitively
    expect(component.errorMsg).toBe('');
  });

    // Test 12: Verify the display of match positions
  it('should focus the correct input based on the error condition', () => {
    // Simulate missing mainText
    component.mainText = '';
    component.subText = 'world';

    component.findMatches();

    // Expect the mainText input to be focused
    expect(component.mainTextInput?.nativeElement).toBe(document.activeElement);

    // Simulate missing subText
    component.mainText = 'Happy Coding world';
    component.subText = '';

    component.findMatches();

    // Expect the subText input to be focused
    expect(component.subTextInput?.nativeElement).toBe(document.activeElement);
  });  
});