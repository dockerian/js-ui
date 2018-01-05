import { TestBed, async } from '@angular/core/testing';
import { AppLinkComponent } from './appLink.component';

describe('AppLinkComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppLinkComponent
      ],
    }).compileComponents();
  }));
  it('should create the appLink', async(() => {
    const fixture = TestBed.createComponent(AppLinkComponent);
    const appLink = fixture.debugElement.componentInstance;
    expect(appLink).toBeTruthy();
  }));
  it(`should have title 'Angular Links'`, async(() => {
    const fixture = TestBed.createComponent(AppLinkComponent);
    const appLink = fixture.debugElement.componentInstance;
    expect(appLink.title).toEqual('Angular Links');
  }));
  it('should render title in a h2 tag', async(() => {
    const fixture = TestBed.createComponent(AppLinkComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Angular Links');
  }));
});
