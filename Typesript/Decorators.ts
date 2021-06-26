function FirstDecorator(constructor: Function)
{
    console.log("First Decorator Called");
}

function SecondDecorator(constructor: Function)
{
    console.log("Second Decorator Called");
}

@FirstDecorator
@SecondDecorator
class MultiDecorator
{

}

const d: MultiDecorator = new MultiDecorator();
