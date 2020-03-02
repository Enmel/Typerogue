import { UUIDv4, UUIDv4Generator } from './uuidv4.js';
import { Rng } from './Rng.js';

export class Tile {
    backgroundColor: string = "#FFF";
    glyph: string = ".";
    color: string = "#000";
}


export type Map = (Tile[] | null)[];
export type Rooms = (Room | null)[];

export class MapDigger {

    static dig(map: Map, worldW: number, worldH: number): digResult {

        let rooms: Rooms = [];

        for (let index = 0; index < 12; index++) {

            let room = new Room({
                width: Rng.generate(5, 10),
                height: Rng.generate(5, 10),
                x: Rng.generate(0, 29),
                y: Rng.generate(0, 29)
            });

            if (room.x + room.width > worldW || room.y + room.height > worldH) {
                continue;
            }

            if (rooms.length == 0) {
                rooms.push(room);

                for (let i = room.y; i < room.height + room.y; i++) {
                    for (let j = room.x; j < room.width + room.x; j++) {
                        map[i]![j] = new Tile();
                    }
                }

                continue;
            }

            //cannot be placed algoritmo
            let cannotBePlaced = false;

            rooms.forEach(placedRoom => {
                if (room.intersectsWith(<Room>placedRoom)) {
                    cannotBePlaced = true;
                }
            });

            if (cannotBePlaced) {
                continue;
            }

            for (let i = room.y; i < room.height + room.y; i++) {
                for (let j = room.x; j < room.width + room.x; j++) {
                    map[i]![j] = new Tile();
                }
            }

            rooms.push(room);
        }

        return <digResult>{
            map,
            rooms
        }
    }
}

interface digResult {
    map: Map,
    rooms: Rooms
}

export class World {
    public rooms: Rooms = [];
    public map: Map = [];
    public witdh: number = 100;
    public heigth: number = 100;

    constructor(witdh: number, heigth: number) {

        if (witdh) {
            this.witdh = witdh;
        }

        if (heigth) {
            this.heigth = heigth;
        }

        let tileBlock: Tile = {
            backgroundColor: "#FFF",
            glyph: "#",
            color: "#000"
        }

        let blankMap: Map = new Array(heigth).fill(tileBlock).map(() => {
            return new Array(witdh).fill(tileBlock);
        })

        let { map, rooms } = MapDigger.dig(blankMap, this.witdh, this.heigth);

        this.rooms = rooms;
        this.map = map;
    }
}

export class Room {
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public id: UUIDv4;

    constructor(RoomDTO: RoomDTO) {
        this.x = RoomDTO.x;
        this.y = RoomDTO.y;
        this.height = RoomDTO.height;
        this.width = RoomDTO.width;
        this.id = UUIDv4Generator.generate();
    }

    get center() {
        return ({
            x: Math.floor(this.width / 2) + this.x,
            y: Math.floor(this.height / 2) + this.y
        });
    }

    intersectsWith(room: Room) {

        if (this.x < room.x + room.width &&
            this.x + this.width > room.x &&
            this.y < room.y + room.height &&
            this.height + this.y > room.y) {
            return true;
        }
    }

}

export interface RoomDTO { x: number, y: number, width: number, height: number };