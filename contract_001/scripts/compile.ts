import * as fs from 'fs';
import process from 'process';
import {Cell} from 'ton-core';
import {compileFunc} from '@ton-community/func-js';


/**
 * This TypeScript script is designed to compile FunC code for the TON blockchain using the @ton-community/func-js compiler.
 * 
 * Overview:
 * - It starts by importing necessary modules such as 'fs' for file system operations, 'process' for accessing system process details,
 *   and specific TON-related utilities like 'Cell' from 'ton-core' and 'compileFunc' from '@ton-community/func-js'.
 * 
 * - The script defines an asynchronous function `compileScript` which orchestrates the compilation process.
 * 
 * Steps performed by `compileScript`:
 *   1. Logs the start of the compilation process.
 *   2. Calls `compileFunc`, passing it an object with:
 *      - `targets`: An array containing the path to the FunC source file to compile.
 *      - `sources`: A function that reads and returns the content of the source file specified in `targets`.
 *   3. Checks the result of the compilation:
 *      - If there's an error (`status` is "error"), it logs the error message and exits the process with a status code of 1.
 *      - If the compilation is successful, it proceeds to the next steps.
 *   4. Defines a path where the compiled code artifact (in JSON format) will be saved.
 *   5. Writes the compiled code to the specified path. The compiled code is obtained by converting the Base64 encoded BOC (Bag of Cells)
 *      returned by the compiler into a hex string.
 *   6. Logs the success message and the path to the saved compiled code artifact.
 * 
 * - Finally, it calls `compileScript` to execute the compilation process.
 * 
 * This script is particularly useful for developers working with TON blockchain smart contracts, providing an automated way to compile
 * FunC code and save the compiled artifacts for deployment.
 */
async function compileScript() {
    console.log(
      "================================================================="
    );
    console.log(
      "Compile script is running, let's find some FunC code to compile..."
    );
  
    const compileResult = await compileFunc({
      targets: ["./contracts/main.fc"],
      sources: (x) => fs.readFileSync(x).toString("utf8"),
    });
  
    if (compileResult.status === "error") {
      console.log(" - OH NO! Compilation Errors! The compiler output was:");
      console.log(`\n${compileResult.message}`);
      process.exit(1);
    }
  
    console.log(" - Compilation successful!");
  
    const hexArtifact = `build/main.compiled.json`;
  
    fs.writeFileSync(
      hexArtifact,
      JSON.stringify({
        hex: Cell.fromBoc(Buffer.from(compileResult.codeBoc, "base64"))[0]
          .toBoc()
          .toString("hex"),
      })
    );
  
    console.log(" - Compiled code saved to " + hexArtifact);
  }
  compileScript();

