export class Paciente {
    constructor(
        public id: number,
        public cpf: string,       
        public nome: string,
        public isdel: boolean  
    ) { }
}