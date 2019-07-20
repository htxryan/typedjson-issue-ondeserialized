import 'reflect-metadata';
import { TypedJSON, jsonObject, jsonMember } from 'typedjson';

const onDeserializedMethodName = "onDeserializedTest"

@jsonObject({
    onDeserialized: onDeserializedMethodName
})
class TargetClass {
    constructor () {}
    
    @jsonMember public testProp1?: string;

    @jsonMember public testProp2?: number;

    public onDeserializedTest(): void {
        console.log('Deserializer was called!');
    }
}

function run(json: string): void {
    let manualInstance = new TargetClass();
    var deserializerType = typeof (manualInstance.constructor as any)[onDeserializedMethodName];
    if (deserializerType === 'function') {
        (manualInstance.constructor as any)[onDeserializedMethodName]();
    } else {
        console.log('Failed to detect type of function', deserializerType);
    }

    let serializer = new TypedJSON(TargetClass);
    let targetClass = serializer.parse(json);
    console.log('targetClass', targetClass);
}

run(`{
    "testProp1": "value 1",
    "testProp2": 2
}`);