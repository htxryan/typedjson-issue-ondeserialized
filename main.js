"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typedjson_1 = require("typedjson");
const onDeserializedMethodName = "onDeserializedTest";
let TargetClass = class TargetClass {
    constructor() { }
    onDeserializedTest() {
        console.log('Deserializer was called!');
    }
};
__decorate([
    typedjson_1.jsonMember,
    __metadata("design:type", String)
], TargetClass.prototype, "testProp1", void 0);
__decorate([
    typedjson_1.jsonMember,
    __metadata("design:type", Number)
], TargetClass.prototype, "testProp2", void 0);
TargetClass = __decorate([
    typedjson_1.jsonObject({
        onDeserialized: onDeserializedMethodName
    }),
    __metadata("design:paramtypes", [])
], TargetClass);
function run(json) {
    let manualInstance = new TargetClass();
    var deserializerType = typeof manualInstance.constructor[onDeserializedMethodName];
    if (deserializerType === 'function') {
        manualInstance.constructor[onDeserializedMethodName]();
    }
    else {
        console.log('Failed to detect type of function', deserializerType);
    }
    let serializer = new typedjson_1.TypedJSON(TargetClass);
    let targetClass = serializer.parse(json);
    console.log('targetClass', targetClass);
}
run(`{
    "testProp1": "value 1",
    "testProp2": 2
}`);
