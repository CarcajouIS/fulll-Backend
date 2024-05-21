export class Location {
    constructor(private readonly _latitude?: number, private readonly _longitude?: number,
                private readonly _altitude?: number) {
    }

    get latitude(): number | undefined {
        return this._latitude;
    }

    get longitude(): number | undefined {
        return this._longitude;
    }

    get altitude(): number | undefined {
        return this._altitude;
    }
}
