import { Cell } from "ton-core";
import { hex } from "../build/main.compiled.json";
import { Blockchain } from "@ton-community/sandbox"

describe("main.fc contract tests", () => {
    it("our first test", async () => {
        const blockchain = await Blockchain.create();

    });

});

