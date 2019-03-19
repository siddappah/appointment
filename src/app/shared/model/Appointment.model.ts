export class Appointment {
    constructor(
        public name: string = "",
        public postalAddress: string = "",
        public city: string = "",
        public state: string = "",
        public mobile: number,
        public email: string = "",
        public date: number,
        public time: string = ""
    ) { }
}