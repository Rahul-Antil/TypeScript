"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Message {
    set isSent(value) {
        this._isSent = value;
    }
    get isSent() {
        return this._isSent;
    }
    constructor(title, message) {
        this.title = title;
        this.message = message;
        this.isSent = false;
    }
    get messageStatus() {
        const sentMessage = this.isSent ? 'Has been sent.' : 'Has not been sent.';
        return `${this.message} | ${sentMessage}`;
    }
    previewMessage() {
        return this.message.slice(0, 10).concat('...');
    }
}
exports.Message = Message;
const message = new Message('New Course!!! Just $9.99!!!', 'Check out our latest course on OOP with TypeScript!');
message.messageStatus;
console.log(message.previewMessage());
//# sourceMappingURL=GetterSetter.js.map