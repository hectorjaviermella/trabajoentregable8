export default class TicketDTO {
    constructor(ticket) {
      this._id = ticket._id;
      this.code = ticket.code;      
      this.purchase_datetime  = ticket.purchase_datetime;
      
      
    }
  }