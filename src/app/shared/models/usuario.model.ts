export class Usuario {
    constructor(
        public id: number,      
        public perfil: string,
        public nome: string,
        public email: string,
        public senha: string,              
    ) { }
}