import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameTag } from './two-way-binding';

describe('NameTag', () => {
  let component: NameTag;
  let fixture: ComponentFixture<NameTag>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NameTag]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NameTag);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
