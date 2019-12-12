/** indicates the status of message, i.e. Read Receipts 
      * Possible Values: 
      * created : message created
      * sent : message sent to server
      * received : message received by target
      * read : message read by target
*/
const ReadReceiptStatusEnum = {
    CREATED : "CREATED",
    NONE: "NONE",
    RECEIVED : "RECEIVED",
    READ: "READ",
    UNREAD: "UNREAD",
    SENT : "SENT",
}

const readReceipt = Object.freeze(ReadReceiptStatusEnum);
export default readReceipt;