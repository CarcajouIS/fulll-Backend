import {exec} from "child_process";
import {promisify} from "util";

const execAsync = promisify(exec);

describe("CLI Commands", () => {
    const runCLI = async (command: string): Promise<string[]> => (await execAsync(`npx node src/ ${command}`)).stdout.split(
        "\n");

    test("should create a new fleet", async () => {
        const userId = "user1";

        const output = await runCLI(`create ${userId}`);
        const info = output.at(-2);
        const id = output.at(-1);

        expect(info).toMatch(/Fleet created with ID: \W*/);
        expect(info).toMatch(`${id}`);
    });

    test("should register a vehicle to a fleet", async () => {
        const userId = "user1";
        const fleetId = (await runCLI(`create ${userId}`)).at(-1);
        const vehiclePlateNumber = "ABC1234DEF";

        const output = await runCLI(`register-vehicle ${fleetId} ${vehiclePlateNumber}`);

        expect(output.at(-2)).toBe(`Vehicle ${vehiclePlateNumber} registered to fleet ${fleetId}`);
    });

    test("should try to register a vehicle to a fleet even with a leading -", async () => {
        const fleetId = "-fleet1";
        const vehiclePlateNumber = "ABC1234DEF";
        debugger
        expect.assertions(1);
        try {
            await runCLI(`register-vehicle ${fleetId} ${vehiclePlateNumber}`);
        } catch (error) {
            expect((error as Error).message.split("\n").at(0)).toBe(`Command failed: npx node src/ register-vehicle ${fleetId} ${vehiclePlateNumber}`);
        }
    });

    test("should localize a vehicle", async () => {
        const userId = "user1";
        const fleetOutput = await runCLI(`create ${userId}`);
        const fleetId = fleetOutput.at(-1);

        const vehiclePlateNumber = "ABC1234DEF";
        await runCLI(`register-vehicle ${fleetId} ${vehiclePlateNumber}`);

        const lat = 40.7128;
        const lng = -74.006;
        const output = await runCLI(`localize-vehicle ${fleetId} ${vehiclePlateNumber} ${lat} ${lng}`);
        expect(output.join(" ")).toMatch(`Parked vehicle ${vehiclePlateNumber} to location {"latitude":"${lat}","longitude":"${lng}"}`);
    });
});
