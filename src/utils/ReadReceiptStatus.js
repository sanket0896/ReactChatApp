/** indicates the status of message, i.e. Read Receipts 
      * Possible Values: 
      * created : message created
      * uploaded : message uploaded to server
      * received : message received by target
      * read : message read by target
*/
const ReadReceiptStatusEnum = {
    CREATED : "CREATED",
    NONE: "NONE",
    RECEIVED : "RECEIVED",
    READ: "READ",
    UNREAD: "UNREAD",
    UPLOADED : "UPLOADED",
}

const readReceipt = Object.freeze(ReadReceiptStatusEnum);
export default readReceipt;