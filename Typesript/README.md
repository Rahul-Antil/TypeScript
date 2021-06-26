# **Typescript**

> How to execute typescript file
___

1. Compile the typescript file to js file

    ```ts
    tsc filename.ts or tsc filename (without extension)
    ```

2. Run the compiles js file with node

    ```ts
    node filename.js or node filename (without extension)
    ```

3. Compile all ts file to output directory

    ```ts
    tsc --outDir compiledjs
    ```

4. Compile and execute in one command

    ```ts
    tsc --outDir compiledjs | node compiledjs/hello.js
    ```

[Typescript playground](https://www.typescriptlang.org/play)

[Typescript Documentation](https://www.typescriptlang.org/)

[JS Fiddle Playground for Typescript](https://jsfiddle.net/boilerplate/typescript)

Install Typescript lite server 
    ```typescript
    npm i -g lite-server
    ```

Run Lite Server: Type in command mode > lite-server
