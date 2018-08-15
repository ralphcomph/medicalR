import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtendenteComponent } from './atendente.component';

describe('AtendenteComponent', () => {
    let component: AtendenteComponent;
    let fixture: ComponentFixture<AtendenteComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [AtendenteComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(AtendenteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
