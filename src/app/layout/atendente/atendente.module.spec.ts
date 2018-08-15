import { AtendenteModule } from './atendente.module';

describe('AtendenteModule', () => {
    let atendenteModule: AtendenteModule;

    beforeEach(() => {
        atendenteModule = new AtendenteModule();
    });

    it('should create an instance', () => {
        expect(atendenteModule).toBeTruthy();
    });
});
